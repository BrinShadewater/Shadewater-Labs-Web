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
    note: 'Large-station performance, longer expeditions, and Mac and iPad testing for 0.4.0.',
    status: 'In progress',
  },
  {
    id: 'data-goblin-editions',
    name: 'Data Goblin — keeping both editions current',
    note: 'English and French are live. Manuscript changes flow into the reader, with receipts and unresolved verification flags kept visible.',
    status: 'Ongoing',
  },
];
