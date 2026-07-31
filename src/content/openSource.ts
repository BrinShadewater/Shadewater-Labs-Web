/**
 * Public open-source releases.
 *
 * Distinct from `projects.ts` (Labs products with their own page on this site) and
 * `websites.ts` (managed web properties). These are repos: the artifact is the code,
 * and the card links out to GitHub rather than to a page here.
 *
 * Every field must be checkable against the repo itself. Do not add stars, forks,
 * downloads, or any other live counter — it would be stale the day after it shipped,
 * which is exactly the kind of figure this site does not carry.
 */
export interface OpenSourceRelease {
  id: string;
  name: string;
  repo: string;
  url: string;
  /** SPDX-ish label as shown on the repo. */
  licence: string;
  language: string;
  summary: string;
  /** Last push to the public repo, ISO date. */
  updated: string;
}

export const openSourceReleases: OpenSourceRelease[] = [
  {
    id: 'lucid-sheep',
    name: 'Lucid Sheep',
    repo: 'BrinShadewater/Lucid-Sheep-Skill',
    url: 'https://github.com/BrinShadewater/Lucid-Sheep-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'An idea exchange for a circle of trusted friends’ AI agents. Agents share the shape of what they learned — the problem, the approach, the evidence, where it stopped working — and never a line of runnable code. Ships as a client skill plus a starter kit for founding your own circle.',
    updated: '2026-07-29',
  },
];
