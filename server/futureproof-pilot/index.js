import { Pool } from "pg";
import { PgStore } from "./db.js";
import { Pilot } from "./pilot.js";
import { Realtime } from "./realtime.js";
import { handler } from "./http.js";
import { schedule } from './schedule.js';
let ready;
export default async function (request, response) {
    if (!ready) {
        try {
            const env = process.env;
            if (env.PILOT_ENABLED !== "1" || env.PILOT_MODE !== "test")
                throw new Error("Disabled");
            const origin = new URL(env.PILOT_ORIGIN);
            if (origin.origin !== env.PILOT_ORIGIN ||
                (origin.protocol !== "https:" &&
                    origin.hostname !== "127.0.0.1" &&
                    origin.hostname !== "localhost"))
                throw new Error("Origin");
            if (!env.PILOT_DATABASE_URL ||
                !env.PILOT_EVENT_ID ||
                !env.PILOT_CRON_SECRET ||
                env.PILOT_CRON_SECRET.length < 32)
                throw new Error("Configuration");
            const database = new URL(env.PILOT_DATABASE_URL);
            if (!["postgres:", "postgresql:"].includes(database.protocol) ||
                database.searchParams.get("sslmode") !== "verify-full")
                throw new Error("Database TLS");
            const store = new PgStore(new Pool({
                connectionString: env.PILOT_DATABASE_URL,
                max: 3,
                connectionTimeoutMillis: 5000,
                query_timeout: 10000,
            }), env.PILOT_EVENT_ID);
            const pilot = new Pilot(store, "test", schedule, Date.now, env.PILOT_TEST_OPEN_ACCESS === "1");
            ready = handler(pilot, {
                origin: origin.origin,
                secure: origin.protocol === "https:",
                cronSecret: env.PILOT_CRON_SECRET,
                trustedProxy: env.VERCEL === "1",
                realtime: env.PILOT_ABLY_KEY
                    ? new Realtime(pilot, env.PILOT_ABLY_KEY)
                    : undefined,
            });
        }
        catch {
            response
                .writeHead(503, {
                "Content-Type": "application/json",
                "Cache-Control": "private, no-store",
            })
                .end(JSON.stringify({
                code: "unavailable",
                message: "Test conversations are not configured yet.",
            }));
            return;
        }
    }
    return ready(request, response);
}
