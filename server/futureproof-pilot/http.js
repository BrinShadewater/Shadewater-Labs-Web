import { PilotError } from "./pilot.js";
import { futureproofId } from './futureproofMail.js';

const prefix = "/api/fishmail";
const publicReads = new Set(['/health', '/test-access', '/me', '/fish-mail',
    '/fish-mail/find', '/fish-mail/social-links', '/fish-mail/ocean']);
const publicWrites = new Set(['/join', '/logout', '/fish-mail/recovery-key',
    '/fish-mail/recover', '/fish-mail/preferences', '/fish-mail/block',
    '/fish-mail/composing', '/fish-mail/code', '/fish-mail/social-links',
    '/fish-mail/choose', '/fish-mail/send', '/fish-mail/read']);
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
            const permitted = req.method === 'GET' ? publicReads : req.method === 'POST' ? publicWrites : null;
            if (!permitted?.has(path)) {
                send(404, { code: 'invalid' });
                return;
            }
            const token = cookie(req, "sl_fishmail");
            const ip = options.trustedProxy
                ? String(req.headers["x-vercel-forwarded-for"] ?? req.socket.remoteAddress)
                : (req.socket.remoteAddress ?? "unknown");
            if (req.method === "GET") {
                const known = Object.fromEntries(['attendees', 'mail', 'journeys', 'announcements'].map(key => [key, url.searchParams.get(key) ?? '']));
                if (url.searchParams.has('presence'))
                    known.presence = url.searchParams.get('presence') ?? '';
                if (path === "/test-access")
                    send(200, { ...pilot.testAccess(), moderationEnabled: pilot.testModerationAccess().enabled });
                else if (path === "/me")
                    send(200, await pilot.me(token));
                else if (path === "/fish-mail/find")
                    send(200, await pilot.findFish(token, url.searchParams.get("code") ?? ""));
                else if (path === "/fish-mail/social-links")
                    send(200, await pilot.readFishSocialLinks(token, url.searchParams.get('viewerId') ?? ''));
                else if (path === "/fish-mail/ocean")
                    send(200, url.searchParams.get('compact') === '1' ? await pilot.readOceanChanges(token, known) : await pilot.readOcean(token));
                else if (path === "/fish-mail")
                    send(200, url.searchParams.get('compact') === '1' ? await pilot.readFishMailChanges(token, url.searchParams.get('viewerId') ?? '', known) : await pilot.readFishMail(token, url.searchParams.get('viewerId') ?? ''));
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
            if (path === "/logout") {
                const actor = await pilot.me(token);
                if (field("principalId") !== actor.id)
                    throw new PilotError("identity_changed");
            }
            let result;
            if (path === "/fish-mail/recovery-key") {
                result = await pilot.createFishRecovery(token, field("principalId"));
            }
            else if (path === "/fish-mail/recover") {
                const session = await pilot.recoverFish(field("key").trim(), ip);
                res.setHeader("Set-Cookie", sessionCookie("sl_fishmail", session.token));
                result = session.principal;
            }
            else if (path === "/fish-mail/preferences") {
                result = await pilot.fishPreferences(token, field('principalId'), data.silenced);
            }
            else if (path === "/fish-mail/block") {
                result = await pilot.blockFish(token, field('principalId'), field('target'), data.blocked);
            }
            else if (path === "/fish-mail/composing") {
                result = await pilot.composingFish(token, field("principalId"), data.composing);
            }
            else if (path === "/fish-mail/code") {
                result = await pilot.fishCode(token, field("principalId"));
            }
            else if (path === "/fish-mail/social-links") {
                result = await pilot.saveFishSocialLinks(token, field('principalId'), data.links);
            }
            else if (path === "/fish-mail/choose") {
                result = await pilot.chooseFish(token, field('principalId'), field('species'), data.nameColor);
            }
            else if (path === "/fish-mail/send") {
                const recipient = field('recipientId');
                if (recipient === futureproofId || data.publicMessage === true)
                    throw new PilotError('forbidden');
                result = await pilot.sendFishMail(token, field('principalId'), recipient, field('text'), field('key'));
            }
            else if (path === "/fish-mail/read") {
                result = await pilot.markFishMailRead(token, field('principalId'), field('id'));
            }
            else if (path === "/join") {
                const session = await pilot.join(field("code"), field("displayName"), data.optIn, ip);
                res.setHeader("Set-Cookie", sessionCookie("sl_fishmail", session.token));
                result = session.principal;
            }
            else if (path === "/logout") {
                result = await pilot.logout(token);
                res.setHeader("Set-Cookie", sessionCookie("sl_fishmail", "") + "; Max-Age=0");
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
