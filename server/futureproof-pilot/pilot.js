import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash, } from "node:crypto";
import { z } from "zod";
export class PilotError extends Error {
    code;
    constructor(code) {
        super(code);
        this.code = code;
    }
}
const fail = (code) => {
    throw new PilotError(code);
};
const digest = (s) => createHash("sha256").update(s).digest("hex");
export async function hashSecret(value) {
    const salt = randomBytes(16).toString("hex");
    return `${salt}:${scryptSync(value, salt, 32).toString("hex")}`;
}
function verify(value, encoded) {
    const [salt, hex] = encoded.split(":");
    if (!salt || !hex)
        return false;
    const expected = Buffer.from(hex, "hex");
    const actual = scryptSync(value, salt, 32);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export const emptyState = (eventId) => ({
    eventId,
    enabled: true,
    code: null,
    operators: [],
    people: {},
    sessions: {},
    rooms: {},
    rates: {},
    keys: {},
    pairs: {},
    outbox: [],
    audit: [],
    reports: [],
});
const publicFishSpecies = ['salmon', 'pacific-herring', 'canary-rockfish', 'lingcod', 'pacific-halibut', 'pacific-spiny-dogfish', 'sablefish', 'albacore-tuna', 'pacific-spiny-lumpsucker', 'tiger-rockfish', 'sockeye-salmon', 'red-rock-crab'];
const text = (max) => z.string().trim().min(1).max(max);
const mutation = z.discriminatedUnion("type", [
    z.object({ type: z.literal("message"), text: text(1000), replyTo: text(100).optional() }).strict(),
    z.object({ type: z.literal('reaction'), id: text(100), emoji: z.enum(['👍', '❤️', '👏', '💡', '😂', '🤔']), enabled: z.boolean() }).strict(),
    z.object({ type: z.literal("question"), text: text(500) }).strict(),
    z
        .object({ type: z.literal("vote"), id: text(100), enabled: z.boolean() })
        .strict(),
    z
        .object({ type: z.literal("answer"), id: text(100), text: text(5000) })
        .strict(),
    z.object({ type: z.literal("verbal"), id: text(100) }).strict(),
    z
        .object({ type: z.literal("mute"), id: text(100), enabled: z.boolean() })
        .strict(),
    z
        .object({ type: z.literal("report"), id: text(100), text: text(1000) })
        .strict(),
]);
export class Pilot {
    store;
    mode;
    schedule;
    clock;
    openTestAccess;
    constructor(store, mode, schedule = [], clock = Date.now, openTestAccess = false) {
        this.store = store;
        this.mode = mode;
        this.schedule = schedule;
        this.clock = clock;
        this.openTestAccess = openTestAccess;
    }
    testAccess() {
        return { enabled: this.mode === "test" && this.openTestAccess };
    }
    async enterTestModView(token, principalId) {
        return this.run(s => {
            if (!this.testAccess().enabled)
                fail("forbidden");
            const p = this.person(s, token);
            if (p.id !== principalId)
                fail("identity_changed");
            if (p.kind === "display")
                fail("forbidden");
            if (p.kind === "participant")
                p.testModerator = true;
            p.kind = "operator";
            p.role = "moderator";
            p.rooms = ["*"];
            return { id: p.id, eventId: p.eventId, kind: p.kind, displayName: p.displayName, role: p.role };
        });
    }
    async leaveTestModView(token, principalId) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== principalId)
                fail('identity_changed');
            if (p.testModerator) {
                p.kind = 'participant';
                delete p.role;
                p.rooms = [];
                delete p.testModerator;
            }
            return { id: p.id, eventId: p.eventId, kind: p.kind, displayName: p.displayName, role: p.role };
        });
    }
    async fishModeration(token) {
        return this.inspect(s => {
            const p = this.person(s, token);
            this.operator(p, '*');
            const owner = s.specialFishOwners?.krugfish;
            return { attendees: this.oceanAttendees(s, true).map(a => ({ ...a, hidden: Boolean(s.people[a.id].oceanHidden) })), krugfishOwner: owner && s.people[owner] ? { id: owner, displayName: s.people[owner].displayName } : null };
        });
    }
    async moderateFish(token, principalId, target, hidden) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== principalId)
                fail('identity_changed');
            this.operator(p, '*');
            const person = s.people[target];
            if (typeof hidden !== 'boolean' || !person || person.kind === 'display' || target === p.id)
                fail('invalid');
            person.oceanHidden = hidden;
            return { ok: true };
        });
    }
    async assignKrugfish(token, principalId, target) {
        return this.run(s => {
            const actor = this.person(s, token);
            if (actor.id !== principalId)
                fail('identity_changed');
            this.operator(actor, '*');
            const owner = s.people[target];
            if (!owner || owner.kind === 'display' || owner.suspended)
                fail('invalid');
            const previous = s.specialFishOwners?.krugfish;
            if (previous && previous !== target && s.people[previous]?.fishSpecies === 'krugfish')
                s.people[previous].fishSpecies = 'salmon';
            (s.specialFishOwners ??= {}).krugfish = target;
            owner.fishSpecies = 'krugfish';
            s.audit.push({ actor: actor.id, action: 'assign-krugfish', target, at: this.clock() });
            return { ok: true };
        });
    }
    async run(fn) {
        const result = await this.store.transaction(async (s) => {
            try {
                return { value: await fn(s) };
            }
            catch (e) {
                if (e instanceof PilotError)
                    return { error: e.code };
                throw e;
            }
        });
        if ("error" in result)
            fail(result.error);
        return result.value;
    }
    inspect(fn) {
        return this.store.read ? this.store.read(async (s) => fn(s)) : this.run(fn);
    }
    rate(s, key, max, ms = 60000) {
        const now = Date.now();
        for (const [k, v] of Object.entries(s.rates))
            if (v.until < now)
                delete s.rates[k];
        const k = digest(key);
        const r = (s.rates[k] ??= { count: 0, until: now + ms });
        if (++r.count > max)
            fail("rate_limited");
    }
    participantAccessValid(s, version) {
        return this.testAccess().enabled || Boolean(s.code && version === s.code.version && s.code.expires > Date.now());
    }
    person(s, token) {
        if (!s.enabled)
            fail("closed");
        const session = s.sessions[digest(token)];
        if (!session || session.expires < Date.now())
            return fail("unauthorized");
        const p = s.people[session.personId];
        if (!p || p.suspended)
            return fail("unauthorized");
        if (p.kind === "participant" &&
            !this.participantAccessValid(s, session.version))
            return fail("unauthorized");
        return p;
    }
    room(s, id) {
        if (!Object.hasOwn(s.rooms, id))
            return fail("invalid");
        return s.rooms[id];
    }
    operator(p, roomId, answer = false) {
        if ((p.role === "speaker" && !answer) ||
            p.kind !== "operator" ||
            (!p.rooms.includes("*") && !p.rooms.includes(roomId)))
            fail("forbidden");
    }
    issue(s, p, roomId) {
        const token = randomBytes(32).toString("hex");
        p.fishSpecies ??= s.people[p.id]?.fishSpecies;
        p.fishNameColor ??= s.people[p.id]?.fishNameColor;
        p.fishCode ??= s.people[p.id]?.fishCode;
        s.people[p.id] = p;
        s.sessions[digest(token)] = {
            personId: p.id,
            expires: Math.min(Date.now() + 86400000, p.kind === "participant" && !this.testAccess().enabled ? s.code.expires : Infinity),
            version: s.code?.version ?? 0,
            roomId,
        };
        const { id, eventId, kind, displayName } = p;
        return { token, principal: { id, eventId, kind, displayName } };
    }
    async join(code, name, optIn, ip) {
        return this.run((s) => {
            if (this.mode !== "test")
                fail("forbidden");
            if (!s.enabled)
                fail("closed");
            this.rate(s, `join-ip:${ip}`, 5);
            if (!this.testAccess().enabled)
                this.rate(s, `join-code:${code}`, 20);
            const parsed = text(60).safeParse(name);
            if (!parsed.success || typeof optIn !== "boolean" || code.length > 200)
                fail("invalid");
            if (!this.testAccess().enabled && (!s.code || s.code.expires < Date.now() || !verify(code, s.code.hash)))
                fail("unauthorized");
            return this.issue(s, {
                id: randomUUID(),
                eventId: s.eventId,
                kind: "participant",
                displayName: parsed.data,
                optIn,
                suspended: false,
                rooms: [],
                mutes: [],
            });
        });
    }
    async login(username, password, ip) {
        return this.run((s) => {
            if (!s.enabled)
                fail("closed");
            this.rate(s, `login:${ip}`, 5);
            this.rate(s, `user:${username}`, 20);
            const op = s.operators.find((o) => o.username === username);
            if (!op || password.length > 200 || !verify(password, op.hash))
                return fail("unauthorized");
            return this.issue(s, {
                id: op.id,
                displayName: op.displayName,
                role: op.role ?? "moderator",
                rooms: op.rooms,
                eventId: s.eventId,
                kind: "operator",
                optIn: false,
                suspended: false,
                mutes: [],
            });
        });
    }
    async me(token) {
        return this.inspect((s) => {
            const p = this.person(s, token);
            return {
                id: p.id,
                eventId: p.eventId,
                kind: p.kind,
                displayName: p.displayName,
                role: p.role,
            };
        });
    }
    async logout(token) {
        return this.run((s) => {
            delete s.sessions[digest(token)];
            return { ok: true };
        });
    }
    // Private mail never enters room snapshots, stage projection or the public outbox.
    async readFishMail(token, viewerId) {
        return this.inspect(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.kind === 'display')
                fail('forbidden');
            const attendees = this.oceanAttendees(s);
            const now = this.clock();
            const privateMail = (s.fishMail ?? []).filter(m => m.senderId === p.id || m.recipientId === p.id);
            const deliveries = privateMail.filter(m => (m.deliverAt ?? m.createdAt) > now).map(m => ({ id: m.id, senderId: m.senderId, recipientId: m.recipientId, createdAt: m.createdAt, deliverAt: m.deliverAt, senderName: s.people[m.senderId]?.displayName ?? 'Attendee', recipientName: s.people[m.recipientId]?.displayName ?? 'Attendee', senderFishSpecies: s.people[m.senderId]?.fishSpecies, recipientFishSpecies: s.people[m.recipientId]?.fishSpecies }));
            const messages = privateMail.filter(m => m.senderId === p.id || (m.deliverAt ?? m.createdAt) <= now)
                .map(({ key: _key, ...m }) => ({ ...m, senderName: s.people[m.senderId]?.displayName ?? 'Attendee', recipientName: s.people[m.recipientId]?.displayName ?? 'Attendee', senderFishSpecies: s.people[m.senderId]?.fishSpecies, recipientFishSpecies: s.people[m.recipientId]?.fishSpecies }));
            return { availableFishSpecies: s.specialFishOwners?.krugfish === p.id ? [...publicFishSpecies, 'krugfish'] : [...publicFishSpecies], viewerId: p.id, viewerFishSpecies: p.fishSpecies, viewerNameColor: p.fishNameColor ?? '#e7f6f2', serverTime: now, attendees, messages, deliveries, oceanDeliveries: this.oceanDeliveries(s, now, attendees) };
        });
    }
    oceanAttendees(s, includeHidden = false) {
        const active = new Set(Object.values(s.sessions).filter(session => session.expires > Date.now() &&
            (s.people[session.personId]?.kind !== 'participant' || this.participantAccessValid(s, session.version)))
            .map(session => session.personId));
        const attendees = Object.values(s.people).filter(person => person.kind !== 'display' && !person.suspended && (includeHidden || !person.oceanHidden) && active.has(person.id))
            .map(({ id, displayName, fishSpecies, fishNameColor }) => ({ id, displayName, fishSpecies, fishNameColor: fishNameColor ?? '#e7f6f2', composing: (s.fishComposing?.[id] ?? 0) > this.clock() })).sort((a, b) => a.displayName.localeCompare(b.displayName));
        return attendees;
    }
    oceanDeliveries(s, now, attendees) {
        const visible = new Set(attendees.map(person => person.id));
        // Retain only 16 seconds of completed public animation metadata so a newly
        // opened screen can reproduce a fish swimming away after its hand-off.
        return (s.fishMail ?? []).filter(mail => (mail.deliverAt ?? mail.createdAt) > now - 16000 && visible.has(mail.senderId) && visible.has(mail.recipientId)).map(mail => ({
            id: digest(`ocean:${mail.id}`).slice(0, 24), senderId: mail.senderId, recipientId: mail.recipientId, createdAt: mail.createdAt, deliverAt: mail.deliverAt,
        }));
    }
    async readOcean(token) {
        return this.inspect(s => {
            this.person(s, token);
            const now = this.clock(), attendees = this.oceanAttendees(s);
            const deliveries = this.oceanDeliveries(s, now, attendees);
            return { serverTime: now, validForMs: 15000, attendees, deliveries };
        });
    }
    async composingFish(token, viewerId, composing) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.kind === 'display')
                fail('forbidden');
            if (typeof composing !== 'boolean')
                fail('invalid');
            s.fishComposing ??= {};
            for (const [id, until] of Object.entries(s.fishComposing))
                if (until <= this.clock())
                    delete s.fishComposing[id];
            if (composing) {
                this.rate(s, `fish-composing:${p.id}`, 30);
                s.fishComposing[p.id] = this.clock() + 12000;
            }
            else
                delete s.fishComposing[p.id];
            return { ok: true };
        });
    }
    async fishCode(token, viewerId) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.kind === 'display')
                fail('forbidden');
            if (!p.fishCode) {
                let code;
                do {
                    code = randomBytes(12).toString('base64url');
                } while (Object.values(s.people).some(person => person.fishCode === code));
                p.fishCode = code;
            }
            return { code: p.fishCode };
        });
    }
    async findFish(token, code) {
        return this.inspect(s => {
            const viewer = this.person(s, token);
            if (viewer.kind === 'display')
                fail('forbidden');
            if (!/^[A-Za-z0-9_-]{16}$/.test(code))
                return fail('invalid');
            const person = Object.values(s.people).find(p => p.fishCode === code && !p.suspended && p.kind !== 'display');
            if (!person)
                return fail('invalid');
            return { id: person.id, displayName: person.displayName, fishSpecies: person.fishSpecies };
        });
    }
    async chooseFish(token, viewerId, species, nameColor) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.kind === 'display')
                fail('forbidden');
            const parsed = z.enum([...publicFishSpecies, 'krugfish']).safeParse(species);
            if (!parsed.success)
                return fail('invalid');
            const parsedColor = z.enum(['#e7f6f2', '#a8e6cf', '#f6d28d', '#ffb5a7', '#d3b9ff', '#a8d8ff', '#ffc2df']).optional().safeParse(nameColor);
            if (!parsedColor.success)
                return fail('invalid');
            const color = parsedColor.data ?? p.fishNameColor;
            if (parsed.data === 'krugfish' && s.specialFishOwners?.krugfish !== p.id)
                fail('forbidden');
            if (parsed.data === 'red-rock-crab' && s.fishMail?.some(m => m.senderId === p.id && (m.deliverAt ?? m.createdAt) > this.clock()))
                fail('conflict');
            if (p.fishSpecies !== parsed.data || p.fishNameColor !== color) {
                this.rate(s, `fish-choice:${p.id}`, 20);
                p.fishSpecies = parsed.data;
                p.fishNameColor = color;
            }
            return { fishSpecies: p.fishSpecies, fishNameColor: p.fishNameColor ?? '#e7f6f2' };
        });
    }
    async sendFishMail(token, viewerId, recipientId, content, key) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.fishSpecies === 'red-rock-crab')
                fail('forbidden');
            if (p.kind === 'display')
                fail('forbidden');
            const parsed = text(1000).safeParse(content);
            if (!parsed.success || !/^[a-zA-Z0-9-]{8,100}$/.test(key))
                return fail('invalid');
            const mail = s.fishMail ??= [];
            const previous = mail.find(m => m.senderId === p.id && m.key === key);
            if (previous) {
                if (previous.recipientId !== recipientId || previous.text !== parsed.data)
                    fail('conflict');
                return { id: previous.id, createdAt: previous.createdAt, deliverAt: previous.deliverAt ?? previous.createdAt };
            }
            const recipient = Object.hasOwn(s.people, recipientId) ? s.people[recipientId] : undefined;
            if (!recipient || recipient.suspended || recipient.kind === 'display' || recipientId === p.id)
                fail('invalid');
            // Recipients may go offline after selection; their private inbox retains delivery.
            this.rate(s, `fish-mail:${p.id}`, 10);
            if (mail.length >= 10000)
                fail('unavailable');
            const id = randomUUID(), createdAt = this.clock();
            // Persist a one-to-ten-minute journey once; retries keep the original arrival.
            const deliverAt = createdAt + 60_000 + (parseInt(digest(id).slice(0, 8), 16) % 540_001);
            const message = { id, senderId: p.id, recipientId, text: parsed.data, createdAt, deliverAt, readAt: null, key };
            mail.push(message);
            return { id: message.id, createdAt, deliverAt };
        });
    }
    async markFishMailRead(token, viewerId, id) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.id !== viewerId)
                fail('identity_changed');
            if (p.kind === 'display')
                fail('forbidden');
            const message = s.fishMail?.find(m => m.id === id && m.recipientId === p.id);
            if (!message || (message.deliverAt ?? message.createdAt) > this.clock())
                return fail('invalid');
            message.readAt ??= Date.now();
            return { ok: true };
        });
    }
    async createRoom(token, id) {
        return this.run((s) => {
            const p = this.person(s, token);
            this.operator(p, id);
            if (!/^[a-z][a-z0-9-]{0,100}$/.test(id) ||
                ["constructor", "prototype", "__proto__"].includes(id))
                fail("invalid");
            if (!Object.hasOwn(s.rooms, id))
                s.rooms[id] = {
                    id,
                    revision: 0,
                    chatOpen: true,
                    questionsOpen: true,
                    messages: [],
                    questions: [],
                    stage: null,
                    paused: false,
                };
            return { id };
        });
    }
    async activeRoom(token) {
        const unchanged = await this.inspect(s => {
            const person = this.person(s, token);
            if (person.kind === 'display')
                return fail('forbidden');
            const id = this.currentRoomId(s);
            if (!id || !s.rooms[id] || s.activeRoomId !== id)
                return null;
            return { roomId: id, rooms: Object.keys(s.rooms), testSwitch: Boolean(s.testSwitch), canTestSwitch: this.mode === 'test' && person.kind === 'operator' && person.role !== 'speaker' && person.rooms.includes('*') };
        });
        if (unchanged)
            return unchanged;
        return this.run(s => {
            const person = this.person(s, token);
            if (person.kind === 'display')
                return fail('forbidden');
            const id = this.currentRoomId(s);
            if (!id)
                return fail('unavailable');
            if (!s.rooms[id])
                s.rooms[id] = { id, revision: 0, chatOpen: true, questionsOpen: true, messages: [], questions: [], stage: null, paused: false };
            if (s.activeRoomId !== id) {
                for (const room of Object.values(s.rooms)) {
                    room.stage = null;
                    if (room.id !== id)
                        room.questionsOpen = false;
                }
                s.rooms[id].questionsOpen = true;
                s.activeRoomId = id;
            }
            return { roomId: id, rooms: Object.keys(s.rooms), testSwitch: Boolean(s.testSwitch), canTestSwitch: this.mode === 'test' && person.kind === 'operator' && person.role !== 'speaker' && person.rooms.includes('*') };
        });
    }
    currentRoomId(s) {
        return this.scheduledRoomId(s) || s.activeRoomId || Object.keys(s.rooms)[0];
    }
    scheduledRoomId(s) {
        if (this.mode === 'test' && s.testSwitch)
            return s.testSwitch.roomId;
        return this.schedule.filter(x => Date.parse(x.startsAt) <= this.clock()).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)).at(-1)?.id;
    }
    async testSessionSwitch(token, expectedRoomId, action) {
        return this.run(s => {
            const p = this.person(s, token);
            if (this.mode !== 'test' || p.kind !== 'operator' || p.role === 'speaker' || !p.rooms.includes('*'))
                fail('forbidden');
            if (action !== 'next' && action !== 'resume')
                fail('invalid');
            if (this.currentRoomId(s) !== expectedRoomId)
                fail('conflict');
            if (action === 'next') {
                const roomId = `test-session-${randomUUID()}`;
                s.testSwitch = { roomId, returnRoomId: s.testSwitch?.returnRoomId || expectedRoomId };
            }
            else {
                s.activeRoomId = s.testSwitch?.returnRoomId || s.activeRoomId;
                delete s.testSwitch;
            }
            const id = this.currentRoomId(s);
            if (!id)
                return fail('unavailable');
            if (!s.rooms[id])
                s.rooms[id] = { id, revision: 0, chatOpen: true, questionsOpen: true, messages: [], questions: [], stage: null, paused: false };
            for (const room of Object.values(s.rooms)) {
                room.stage = null;
                room.questionsOpen = room.id === id;
                this.changed(s, room);
            }
            s.activeRoomId = id;
            s.audit.push({ actor: p.id, action: `test-session-${action}`, target: id, at: Date.now() });
            return { roomId: id };
        });
    }
    changed(s, r) {
        r.revision++;
        s.outbox.push({
            id: randomUUID(),
            roomId: r.id,
            revision: r.revision,
            at: Date.now(),
        });
    }
    activityView(s, viewer, chatOpen) {
        const now = this.clock();
        const valid = (id) => {
            const person = s.people[id];
            return person && !person.suspended && person.kind !== 'display' && Object.values(s.sessions).some(session => session.personId === id && session.expires > Date.now() && (person.kind !== 'participant' || this.participantAccessValid(s, session.version)));
        };
        s.activity ??= {};
        for (const [id, value] of Object.entries(s.activity))
            if (value.seenAt + 30000 <= now || !valid(id))
                delete s.activity[id];
        s.applause = (s.applause ?? []).filter(item => item.at + 6000 > now && valid(item.authorId)).slice(-20);
        return { online: Object.keys(s.activity).length,
            typing: chatOpen ? Object.entries(s.activity).filter(([id, value]) => id !== viewer.id && !viewer.mutes.includes(id) && value.typingUntil > now).map(([id]) => ({ id, name: s.people[id].displayName })).slice(0, 4) : [],
            applause: s.applause.filter(item => !viewer.mutes.includes(item.authorId)).map(item => ({ id: item.id, emoji: item.emoji, expiresAt: item.at + 6000 })),
            validForMs: 6000,
        };
    }
    async activity(token, roomId, input) {
        return this.run(s => {
            const p = this.person(s, token);
            if (p.kind === 'display')
                return fail('forbidden');
            const r = this.room(s, roomId);
            const parsed = z.object({ active: z.boolean(), typing: z.boolean(), emoji: z.enum(['👏', '❤️', '💡']).optional() }).strict().safeParse(input);
            if (!parsed.success)
                return fail('invalid');
            const { active, typing, emoji } = parsed.data;
            if ((typing || emoji) && !r.chatOpen)
                return fail('closed');
            if (!active && (typing || emoji))
                return fail('invalid');
            this.rate(s, `${p.id}:activity`, 60);
            this.activityView(s, p, r.chatOpen);
            const previous = s.activity[p.id];
            if (active)
                s.activity[p.id] = { seenAt: this.clock(), typingUntil: typing ? this.clock() + 8000 : 0 };
            else
                delete s.activity[p.id];
            if (emoji) {
                this.rate(s, `${p.id}:applause`, 12);
                s.applause.push({ id: randomUUID(), authorId: p.id, emoji, at: this.clock() });
            }
            // Ephemeral signals notify readers without invalidating moderator actions.
            if (!previous || Boolean(previous.typingUntil > this.clock()) !== typing || !active || emoji)
                s.outbox.push({ id: randomUUID(), roomId: r.id, revision: r.revision, at: Date.now() });
            return { ok: true };
        });
    }
    async read(token, roomId, from, older = false) {
        return this.inspect((s) => {
            const p = this.person(s, token);
            if (p.kind === "display")
                fail("forbidden");
            const r = this.room(s, roomId);
            const canAnswer = p.kind === "operator" &&
                (p.rooms.includes("*") || p.rooms.includes(roomId));
            const isMod = canAnswer &&
                p.role !== "speaker" &&
                (p.rooms.includes("*") || p.rooms.includes(roomId));
            const safe = (i) => ({
                reply: i.replyTo ? (() => {
                    const parent = Object.values(s.rooms).flatMap(room => room.messages).find(message => message.id === i.replyTo);
                    return parent && !parent.hidden && !p.mutes.includes(parent.authorId) ? { id: parent.id, author: s.people[parent.authorId]?.displayName ?? 'Participant', text: parent.text.slice(0, 160) } : { id: i.replyTo, author: '', text: null };
                })() : null,
                reactions: Object.entries(i.reactions ?? {}).map(([emoji, people]) => ({ emoji, count: people.length, reacted: people.includes(p.id) })).filter(reaction => reaction.count > 0),
                id: i.id,
                text: i.text,
                author: s.people[i.authorId]?.displayName ?? "Participant",
                authorId: i.authorId,
                authorFishSpecies: s.people[i.authorId]?.fishSpecies ?? null,
                authorRole: s.people[i.authorId]?.kind === 'operator' ? (s.people[i.authorId]?.role ?? 'moderator') : null,
                createdAt: i.createdAt,
                status: i.status,
                votes: i.voters.length,
                voted: i.voters.includes(p.id),
                answer: i.answer
                    ? {
                        text: i.answer.text,
                        at: i.answer.at,
                        author: s.people[i.answer.authorId]?.displayName ?? "Speaker",
                    }
                    : null,
                verbal: i.verbal ?? false,
                hidden: i.hidden,
            });
            const allMessages = Object.values(s.rooms).flatMap(room => room.messages).sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
            const visible = allMessages.filter(i => isMod || (!i.hidden && !p.mutes.includes(i.authorId)));
            let start = Math.max(0, visible.length - 100);
            if (from === 'start')
                start = 0;
            else if (from) {
                const anchor = allMessages.find(i => i.id === from);
                if (!anchor)
                    return fail('invalid');
                const index = visible.findIndex(i => i.createdAt > anchor.createdAt || (i.createdAt === anchor.createdAt && i.id.localeCompare(anchor.id) >= 0));
                start = Math.min(start, index < 0 ? visible.length : index);
                if (older)
                    start = Math.max(0, start - 100);
            }
            return {
                activity: this.activityView(s, p, r.chatOpen),
                roomId: r.id,
                viewerId: p.id,
                revision: r.revision,
                cursor: String(r.revision),
                chatOpen: r.chatOpen,
                questionsOpen: r.questionsOpen,
                pinned: Object.values(s.rooms).flatMap(room => room.messages).filter(i => i.id === r.pinnedId && !i.hidden && !p.mutes.includes(i.authorId)).map(safe)[0] ?? null,
                messages: visible.slice(start).map(safe),
                historyFrom: visible[start]?.id ?? 'start',
                hasOlderMessages: start > 0,
                questions: r.questions
                    .filter((i) => isMod ||
                    (!i.hidden &&
                        ((i.status !== "pending" && i.status !== "rejected") ||
                            i.authorId === p.id)))
                    .map(safe),
                moderator: isMod,
                canAnswer,
                stage: isMod ? r.stage : undefined,
                reports: isMod
                    ? s.reports.filter((x) => x.roomId === roomId)
                    : undefined,
            };
        });
    }
    async mutate(token, roomId, key, input) {
        return this.run((s) => {
            const p = this.person(s, token);
            if (p.kind === "display")
                fail("forbidden");
            const r = this.room(s, roomId);
            const parsed = mutation.safeParse(input);
            if (!parsed.success || !key || key.length > 100)
                fail("invalid");
            const m = parsed.data;
            const scheduled = this.scheduledRoomId(s);
            if (m.type === 'question' && scheduled && scheduled !== roomId)
                fail('closed');
            const fingerprint = digest(JSON.stringify(m));
            const k = digest(`${p.id}:${roomId}:${key}`);
            const prior = s.keys[k];
            if (prior) {
                if (prior.fingerprint !== fingerprint)
                    fail("conflict");
                return prior.result;
            }
            let id = randomUUID();
            if (m.type === "message" || m.type === "question") {
                if (m.type === "message" ? !r.chatOpen : !r.questionsOpen)
                    fail("closed");
                this.rate(s, `${p.id}:${m.type}`, m.type === "message" ? 10 : 3);
                if (m.type === "message")
                    this.rate(s, `${p.id}:burst`, 3, 10000);
                if (m.type === 'message' && m.replyTo) {
                    const parent = Object.values(s.rooms).flatMap(room => room.messages).find(message => message.id === m.replyTo);
                    if (!parent || parent.hidden || p.mutes.includes(parent.authorId))
                        return fail('invalid');
                }
                const item = {
                    ...(m.type === 'message' && m.replyTo ? { replyTo: m.replyTo } : {}),
                    id,
                    authorId: p.id,
                    text: m.text,
                    createdAt: Date.now(),
                    hidden: false,
                    status: m.type === "question" ? "pending" : "open",
                    voters: [],
                };
                (m.type === "message" ? r.messages : r.questions).push(item);
            }
            else if (m.type === 'reaction') {
                if (!r.chatOpen)
                    fail('closed');
                const target = Object.values(s.rooms).flatMap(room => room.messages).find(message => message.id === m.id);
                if (!target || target.hidden || p.mutes.includes(target.authorId))
                    return fail('invalid');
                this.rate(s, `${p.id}:reaction`, 30);
                target.reactions ??= {};
                const people = target.reactions[m.emoji] ?? [];
                target.reactions[m.emoji] = m.enabled ? [...new Set([...people, p.id])] : people.filter(person => person !== p.id);
                id = target.id;
            }
            else if (m.type === "mute") {
                if (m.id === p.id || !s.people[m.id])
                    fail("invalid");
                p.mutes = m.enabled
                    ? [...new Set([...p.mutes, m.id])]
                    : p.mutes.filter((x) => x !== m.id);
                id = m.id;
            }
            else if (m.type === "report") {
                if (![...Object.values(s.rooms).flatMap(room => room.messages), ...r.questions].some((i) => i.id === m.id))
                    fail("invalid");
                this.rate(s, `${p.id}:reports`, 5);
                s.reports.push({
                    actor: p.id,
                    roomId,
                    target: m.id,
                    reason: m.text,
                    at: Date.now(),
                });
                id = m.id;
            }
            else {
                const q = r.questions.find((i) => i.id === m.id);
                if (!q || q.hidden || q.status === "pending" || q.status === "rejected")
                    return fail("invalid");
                id = q.id;
                if (m.type === "vote") {
                    q.voters = m.enabled
                        ? [...new Set([...q.voters, p.id])]
                        : q.voters.filter((x) => x !== p.id);
                }
                else {
                    this.operator(p, roomId, true);
                    if (m.type === "answer")
                        q.answer = { text: m.text, authorId: p.id, at: Date.now() };
                    else
                        q.verbal = true;
                    q.status = "answered";
                }
            }
            const result = { id };
            s.keys[k] = { fingerprint, result, expires: Date.now() + 86400000 };
            this.changed(s, r);
            return result;
        });
    }
    async moderate(token, roomId, action, target, revision) {
        return this.run((s) => {
            const p = this.person(s, token);
            this.operator(p, roomId);
            const r = this.room(s, roomId);
            if (r.revision !== revision)
                fail("conflict");
            const messages = Object.values(s.rooms).flatMap(room => room.messages);
            const item = [...messages, ...r.questions].find((i) => i.id === target);
            const sourceRoom = Object.values(s.rooms).find(room => room.messages.some(i => i.id === target));
            if (sourceRoom)
                this.operator(p, sourceRoom.id);
            if (action === "open" || action === "close") {
                r.chatOpen = r.questionsOpen = action === "open";
            }
            else if (action === "unpin")
                r.pinnedId = null;
            else if (action === "pin") {
                if (!item || item.hidden || !messages.includes(item))
                    return fail('invalid');
                r.pinnedId = item.id;
            }
            else if (action === "clear")
                r.stage = null;
            else if (action === "pause")
                r.paused = !r.paused;
            else if (action === "suspend") {
                const person = s.people[target];
                if (!person || person.kind !== "participant")
                    fail("invalid");
                person.suspended = true;
                if (r.stage &&
                    [...r.messages, ...r.questions].some((i) => i.id === r.stage.id && i.authorId === target))
                    r.stage = null;
            }
            else {
                if (!item)
                    return fail("invalid");
                if (action === "approve") {
                    if (!r.questions.includes(item) ||
                        item.hidden ||
                        item.status !== "pending")
                        fail("invalid");
                    item.status = "open";
                }
                else if (action === "reject" || action === "hide") {
                    item.hidden = true;
                    if (action === "reject")
                        item.status = "rejected";
                    if (r.stage?.id === item.id)
                        r.stage = null;
                    if (r.pinnedId === item.id)
                        r.pinnedId = null;
                    for (const other of Object.values(s.rooms)) {
                        if (other.pinnedId === item.id)
                            other.pinnedId = null;
                        if (other.stage?.id === item.id)
                            other.stage = null;
                    }
                }
                else if (action === "show") {
                    if (item.hidden ||
                        item.status === "pending" ||
                        item.status === "rejected")
                        fail("invalid");
                    r.stage = {
                        id: item.id,
                        text: item.text,
                        author: s.people[item.authorId]?.optIn
                            ? s.people[item.authorId].displayName
                            : null,
                    };
                }
                else
                    fail("invalid");
            }
            s.audit.push({ actor: p.id, action, target, at: Date.now() });
            this.changed(s, r);
            return { revision: r.revision };
        });
    }
    async pairing(token, roomId) {
        return this.run((s) => {
            const p = this.person(s, token);
            this.operator(p, roomId);
            this.room(s, roomId);
            const code = randomBytes(12).toString("base64url");
            s.pairs[digest(code)] = { roomId, expires: Date.now() + 300000 };
            return { code, expires: Date.now() + 300000 };
        });
    }
    async pair(code, ip) {
        return this.run((s) => {
            this.rate(s, `pair:${ip}`, 5);
            const pair = s.pairs[digest(code)];
            if (!s.enabled || !pair || pair.expires < Date.now())
                return fail("unauthorized");
            delete s.pairs[digest(code)];
            return this.issue(s, {
                id: randomUUID(),
                eventId: s.eventId,
                kind: "display",
                displayName: "Stage",
                optIn: false,
                suspended: false,
                rooms: [],
                mutes: [],
            }, pair.roomId);
        });
    }
    async display(token) {
        return this.inspect((s) => {
            const p = this.person(s, token);
            if (p.kind !== "display")
                return fail("forbidden");
            const session = s.sessions[digest(token)];
            const r = this.room(s, session.roomId);
            const scheduled = this.scheduledRoomId(s);
            return {
                roomId: r.id,
                revision: r.revision,
                item: scheduled && scheduled !== r.id ? null : r.stage,
                paused: r.paused,
                validForMs: 15000,
            };
        });
    }
    async tokenScope(token, roomId) {
        return this.inspect((s) => {
            const p = this.person(s, token);
            if (p.kind === "display")
                fail("forbidden");
            this.room(s, roomId);
            return { clientId: p.id, channel: `pilot:${s.eventId}:room:${roomId}` };
        });
    }
}
