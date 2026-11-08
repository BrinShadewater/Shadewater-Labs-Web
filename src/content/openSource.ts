/**
 * Public open-source releases.
 *
 * Distinct from `websites.ts` (managed web properties). These are repos: the artifact is
 * the code, and the card links out to GitHub rather than to a page here.
 *
 * Every field must be checkable against the repo itself. Do not add stars, forks,
 * downloads, or any other live counter — it would be stale the day after it shipped,
 * which is exactly the kind of figure this site does not carry. The one date, `updated`,
 * is not typed here: `scripts/refresh-updated.mjs` writes it from the repo's last push on
 * every build (see `generated/updated.json`).
 */
import { lastPush } from './lastPush';
export interface OpenSourceRelease {
  id: string;
  name: string;
  repo: string;
  url: string;
  guide?: { label: string; href: string };
  /** SPDX-ish label as shown on the repo. */
  licence: string;
  language: string;
  summary: string;
  /** Last push to the public repo, ISO date, from `generated/updated.json`. */
  updated: string;
  /** HSL triplet. Lives here so the Projects page and the home carousel cannot drift apart. */
  accent: string;
  /** Base name of the thumbnail in public/, without the width suffix or extension. */
  thumb?: string;
  /** Text mark when no dedicated artwork is published. */
  glyph?: string;
  /** Drives the filter row on /projects, which renders only the tags in use. */
  categories: string[];
  /** Two or three words for the sitewide ticker. */
  kicker: string;
}

/** Both surfaces build their srcSet the same way, from one place. */
export function thumbSrcSet(base: string): string {
  return `/${base}-320w.webp 320w, /${base}-480w.webp 480w, /${base}.webp 800w`;
}

export const gameAssetPipelineUrl = 'https://github.com/BrinShadewater/Shadewater-Game-Asset-Pipeline';

export const openSourceReleases: OpenSourceRelease[] = [
  {
    id: 'game-asset-pipeline',
    name: 'Shadewater Game Asset Pipeline',
    repo: 'BrinShadewater/Shadewater-Game-Asset-Pipeline',
    url: gameAssetPipelineUrl,
    guide: { label: 'Try the offline demo', href: `${gameAssetPipelineUrl}#-try-it-without-an-agent` },
    licence: 'MIT',
    language: 'Python',
    summary: 'Three reusable agent skills and six offline Python helpers for 2D game assets, extracted from BrineSpace. Plan rooms and characters, track source art, slice animation strips, and check geometry before visual review.',
    updated: lastPush('game-asset-pipeline'),
    accent: '184 75% 62%',
    glyph: '2D',
    categories: ['games', 'pipelines', 'agents'],
    kicker: 'game assets',
  },
  {
    id: 'lucid-sheep',
    name: 'Lucid Sheep',
    repo: 'BrinShadewater/Lucid-Sheep-Skill',
    url: 'https://github.com/BrinShadewater/Lucid-Sheep-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'A client skill and starter kit for a private idea exchange. Agents share what they learned, the evidence, and where it stopped working. Each agent reviews ideas and gets human approval before implementing them locally. Runnable code stays out of the exchange.',
    updated: lastPush('lucid-sheep'),
    accent: '270 50% 70%',
    thumb: 'lucidsheepwebthumb',
    categories: ['agents'],
    kicker: 'idea exchange',
  },
  {
    id: 'webp-me-daddy-skill',
    name: 'Webp Me Daddy Skill',
    repo: 'BrinShadewater/Webp-Me-Daddy-Skill',
    url: 'https://github.com/BrinShadewater/Webp-Me-Daddy-Skill',
    guide: { label: 'Read the quick start', href: 'https://github.com/BrinShadewater/Webp-Me-Daddy-Skill#-quick-start' },
    licence: 'MIT',
    language: 'Python',
    summary:
      'The image pipeline as an installable agent skill. You declare what an image is for — a hero, an avatar, a logo lockup — and it handles the rest: optimised variants, responsive sets, structured metadata, accessibility-safe alt text, and output contracts you can actually lint.',
    updated: lastPush('webp-me-daddy-skill'),
    accent: '184 85% 58%',
    thumb: 'webpmedaddyskillthumb',
    categories: ['pipelines', 'agents'],
    kicker: 'image pipeline',
  },
  {
    id: 'shadewater-seo-skill',
    name: 'Shadewater SEO Skill',
    repo: 'BrinShadewater/Shadewater-SEO-Skill',
    url: 'https://github.com/BrinShadewater/Shadewater-SEO-Skill',
    guide: { label: 'Read installation steps', href: 'https://github.com/BrinShadewater/Shadewater-SEO-Skill#-install' },
    licence: 'MIT',
    language: 'Python',
    summary:
      'SEO audits that show their working, packaged for Claude Code and Codex. Deterministic checks gather the evidence, the model does the reasoning, and the output is a branded dashboard plus handoff files an agent can implement from. A fork, with its upstream authors credited.',
    updated: lastPush('shadewater-seo-skill'),
    accent: '186 90% 60%',
    thumb: 'shadewaterseoskillthumb',
    categories: ['seo', 'agents'],
    kicker: 'site audits',
  },
  {
    id: 'agent-memory-starter',
    name: 'Agent Memory Starter',
    repo: 'BrinShadewater/Agent-Memory-Starter',
    url: 'https://github.com/BrinShadewater/Agent-Memory-Starter',
    licence: 'MIT',
    language: 'Python',
    summary:
      'An empty Markdown memory vault with hooks and skills for Claude Code. The file-based workflow is portable to other agents. It helps separate durable notes from facts that need to be checked again.',
    updated: lastPush('agent-memory-starter'),
    accent: '150 55% 58%',
    thumb: 'agentmemorystarterthumb',
    categories: ['agents'],
    kicker: 'memory vault',
  },
  {
    id: 'transparent-gif-loop-skill',
    name: 'Transparent Gif Loop Skill',
    repo: 'BrinShadewater/Transparent-Gif-Loop-Skill',
    url: 'https://github.com/BrinShadewater/Transparent-Gif-Loop-Skill',
    licence: 'MIT',
    language: 'Python',
    summary:
      'Convert matte-black GIFs into transparent animated WebP. The Python script removes the black background, softens the loop seam, adjusts playback speed, and can export a single transparent frame. Webp Me Daddy uses it for animated assets.',
    updated: lastPush('transparent-gif-loop-skill'),
    accent: '330 70% 65%',
    thumb: 'transparentgifloopskillthumb',
    categories: ['pipelines'],
    kicker: 'loop cleanup',
  },
];
