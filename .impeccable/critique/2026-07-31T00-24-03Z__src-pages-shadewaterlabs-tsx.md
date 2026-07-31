---
target: ShadewaterLabs Web site-wide (home anchor)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-07-31T00-24-03Z
slug: src-pages-shadewaterlabs-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector/browser sub-agent)

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active nav/status pills/HUD good; carousel "● 1/9" cryptic, no visible pause control |
| 2 | Match System / Real World | 3 | Copy honest; "TRANSMISSIONS", "// main" pseudo-sigils need decoding |
| 3 | User Control and Freedom | 2 | Carousel auto-advances 4s, hover-pause only (WCAG 2.2.2 via undiscoverable affordance); new tabs signalled only by ↗ |
| 4 | Consistency and Standards | 1 | Same project, different numbers per page: Webp 88% vs 78%, InkMaster 76% vs 64%, SEO 91% vs 92%; "CLOSED BETA" vs "Public Beta". Fatal on a receipts site |
| 5 | Error Prevention | 3 | noopener everywhere, assets verified; dead sponsor-deck action silently falls back to home |
| 6 | Recognition Rather Than Recall | 3 | Webp CTA cites "the sponsor deck" with no link anywhere on the page; carousel hides 6 of 9 cards |
| 7 | Flexibility and Efficiency | n/a | Persuade surface; linear evaluation path appropriate |
| 8 | Aesthetic and Minimalist Design | 2 | Chrome:content ratio high — ticker+pulses+scanlines+brackets+sigils+badges compete on every card |
| 9 | Error Recovery | 2 | No 404 — unknown paths silently render the homepage |
| 10 | Help and Documentation | n/a | Explainer PDFs + sample report are the docs; they exist and are linked |
| **Total** | | **19/32** | **Acceptable (59%)** |

# Design Specificity Verdict

**Authored, with one hollow spot.** Aurora Drift (mesh blobs, constellation spin, seeded particles, ticker, scanlines) is a real house style with unusual engineering discipline — compositor-only transforms, named reduced-motion kill-list, verified live. But the "receipt" positioning lives in copy, not design language: a derived number (91% from projects.ts) and an invented number (64%, hand-typed) are typographically identical. The design has no vocabulary for provenance — which is precisely how fabricated figures crept back in.

**Deterministic scan: 271 findings (exit 2), all advisory:** design-system-color 270, design-system-radius 1. Concentrated in aurora components: chrome.tsx 113, ProductPage.tsx 78, ShadewaterLabs.tsx 59. The adoption-era "clean apart from the font pin" claim no longer holds — DESIGN.md's scanned palette never captured the aurora system's colour usage; this is sidecar drift, not new slop. Browser overlay fired 66–105/route, dominated by dark-glow/ai-color-palette/wide-tracking on the aurora elements DESIGN.md documents as intentional identity — treat those families as brand-pinned, not defects; the undersized-ui-text and low-contrast hits are real. Tooling note: the live overlay does NOT read .impeccable/config.json ignores (its overused-font hits are false positives; the CLI honours the waiver).

# Priority Issues

- **[P0] Invented metrics are back** — WebpMeDaddy.tsx:27–38 hand-enters "64% avg compression", "37 lint rules", "92% autofix coverage", "v0.9.4"; InkMasterStudio.tsx hand-enters "06 knockout modes / 12 garments"; none derive from content files. Exactly the class the 2026-07-24 audit removed. Fix: every figure moves to projects.ts or a generated snapshot, or is deleted. If the tool can't emit the number, the page can't show it. Command: /impeccable harden
- **[P1] The site contradicts itself numerically** — Projects.tsx:51/65/79 hand-enter 92/78/64 vs projects.ts overallProgress 91/88/76; invented version strings; conflicting status labels ("CLOSED BETA" vs websites.ts "Beta" vs live "Public Beta"). Fix: render one source everywhere. Command: /impeccable harden
- **[P1] SEO Report page broken at mobile** — zero media queries: 551px metric strip clipped inside 311px container (2 metrics invisible at 375w), fixed 60px h1, 129px text columns. Fix: port onto ProductPage or add its breakpoint block. Command: /impeccable adapt
- **[P2] "On the bench" grid bug at every width** — comingItem declares '92px 1fr auto' with two children; label crushed to 92px. Fix: '1fr auto'. Command: /impeccable layout
- **[P2] Carousel interaction debt** — 9 dots at 8×8px (WCAG 2.5.8 fail), pause on hover but not focus, re-key on advance unmounts a focused card, visible CTA is a non-interactive span. Command: /impeccable harden
- **[P3] Broken receipts in data** — websites.ts strangeharvestmerch.url points at strangeharvestmovie.com (the film site, not the store); no 404; dead sponsor-deck action.

# Persona Red Flags

- **Jordan:** the carousel's "Shadewater Labs" card opens the site she's already on in a new tab; "Read the lab log" lands on "The active project catalog".
- **Casey (mobile):** 8×8px dot row untappable; SEO Report hides half its metrics at 375w; nav rows 34–40px.
- **Sam (SR/keyboard):** hard rule (b) HOLDS (27/27 native elements, live-verified focus outline) — residual: no carousel role/announcements, "● 1/9" reads as symbol noise, focus destroyed by 4s re-key when motion unreduced.
- **Producer who saw Strange Harvest's site:** bounced straight out to the film site; no case study of what Labs did; merch card goes to the wrong URL; and if convinced — no contact path exists on the entire domain.

# Verification of the two hard rules

(a) Nothing invented: **VIOLATED in three locations** (P0/P1 above). Compliant: homepage HUD, SEO Report (fully derived incl. sync date), Websites page, Tech News.
(b) Keyboard-reachable + visibly focusable: **HOLDS** (verified live by real keypress).

# Minor Observations

- "// revi" 4-char slices and ".lab" stamps style decoration as data — aesthetic descendants of the removed sigil taxonomy.
- Tech News: top-level nav slot for three undated placeholders.
- ProjectStatus.author types four authors; three appear nowhere.
- Duplicate THUMBS/ACCENTS maps in two pages will drift.
- Inactive dots fail 3:1 non-text contrast.
- <title> pitch ("AI Tools, Coding Projects & Tech Experiments") vs H1 pitch ("weird-good") unaligned.
- Footer "est. 2024" is hand-entered.

# Questions to Consider

1. If the tooling can't print the number, should the page be allowed to? (Make MetricItem only accept values from content modules.)
2. The receipts are real but invisible — one click on "91%" could reveal "computed from projects.ts · synced 2026-05-19". Provenance as a visible UI primitive would BE the differentiator.
3. Is the front door supposed to open? No contact path exists for a convinced client — deliberate moat or the last missing receipt?
