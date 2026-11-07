export const futureproofId = 'futureproof-space-centre';
export const futureproofName = 'Futureproof';
export const announcementMs = 6000;
// Slots are assigned on writes, never by a screen reading the queue. Keeping
// them stable prevents reconnects, hiding a sender or polling order from replaying mail.
export function scheduleAnnouncement(mail, all) {
    const end = all.reduce((latest, m) => m !== mail && !m.cancelledAt && m.recipientId === futureproofId && m.broadcastAt !== undefined ? Math.max(latest, m.broadcastAt + announcementMs) : latest, 0);
    mail.broadcastAt = Math.max(mail.deliverAt ?? mail.createdAt, end);
}
export function publicAnnouncements(mail, people, now) {
    return mail.filter(m => m.recipientId === futureproofId && !m.cancelledAt && m.broadcastAt !== undefined && m.broadcastAt + announcementMs > now && m.broadcastAt <= now + 30000 && people[m.senderId] && !people[m.senderId].suspended && !people[m.senderId].oceanHidden)
        .sort((a, b) => a.broadcastAt - b.broadcastAt).slice(0, 6)
        .map(m => ({ id: m.id, senderName: people[m.senderId].displayName, text: m.text, showAt: m.broadcastAt, hideAt: m.broadcastAt + announcementMs }));
}
