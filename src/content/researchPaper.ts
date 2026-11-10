import { LABS_ORIGIN } from '../lib/routes';

const title = 'Physiological State and Executive Function in ADHD';
const pdf = '/research/physiological-state-and-executive-function-in-adhd-2026-11-09.pdf';

export const researchPaper = {
  title,
  citationTitle: `${title}: A framework for measuring attention and daily function across interventions`,
  author: 'Alex Yesilcimen',
  date: 'November 9, 2026',
  datePublished: '2026-11-09',
  edition: 'Full integrated research edition',
  pdf,
  url: `${LABS_ORIGIN}${pdf}`,
} as const;
