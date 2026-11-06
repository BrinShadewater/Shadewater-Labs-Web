/** Continuing maintenance, separate from the dated project-stage overview. */
export interface QueueItem {
  id: string;
  name: string;
  note: string;
  status: 'In progress' | 'Next up' | 'Ongoing';
}

export const queueItems: QueueItem[] = [
  {
    id: 'brinespace-performance',
    name: 'BrineSpace — performance and platform work',
    note: 'Playable Windows and Mac alpha builds are out. Large stations, longer expeditions, and iPad memory headroom remain development work.',
    status: 'In progress',
  },
  {
    id: 'data-goblin-editions',
    name: 'Data Goblin — keeping both editions current',
    note: 'English and French are live. Manuscript changes flow into the reader, with receipts and unresolved verification flags kept visible.',
    status: 'Ongoing',
  },
];
