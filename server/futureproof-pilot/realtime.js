import { Rest } from "ably";
export class Realtime {
    pilot;
    client;
    constructor(pilot, key) {
        this.pilot = pilot;
        this.client = new Rest({ key });
    }
    async token(token, roomId) {
        const scope = await this.pilot.tokenScope(token, roomId);
        return this.client.auth.createTokenRequest({
            clientId: scope.clientId,
            ttl: 60000,
            capability: JSON.stringify({ [scope.channel]: ["subscribe"] }),
        });
    }
    async drain() {
        const batch = await this.pilot.store.transaction(async (s) => ({
            eventId: s.eventId,
            items: s.outbox.slice(0, 50),
        }));
        const done = [];
        for (const item of batch.items) {
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
        await this.pilot.store.transaction(async (s) => {
            s.outbox = s.outbox.filter((i) => !done.includes(i.id));
        });
        return {
            delivered: done.length,
            pending: batch.items.length - done.length,
        };
    }
}
