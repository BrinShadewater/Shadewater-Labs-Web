-- Ephemeral public pencil indicators; never stores draft/message contents.
-- One rate-limited record per attendee, independent of the event JSON lock.
CREATE TABLE IF NOT EXISTS futureproof_pilot_fish_composing (
 event_id text NOT NULL REFERENCES futureproof_pilot_events(id) ON DELETE CASCADE,
 person_id text NOT NULL,
 expires_at bigint NOT NULL DEFAULT 0,
 window_until bigint NOT NULL,
 heartbeat_count integer NOT NULL CHECK (heartbeat_count BETWEEN 0 AND 30),
 PRIMARY KEY (event_id, person_id)
);
