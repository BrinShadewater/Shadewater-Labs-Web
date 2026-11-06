# Content review — November 6, 2026

The content review started at `2048931`. The update was verified on top of `4832cf8`.

## Evidence and decisions

- BrineSpace: current public README describes Windows v0.3.0 Manta Ray and Mac alpha on itch.io; iPad is testing only. It is source-available/all rights reserved, so it stays outside the MIT release collection. Keep performance limitations visible. https://github.com/BrinShadewater/BrineSpace
- Game Asset Pipeline: published MIT toolkit, Python helpers and reusable game asset skills. Added to release data and date refresh map. GitHub pushed_at was 2026-09-08T00:08:48Z, September 7 in Vancouver. https://github.com/BrinShadewater/Shadewater-Game-Asset-Pipeline
- Data Goblin: README confirms both languages live. Remove fixed chapter count and blanket promise of evidence behind every claim; the reader deliberately exposes open verification flags. https://github.com/BrinShadewater/Data-Goblin-Web
- InkMaster: README confirms shipped canvas-first editor, local projects and Printify exports. Replace old underbase-suite copy and mark Live; do not advertise unreachable older production-suite modules. https://github.com/BrinShadewater/Ink-Master-Studio-Web
- GIST: October conversation and concept artwork establish the rename from Babel Chat and design/prototype work, not shipping integrations.
- ESP32 e-ink: latest recorded user build work establishes touchscreen tested, battery connector unresolved. No claim of completed wireless hardware.
- Futureproof: local October 26 source-transfer and October 27 session-privacy handoffs establish delivered integration work, explicitly no activation. Current upstream PR state was unavailable. Label the recorded milestone and uncertainty; do not expose private PRs, attendee data, or retired /Testing links.
- Toolkit: include Codex and Godot based on actual project work. Vercel wording no longer implies Shopify runs there.
- Home label now says latest repo activity: push time is not release time.

## Implementation

Preserved aurora styling, routes, redirects, and service-worker retirement. New status cards share one content source between home and projects. Metadata and crawler summaries reflect the same project stages. No launch promises, completion percentages, personal health projects, private operational details, or client-production ownership claims added.

## Validation

TypeScript, ESLint, the Vite production build, and all 17 tests passed. The home and Projects pages rendered all four status cards in a fresh browser session. The Projects layout was visually reviewed at 1440px and 390px.
