# Shadewater Labs Web ⚗️

![Licence](https://img.shields.io/badge/licence-all%20rights%20reserved-lightgrey?style=flat-square) ![Live](https://img.shields.io/badge/live-shadewaterlabs.com-brightgreen?style=flat-square) ![Shadewater Labs](https://img.shields.io/badge/Shadewater%20Labs-%E2%9A%97%EF%B8%8F-6b4fa2?style=flat-square)

Standalone Vite/React site for [shadewaterlabs.com](https://shadewaterlabs.com/).

Shadewater Labs is the public home for Brin Shadewater's AI tooling, managed web properties, and creative-technical projects. The site is intentionally compact: a lab front door, the open-source releases, the managed sites, the toolkit actually used on real work, and an about page.

This repo is both portfolio and operating surface: a small lab bench with clean labels, sharp tools, and a few strange instruments humming in the corner. Every claim on it should be checkable against the repo it points at — no star counts, no download figures, nothing that is stale the day after it ships.

## ✨ What This Site Does

- Presents Shadewater Labs as the umbrella for AI tooling, web, and creative-technical work.
- Lists the **open-source releases** — the skills and kits published under this account — with a filter row driven by the categories in use, plus a queue of what the lab is actually working on right now.
- Lists the **managed websites**: Brin Shadewater, Data Goblin, InkMaster Studio, Strange Harvest, and the merch store.
- Publishes the **toolkit**: third-party tools that survived contact with a deadline, with what each is used *for* and its honest caveat.
- Keeps robots, sitemap, and a pre-render shell aligned with the public site so the pages read correctly to crawlers that do not execute JavaScript.

## 🧰 Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- Radix primitives
- Lucide icons
- Vercel deployment

## 🚦 Repository Status

Active portfolio/lab site. Changes should keep both presentation and proof-of-work quality in mind. An earlier version of this README described product pages for the SEO report, WebP tooling, InkMaster, and a tech-news surface — those routes are gone, and `vercel.json` permanently redirects their old URLs to `/projects`, `/websites`, and `/toolkit`.

## ⚙️ Local Development

```shell
npm ci
npm run dev
```

Production build:

```shell
npm run build
```

Preview a built site:

```shell
npm run preview
```

Lint and test:

```shell
npm run lint
npm test
```

`npm test` rebuilds first, because the one test reads `dist/`.

## 🧭 Routes

- `/` — the landing page
- `/projects` — open-source releases and the current queue
- `/websites` — managed web properties
- `/toolkit` — third-party tools used here
- `/about`

Anything else is a real 404, not a silent fallback to the homepage.

## 🗺️ Project Map

```text
src/pages/       ShadewaterLabs (home), Projects, Websites, Toolkit, About, NotFound
src/components/  Seo, and the aurora chrome shared across pages
src/content/     openSource.ts, queue.ts, websites.ts, tools.ts — the data every page renders
src/lib/         routes.ts, seo.ts, brandAssets.ts
tests/           prerender-shell.test.mjs
scripts/         Image matte cleanup and a WebP page-polish verifier
public/          Images, robots, sitemap, and static assets
```

## 🔦 Key Surfaces

- `src/content/openSource.ts` — the public releases. Every field must be checkable against the repo it names.
- `src/content/queue.ts` — what the lab is working on. No ship dates; when an item ships it moves out, it does not sit here marked done.
- `src/content/websites.ts` and `src/content/tools.ts` — the managed sites and the toolkit.
- `src/pages/ShadewaterLabs.tsx` — the primary landing page.
- `src/lib/seo.ts` and `src/lib/routes.ts` — discoverability and routing.
- `index.html` — carries the pre-render shell (`.seo-shell`) that non-JS crawlers read.

## 🛡️ The Pre-render Shell

`tests/prerender-shell.test.mjs` guards the visible text inside `index.html`. GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript; Googlebot does. Without the shell the site goes invisible to AI crawlers while Search Console and every visual check stay green. This repo is the one the fix pattern was copied *from* — the test is insurance, not a repair. It asserts against `dist/`, so a build step that strips the markup fails too.

## 📚 Documentation

- `docs/PROJECT-BRIEF.md`
- `docs/MAINTENANCE.md`
- `PRODUCT.md` and `DESIGN.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CHANGELOG.md`

## 🧪 Working Style

Keep the site crisp, direct, and useful. It should feel like a working lab with receipts: strong visuals, clear project context, and enough technical detail to trust the work. Say what a tool is used for, not what its marketing says it does.

## ✅ Review Checklist

- Run `npm run lint`.
- Run `npm test` (which builds, then checks the pre-render shell).
- Review changed pages on desktop and mobile.
- Keep project descriptions specific: what it is, who it is for, and what proof exists.
- CI runs lint, build, and test on every pull request and every push to `main`.

---

## 📄 Licence

All rights reserved. This repository is public so the work can be read and referenced, not relicensed. The code, copy, and creative assets remain © Brin Shadewater / Shadewater Labs. If you want to use something here, ask.
