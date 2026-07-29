# Product

<!-- impeccable:product-schema 1 -->

> Provenance: drafted 2026-07-29 from repository evidence (README.md, CLAUDE.md,
> src/content/*) during impeccable rollout. Extracted, not interviewed — items marked
> *(inferred)* await confirmation.

## Platform

web

## Users

Primary: people evaluating Brin Shadewater's web, SEO, image-pipeline, and
creative-technical work — potential clients, collaborators, and the curious arriving
from a shipped project (Strange Harvest, Ink Master Studio, the WebP tooling).

Secondary: Brin herself — the site doubles as an operating surface where project
explainers, SEO snapshots, and proof assets live. *(inferred from README's "both
portfolio and operating surface")*

## Product Purpose

The public home for Shadewater Labs: the umbrella for web and creative-technical work.
Deliberately compact — a lab front door, project pages, explainers, and proof surfaces
for shipped work. The README's framing: "a small lab bench with clean labels, sharp
tools, and a few strange instruments humming in the corner." Success is a visitor
understanding what was actually built and being able to check it.

## Positioning

**"Can I see the receipt?"** is the method and the differentiator. Every claim on the
site is traceable to real work or real data in the repo. A neighbouring agency site
can copy the aesthetic; it cannot copy verifiable provenance.

## Operating Context

- Vite + React + TypeScript + Tailwind, deployed via Vercel.
- `predev` and `prebuild` run `sync:seo-skill` and `sync:explainers` — odd build
  failures usually mean stale synced outputs, not app code.
- Codex shares this repo via worktrees under `~\.config\superpowers\worktrees\` on
  `codex/*` branches, outside the project tree. Run `git worktree list`.
- A deliberately preserved stash and a `preserve/*` branch exist here. Never drop them.

## Capabilities and Constraints

- **The hard rule: nothing on this site may be invented.** A 2026-07-24 audit found the
  site fabricating data about itself — a "LIVE READOUT" HUD, a hardcoded sparkline, frozen
  coordinates pointing at Birmingham UK, a `uptime · 99.97%` footer guarantee, plus an
  invented taxonomy of track codes, sigils, and fake signature hashes. All removed.
  Everything on-page now derives from `src/content/websites.ts` and
  `src/content/projects.ts`. **If a number appears, it comes from repo data.**
- Accessibility is a real requirement, not a checkbox: the homepage cards are the
  primary navigation and were once keyboard-unreachable. Anything clickable that
  navigates must be keyboard-reachable and visibly focusable.
- Never push without explicit approval.

## Brand Commitments

- The **aurora** look — animated mesh gradients, drifting blobs, constellation and
  particle layers — is the kept visual identity. The fake structure that once
  accompanied it is not.
- Space Grotesk, midnight-navy/teal palette, shared with the other Shadewater sites
  (pinned in `.impeccable/config.json`).

## Evidence on Hand

- Real project data in `src/content/projects.ts` and `src/content/websites.ts`.
- Real generated explainers and SEO snapshots, synced at build time.
- Links out to genuinely deployed projects.
- No uptime figures, no telemetry, no client testimonials — and none may be invented.

## Product Principles

1. **Receipts or it doesn't ship.** No figure without a source in the repo.
2. Show the work, then make the system behind it legible.
3. Compact over comprehensive — a front door, not a sprawl.
4. Keyboard-reachable is table stakes; the cards *are* the navigation.
5. Keep the strangeness in the aesthetic, never in the claims.
