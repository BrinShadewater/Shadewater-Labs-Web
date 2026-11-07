import { PilotError } from './pilot.js';
export class PgStore {
    pool;
    eventId;
    constructor(pool, eventId) {
        this.pool = pool;
        this.eventId = eventId;
    }
    async read(fn) {
        const result = await this.pool.query('SELECT state FROM futureproof_pilot_events WHERE id=$1', [this.eventId]);
        const state = result.rows[0]?.state;
        if (!state || state.eventId !== this.eventId)
            throw new Error('Pilot event unavailable');
        return fn(state);
    }
    async transaction(fn) {
        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            const result = await client.query("SELECT state FROM futureproof_pilot_events WHERE id=$1 FOR UPDATE", [this.eventId]);
            if (!result.rows[0])
                throw new Error("Pilot not initialized");
            const state = result.rows[0].state;
            if (state.eventId !== this.eventId)
                throw new Error("Event scope mismatch");
            const value = await fn(state);
            await client.query("UPDATE futureproof_pilot_events SET state=$2::jsonb, updated_at=now() WHERE id=$1", [this.eventId, JSON.stringify(state)]);
            await client.query("COMMIT");
            return value;
        }
        catch (e) {
            await client.query("ROLLBACK");
            throw e;
        }
        finally {
            client.release();
        }
    }
    async readFish(now, fn) {
        // One SQL snapshot/round trip; ordinary chat reads do not fetch fish presence.
        const result = await this.pool.query(`SELECT state, COALESCE((SELECT jsonb_object_agg(person_id,expires_at)
       FROM futureproof_pilot_fish_composing WHERE event_id=$1 AND expires_at>$2),'{}'::jsonb) AS composing
       FROM futureproof_pilot_events WHERE id=$1`, [this.eventId, now]);
        const row = result.rows[0];
        if (!row || row.state.eventId !== this.eventId)
            throw new Error('Pilot event unavailable');
        return fn({ ...row.state, fishComposing: row.composing });
    }
    async writeFishComposing(personId, composing, now) {
        // Atomic per-attendee rate window. Stopping does not erase/reset the counter.
        const result = await this.pool.query(`INSERT INTO futureproof_pilot_fish_composing(event_id,person_id,expires_at,window_until,heartbeat_count)
       VALUES($1,$2,$3,$4,$5)
       ON CONFLICT(event_id,person_id) DO UPDATE SET
        expires_at=EXCLUDED.expires_at,
        window_until=CASE WHEN futureproof_pilot_fish_composing.window_until<=$6 THEN EXCLUDED.window_until ELSE futureproof_pilot_fish_composing.window_until END,
        heartbeat_count=CASE WHEN futureproof_pilot_fish_composing.window_until<=$6 THEN $5 ELSE futureproof_pilot_fish_composing.heartbeat_count+$5 END
       WHERE $5=0 OR futureproof_pilot_fish_composing.window_until<=$6 OR futureproof_pilot_fish_composing.heartbeat_count<30
       RETURNING person_id`, [this.eventId, personId, composing ? now + 12000 : 0, now + 60000, composing ? 1 : 0, now]);
        if (!result.rowCount)
            throw new PilotError('rate_limited');
    }
}
