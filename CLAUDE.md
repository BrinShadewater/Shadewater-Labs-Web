# Claude Context: ShadewaterLabs Web

The project home note is the source of truth for state and history:
`Memory\ShadewaterMemoryVault\50_Projects\Websites\ShadewaterLabs-Web.md`. Read it before
starting; it carries the current status, the open items, and the reasoning behind recent
structural changes.

Generic rails (no secrets, no overwriting dirty work, no pushing without approval, vault
read order) come from `Projects\CLAUDE.md` one level up and are not repeated here.

Repo: `github.com/BrinShadewater/Shadewater-Labs-Web`. Stack: Vite + React + TypeScript +
Tailwind, deployed via Vercel.

## The lesson this site was rebuilt around

A 2026-07-24 audit found the site was **fabricating data about itself**: a "LIVE READOUT"
HUD, a sparkline that was a hardcoded rising array, frozen coordinates pointing at
Birmingham UK, and a `uptime · 99.97%` guarantee in the footer. None of it was real.

That directly contradicts the site's own "can I see the receipt?" method and the
`seo-content-policy` rule against inventing results or guarantees. Everything on-page is now
derived from `src/content/websites.ts` and `src/content/projects.ts` so it is true and
self-updating.

**Do not reintroduce invented figures, fake telemetry, placeholder metrics, or
authority-signalling detail that has no source.** If a number appears on this site, it must
come from data in the repo. This is the site's whole thesis; breaking it here is worse than
breaking it elsewhere.

The same pass stripped an invented taxonomy (track codes, sigils, non-sequential section
numbering, fake signature hashes). Keep the aurora look; do not rebuild the fake structure.

## The Labs showcase lives here

`src/pages/ShadewaterLabs.tsx`, `src/pages/InkMasterStudio.tsx`, and
`src/content/projects.ts`.

**The Shadewater SEO Report and Webp Me Daddy product pages were retired 2026-07-31**, once
both tools were open-sourced and their repo cards landed on `/projects`. A marketing page for
a tool whose repo is public and documented is a second thing to keep in sync, so it went.
Their routes 301 to `/projects` in `vercel.json` — they were in the sitemap and indexed, and
this site has no 404 route, so without the redirect they would have silently served the
homepage as a soft-404. **If you add a route, add it to `public/sitemap.xml`; if you remove
one, redirect it.**

Open-source releases are content, not pages: `src/content/openSource.ts` carries the repo,
licence, language, accent and thumbnail, and both `/projects` and the home carousel render
from it. Adding a release is one entry plus a thumbnail set in `public/`.

An earlier April draft of this feature exists in the retired `Claude\` workspace and is
**superseded**. It had a shared `LabsProjectPage` component that was deliberately refactored
away when the thin wrapper pages became full pages. Do not restore it or treat that copy as
newer. A copy is archived under `_Cleanup_Archive\20260725-rescue\` purely as history.

## Structural trap that already bit once

`AURORA_ROUTES` was a superset of every route `parseLocation` could return, so
`useAuroraChrome` was **always** true and Navbar, Footer and BackgroundParticles could never
render. Roughly 1,200 lines were unreachable, including an entire second particle engine and
five npm dependencies only reachable from dead code.

When a route-gated flag drives whether whole components mount, verify the gate can actually
be false before building on it.

## Accessibility is a real requirement here

The homepage cards are the site's primary navigation and were keyboard-unreachable
(`<article onClick>`). Filter pills were focusable but invisible. Both fixed. Anything
clickable that navigates must be reachable and visible by keyboard.

## Codex shares this repo

Four Codex worktrees live under `~\.config\superpowers\worktrees\ShadewaterLabs-Web\`, on
`codex/*` branches. They are outside the project tree, so a directory scan will not show
them. Run `git worktree list` before assuming the repo state is just what you can see, and
check `git remote -v` rather than inferring from upstream tracking.

## Build notes

**There is no longer a `predev`/`prebuild` step.** Those ran `sync:seo-skill` and
`sync:explainers`, which existed solely to feed the two retired product pages — the explainer
generator regenerated its PDFs into `public/` on every build, so retiring the pages meant
retiring the pipeline or the deleted assets would have come straight back. `npm run dev` and
`npm run build` are now exactly what they say. Committing and pushing is Alex's call.
