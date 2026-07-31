/**
 * What the lab is actually working on.
 *
 * This is a claim about the present, so it goes stale faster than anything else on the
 * site. Two rules keep it honest:
 *
 *   1. No ship dates. Intent is checkable; a date is a promise.
 *   2. Every entry names something a reader could go and look at.
 *
 * When a queue item ships it moves to `openSource.ts`, `websites.ts`, or off the site —
 * it does not sit here marked "done".
 */
export interface QueueItem {
  id: string;
  name: string;
  /** One line on what is actually being done. */
  note: string;
  /** Honest state. Keep the vocabulary small so it stays comparable. */
  status: 'In progress' | 'Next up' | 'Ongoing';
}

export const queueItems: QueueItem[] = [
  {
    id: 'design-sweep',
    name: 'Design pass across the sites',
    note: 'A ranked critique backlog exists for each remaining property; they get worked one site at a time rather than in a single sweep.',
    status: 'In progress',
  },
  {
    id: 'data-goblin-fr',
    name: 'Data Goblin — French edition',
    note: 'Keeping the translated edition in step with the English manuscript as chapters change, without the two drifting apart.',
    status: 'In progress',
  },
  {
    id: 'lucid-sheep',
    name: 'Lucid Sheep, in the wild',
    note: 'The idea-exchange protocol is public and running at 1.13; what changes next comes from real usage rather than design.',
    status: 'Ongoing',
  },
];
