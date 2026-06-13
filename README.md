# Shadewater Labs Web

Standalone Vite/React site for [shadewaterlabs.com](https://shadewaterlabs.com/).

Shadewater Labs is the public home for Brin Shadewater's web, SEO, image-pipeline, and creative-technical projects. The site is intentionally compact: a polished lab front door, project pages, explainers, and proof surfaces for shipped work.

This repo is both portfolio and operating surface. It should show the work clearly, but it should also make the underlying systems legible: generated explainers, SEO snapshots, image processing, project writeups, and links out to deployed projects.

## What This Site Does

- Presents Shadewater Labs as the umbrella for web and creative-technical work.
- Collects project pages for Strange Harvest, Ink Master Studio, WebP tooling, and SEO/reporting work.
- Publishes explainers and proof assets alongside visual project cards.
- Ships a lightweight tech-news surface.
- Keeps robots, sitemap, and LLM-readable files aligned with the public site.

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- Radix primitives
- Lucide icons

## Repository Status

Active portfolio/lab site. Changes should keep both presentation and proof-of-work quality in mind.

## Local Development

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

## Routes

- `/`
- `/projects`
- `/websites`
- `/tech-news`
- `/shadewater-seo-report`
- `/webp-me-daddy`
- `/inkmaster-studio`

## Automation

The app syncs generated project material before development and production builds:

```shell
npm run sync:seo-skill
npm run sync:explainers
```

Those scripts keep the SEO skill snapshot and explainer PDFs aligned with the public site.

## Project Map

```text
src/pages/       Route-level pages
src/components/  Shared UI and product-page surfaces
src/content/     Project and article data
src/lib/         Routes, SEO helpers, assets, theme utilities
scripts/         Content sync, PDF generation, and verification scripts
public/          Images, PDFs, robots, sitemap, and static proofs
```

## Key Surfaces

- `src/content/projects.ts` and `src/content/websites.ts` shape project listings.
- `src/pages/ShadewaterLabs.tsx` is the primary landing page.
- `src/pages/WebpMeDaddy.tsx`, `src/pages/InkMasterStudio.tsx`, and `src/pages/ShadewaterSeoReport.tsx` are proof/product pages.
- `src/lib/seo.ts` and `src/lib/routes.ts` define discoverability and routing.
- `scripts/sync-project-explainers.mjs` and `scripts/sync-seo-skill-snapshot.mjs` regenerate important public assets.

## Documentation

- `docs/PROJECT-BRIEF.md`
- `docs/MAINTENANCE.md`
- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CHANGELOG.md`

## Working Style

Keep the site crisp, direct, and useful. It should feel like a working lab with receipts: strong visuals, clear project context, and enough technical detail to trust the work.

## Review Checklist

- Run `npm run lint`.
- Run `npm run build`.
- Confirm generated explainers/snapshots are intentionally changed before committing them.
- Review changed pages on desktop and mobile.
- Keep project descriptions specific: what it is, who it is for, and what proof exists.
