# Changelog

Notable changes to Shadewater Labs Web are tracked here.

## Unreleased

- Expanded repository documentation.
- Added contribution, security, issue, and pull request guidance.
- Added project brief and maintenance documentation for portfolio/lab operations.
- Added more expressive README headings and voice while keeping the documentation professional.

## 2026-09-05

- The "Last updated" dates on the home HUD and the project cards come from each repo's last push, fetched at build time. They had been typed by hand and had drifted by up to five months.
- Hero copy stopped promising per-project pages and progress notes that no longer exist. Stale comments in the content files cleaned up with it.
- README lists all seven managed sites.

## 2026-09-04

- JetBrains Mono is self-hosted like the other two fonts, so the CSP stops blocking it.
- Trailing-slash URLs 308 to the clean version instead of serving a duplicate page.
- The five pages share one JSON-LD graph instead of stacking separate blocks.
- Cleared the last /tech-news leftovers. The old URL still redirects to /toolkit.

## 2026-09-02

- README describes the site that exists. The product pages it used to mention are gone and their URLs redirect.

## 2026-08-15

- A test fails the build if the pre-render shell in index.html goes missing. AI crawlers do not run JavaScript and nothing else would have noticed.

## 2026-08-02

- Explicit all-rights-reserved LICENSE and status badges.
