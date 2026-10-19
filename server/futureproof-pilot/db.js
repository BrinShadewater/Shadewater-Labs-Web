export class PgStore {
    pool;
    eventId;
    constructor(pool, eventId) {
        this.pool = pool;
        this.eventId = eventId;
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
}
