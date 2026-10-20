import { createHash, timingSafeEqual } from "node:crypto";
import { PilotError } from "./pilot.js";
const prefix = "/api/futureproof-pilot";
const statuses = {
    invalid: 400,
    unauthorized: 401,
    forbidden: 403,
    closed: 403,
    conflict: 409,
    identity_changed: 409,
    rate_limited: 429,
    unavailable: 503,
};
function constant(a, b) {
    return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}
function cookie(req, name) {
    return ((req.headers.cookie ?? "")
        .split(";")
        .map((s) => s.trim())
        .find((s) => s.startsWith(name + "="))
        ?.slice(name.length + 1) ?? "");
}
async function body(req) {
    if (!req.headers["content-type"]?.startsWith("application/json"))
        throw new PilotError("invalid");
    let text = "";
    for await (const chunk of req) {
        text += chunk;
        if (Buffer.byteLength(text) > 16384)
            throw new PilotError("invalid");
    }
    try {
        const data = JSON.parse(text);
        if (!data || Array.isArray(data) || typeof data !== "object")
            throw 0;
        return data;
    }
    catch {
        throw new PilotError("invalid");
    }
}
export function handler(pilot, options) {
    return async (req, res) => {
        res.setHeader("Cache-Control", "private, no-store");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Vary", "Cookie, Origin");
        const send = (status, value) => {
            res.statusCode = status;
            res.end(JSON.stringify(value));
        };
        try {
            const url = new URL(req.url ?? "/", options.origin);
            if (!url.pathname.startsWith(prefix + "/")) {
                send(404, { code: "invalid" });
                return;
            }
            const path = url.pathname.slice(prefix.length);
            const token = cookie(req, "fp_pilot");
            const ip = options.trustedProxy
                ? String(req.headers["x-vercel-forwarded-for"] ?? req.socket.remoteAddress)
                : (req.socket.remoteAddress ?? "unknown");
            if (path === "/internal/drain-outbox") {
                if (req.method !== "POST" ||
                    !constant(req.headers.authorization ?? "", `Bearer ${options.cronSecret}`))
                    throw new PilotError("unauthorized");
                send(200, options.realtime
                    ? await options.realtime.drain()
                    : { delivered: 0, available: false });
                return;
            }
            if (req.method === "GET") {
                if (path === "/me")
                    send(200, await pilot.me(token));
                else if (path === "/active-room")
                    send(200, await pilot.activeRoom(token));
                else if (path === "/display")
                    send(200, await pilot.display(cookie(req, "fp_display")));
                else if (/^\/rooms\/[a-z0-9-]+$/.test(path))
                    send(200, await pilot.read(token, path.split("/")[2], url.searchParams.get('from') || undefined, url.searchParams.get('older') === '1'));
                else if (path === "/health")
                    send(200, { mode: "test", realtime: Boolean(options.realtime) });
                else
                    send(404, { code: "invalid" });
                return;
            }
            if (req.method !== "POST") {
                send(405, { code: "invalid" });
                return;
            }
            if (req.headers.origin !== options.origin)
                throw new PilotError("forbidden");
            const data = await body(req);
            const field = (key) => {
                if (typeof data[key] !== "string" || data[key].length > 5000)
                    throw new PilotError("invalid");
                return data[key];
            };
            const sessionCookie = (name, value) => `${name}=${value}; HttpOnly; SameSite=Lax; Path=${prefix}; Max-Age=86400${options.secure ? "; Secure" : ""}`;
            // The cookie is shared by tabs. Refuse a stale tab's action after another
            // tab signs in as someone else; the supplied ID is a guard, never authority.
            if (path.startsWith("/rooms/") || path === "/logout" || path === "/test-session") {
                const actor = await pilot.me(token);
                if (field("principalId") !== actor.id)
                    throw new PilotError("identity_changed");
            }
            let result;
            if (path === "/test-session") {
                result = await pilot.testSessionSwitch(token, field("expectedRoomId"), field("action"));
            }
            else if (path === "/join") {
                const session = await pilot.join(field("code"), field("displayName"), data.optIn, ip);
                res.setHeader("Set-Cookie", sessionCookie("fp_pilot", session.token));
                result = session.principal;
            }
            else if (path === "/operator/login") {
                const session = await pilot.login(field("username"), field("password"), ip);
                res.setHeader("Set-Cookie", sessionCookie("fp_pilot", session.token));
                result = session.principal;
            }
            else if (path === "/logout") {
                result = await pilot.logout(token);
                await pilot.logout(cookie(req, "fp_display"));
                res.setHeader("Set-Cookie", [
                    sessionCookie("fp_pilot", "") + "; Max-Age=0",
                    sessionCookie("fp_display", "") + "; Max-Age=0",
                ]);
            }
            else if (path === "/displays/pair") {
                const session = await pilot.pair(field("code"), ip);
                res.setHeader("Set-Cookie", sessionCookie("fp_display", session.token));
                result = { paired: true };
            }
            else if (path === "/realtime/token") {
                if (!options.realtime)
                    throw new PilotError("unavailable");
                result = await options.realtime.token(token, field("roomId"));
            }
            else {
                const parts = path.split("/");
                if (parts[1] !== "rooms" || !parts[2])
                    throw new PilotError("invalid");
                const room = parts[2];
                switch (parts[3]) {
                    case "activity":
                        result = await pilot.activity(token, room, data.activity);
                        break;
                    case "create":
                        result = await pilot.createRoom(token, room);
                        break;
                    case "mutate":
                        result = await pilot.mutate(token, room, field("key"), data.mutation);
                        break;
                    case "moderate":
                        if (!Number.isInteger(data.revision))
                            throw new PilotError("invalid");
                        result = await pilot.moderate(token, room, field("action"), field("target"), data.revision);
                        break;
                    case "pairing":
                        result = await pilot.pairing(token, room);
                        break;
                    default:
                        throw new PilotError("invalid");
                }
            }
            // Notifications cannot roll back or turn a committed mutation into a failed send.
            if (options.realtime)
                try {
                    await options.realtime.drain(3, 2000);
                }
                catch {
                    /* durable outbox + foreground polling recover */
                }
            send(200, result);
        }
        catch (error) {
            const code = error instanceof PilotError ? error.code : "unavailable";
            if (code === "rate_limited")
                res.setHeader("Retry-After", "60");
            send(statuses[code] ?? 503, {
                code,
                message: code,
                retryAfterSeconds: code === "rate_limited" ? 60 : undefined,
            });
        }
    };
}
