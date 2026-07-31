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
  /** HSL triplet. Lives here so the Projects page and the home carousel cannot drift apart. */
  accent: string;
  /** Base name of the thumbnail in public/, without the width suffix or extension. */
  thumb: string;
  /** Drives the filter row on /projects, which renders only the tags in use. */
  categories: string[];
}

/** Both surfaces build their srcSet the same way, from one place. */
export function thumbSrcSet(base: string): string {
  return `/${base}-320w.webp 320w, /${base}-480w.webp 480w, /${base}.webp 800w`;
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
    accent: '270 50% 70%',
    thumb: 'lucidsheepwebthumb',
    categories: ['agents'],
  },
  {
    id: 'webp-me-daddy-skill',
    // Named apart from the product page card of the same tool, which sits on this page too.
    name: 'Webp Me Daddy Skill',
    repo: 'BrinShadewater/Webp-Me-Daddy-Skill',
    url: 'https://github.com/BrinShadewater/Webp-Me-Daddy-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'The image pipeline as an installable agent skill. You declare what an image is for — a hero, an avatar, a logo lockup — and it handles the rest: optimised variants, responsive sets, structured metadata, accessibility-safe alt text, and output contracts you can actually lint.',
    updated: '2026-07-31',
    accent: '184 85% 58%',
    thumb: 'webpmedaddyskillthumb',
    categories: ['pipelines', 'agents'],
  },
  {
    id: 'shadewater-seo-skill',
    name: 'Shadewater SEO Skill',
    repo: 'BrinShadewater/Shadewater-SEO-Skill',
    url: 'https://github.com/BrinShadewater/Shadewater-SEO-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'The audit engine behind the SEO Report, packaged for Claude Code and Codex. Deterministic checks gather the evidence, the model does the reasoning, and the output is a branded dashboard plus handoff files an agent can implement from. A fork, with its upstream authors credited.',
    updated: '2026-07-31',
    accent: '186 90% 60%',
    thumb: 'shadewaterseoskillthumb',
    categories: ['seo', 'agents'],
  },
  {
    id: 'transparent-gif-loop-skill',
    name: 'Transparent Gif Loop Skill',
    repo: 'BrinShadewater/Transparent-Gif-Loop-Skill',
    url: 'https://github.com/BrinShadewater/Transparent-Gif-Loop-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'The small, sharp one: strips matte-black backgrounds, heals the seam where a loop restarts, and retimes animated GIFs and WebPs into clean transparent loops. Webp Me Daddy calls it for animated assets.',
    updated: '2026-07-31',
    accent: '330 70% 65%',
    thumb: 'transparentgifloopskillthumb',
    categories: ['pipelines'],
  },
];
