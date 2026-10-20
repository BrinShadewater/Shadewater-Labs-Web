import { Rest } from "ably";
export class Realtime {
    pilot;
    client;
    constructor(pilot, key) {
        this.pilot = pilot;
        this.client = new Rest({ key, httpRequestTimeout: 2000, httpMaxRetryCount: 0 });
    }
    async token(token, roomId) {
        const scope = await this.pilot.tokenScope(token, roomId);
        return this.client.auth.createTokenRequest({
            clientId: scope.clientId,
            ttl: 60000,
            capability: JSON.stringify({ [scope.channel]: ["subscribe"] }),
        });
    }
    async drain(limit = 50, budgetMs = 10000) {
        const batch = await this.pilot.store.transaction(async (s) => ({
            eventId: s.eventId,
            items: s.outbox.slice(0, Math.max(1, Math.min(50, limit))),
        }));
        const done = [];
        const started = Date.now();
        for (const item of batch.items) {
            if (Date.now() - started >= budgetMs)
                break;
            try {
                await this.client.channels
                    .get(`pilot:${batch.eventId}:room:${item.roomId}`)
                    .publish("changed", { id: item.id, revision: item.revision });
                done.push(item.id);
            }
            catch {
                break;
            }
        }
        const pending = await this.pilot.store.transaction(async (s) => {
            s.outbox = s.outbox.filter((i) => !done.includes(i.id));
            return s.outbox.length;
        });
        return {
            delivered: done.length,
            pending,
        };
    }
}
