// Standing topics this section will cover, not published entries. They deliberately
// carry no date and no link: dating a placeholder makes the page look abandoned, and
// a card that links nowhere is a broken promise. Add `date` + `href` when a real
// transmission ships, and the page will render it as an entry.
export interface TechNewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  /** Present only once a real entry ships; absent items render as "planned". */
  date?: string;
  source?: string;
  href?: string;
  tags?: string[];
}

export const techNewsItems: TechNewsItem[] = [
  {
    id: 'ai-tooling-watchlist',
    title: 'AI Tooling Watchlist',
    category: 'AI Tools',
    summary:
      'A standing space for tracking AI coding tools, agent workflows, model updates, and creative automation ideas worth testing inside Labs projects.',
  },
  {
    id: 'creative-tech-signals',
    title: 'Creative Tech Signals',
    category: 'Creative Technology',
    summary:
      'Notes on emerging workflows where AI, web tools, image pipelines, video systems, and creator operations start to overlap in practical ways.',
  },
  {
    id: 'product-experiment-log',
    title: 'Product Experiment Log',
    category: 'Product Experiments',
    summary:
      'A curated log for experiments that might turn into products, utilities, internal operators, or future public writeups.',
  },
];
