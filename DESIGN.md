---
name: Shadewater Labs Web
description: Lab front door — midnight navy and teal, aurora drift, magenta and sandstone accents
colors:
  midnight-navy: "hsl(210 66% 7%)"
  teal-frame: "hsl(192 49% 14%)"
  teal-frame-2: "hsl(192 29% 21%)"
  card-green: "hsl(150 25% 12%)"
  warm-white: "hsl(45 20% 95%)"
  warm-white-muted: "hsl(45 15% 65%)"
  magenta-accent: "hsl(320 80% 65%)"
  forest-secondary: "hsl(150 24% 34%)"
  sandstone: "hsl(34 26% 48%)"
  focus-cyan: "hsl(186 80% 65%)"
typography:
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 600
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 400
rounded:
  md: "0.75rem"
---

# Shadewater Labs Web — Design System

> Recorded 2026-07-29 in scan mode from `src/index.css`, `tailwind.config.js`, and
> components, during impeccable rollout. Tokens extracted from shipped code. The
> Creative North Star is **provisional (inferred)** — confirm or rename it.

## Overview

**Creative North Star (provisional): The Lab Bench at Night.** The README's own image —
"a small lab bench with clean labels, sharp tools, and a few strange instruments humming
in the corner." Midnight navy room, aurora drifting in the windows, everything on the
bench labelled and verifiable. The strangeness lives in the light, never in the labels.

Shares the token system with [BrinShadewater Web](../BrinShadewater%20Web/DESIGN.md) —
same midnight-navy/teal world, same Space Grotesk. This is the more instrument-like
sibling; Brin's site is the warmer one.

## Colors

HSL triplets in `src/index.css`, mapped onto shadcn token names, consumed via
`hsl(var(--token))` and Tailwind. Single dark theme.

- **Midnight navy** (`--bg`) grounds everything, with a subtle top-down body gradient.
- **Teal frames** (`--frame`, `--frame-2`) for borders, elevated surfaces, primary.
- **Warm off-white** text (45-hue) — never pure white, muted variant for secondary.
- **Magenta** (`--accent-primary`) is the signal colour; **sandstone** the warm accent.
- **Focus cyan** `hsl(186 80% 65%)` is the focus-visible outline — deliberately bright.
  Focus visibility is a hard requirement here (see below); don't tone it down.

## Typography

**Space Grotesk** throughout, body and headings — a pinned brand face, waived from the
detector's `overused-font` rule by explicit decision in `.impeccable/config.json`.

## Layout

Vite + React with Tailwind utilities doing most layout work; `src/index.css` is small
(119 lines) and holds tokens, base element styling, focus rings, and the aurora
keyframes only. Put new layout in components, not here.

## Elevation & Depth

Depth comes from the token layering (navy → teal frame → card green) rather than a
shadow vocabulary. The aurora layers sit behind content and must never compete with it
for legibility.

## Motion

The **Aurora Drift** system in `src/index.css`: `adTicker`, `adDrift1/2/3`, `adRotate`,
`adPulse` — animated mesh blobs, a ticker lane, a constellation spin, particles. All
transform/opacity based, so they stay on the compositor. Keep it that way.

Every aurora class is disabled under `prefers-reduced-motion: reduce` via a single
`animation: none !important` block. **Any new animated class must be added to that
list** — the block names classes explicitly, so a new one silently escapes it.

Interactive transitions: 200ms ease on colour, background, border, transform, shadow,
opacity for links and buttons.

## Components

Cards on the homepage are the **primary navigation**. They must be real interactive
elements — keyboard-reachable with a visible focus ring. An earlier version used
`<article onClick>` and was entirely keyboard-unreachable; filter pills were focusable
but invisible. Both are fixed and must stay fixed.

## Do's and Don'ts

- **Do** derive every displayed number from `src/content/*.ts`. This site's thesis is
  "can I see the receipt?" — see PRODUCT.md.
- **Do** keep the aurora aesthetic; it is the identity.
- **Do** add any new animated class to the `prefers-reduced-motion` block.
- **Do** verify a route-gated flag can actually be false before building on it — a
  superset `AURORA_ROUTES` once made ~1,200 lines unreachable.
- **Don't** reintroduce invented telemetry, HUDs, sparklines, uptime figures, fake
  coordinates, sigils, track codes, or signature hashes. This is the one rule whose
  breach matters more here than anywhere else in the family.
- **Don't** ship anything clickable-that-navigates without keyboard reach and a
  visible focus state.
