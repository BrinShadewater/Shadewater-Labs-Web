# Codex Context: ShadewaterLabs Web

**Read `CLAUDE.md` in this folder before touching anything here.** Despite the filename it is
agent-neutral and is the full guide for this repo — architecture, the traps, and the
prohibitions. It is not duplicated here on purpose: two copies drift, and a stale copy of a
prohibition is worse than a pointer to a live one.

The three things that matter most, repeated here only so they land even if you read nothing
else:

- **Never reintroduce invented figures, fake telemetry, placeholder metrics, or
  authority-signalling detail with no source.** A 2026-07-24 audit found this site fabricating
  data about itself — a fake "LIVE READOUT" HUD, a hardcoded sparkline, coordinates pointing at
  Birmingham UK, a `99.97%` uptime guarantee. If a number appears on this site it must come
  from `src/content/websites.ts` or `src/content/projects.ts`. The site's whole thesis is "can
  I see the receipt?"; breaking it here is worse than breaking it elsewhere.
- **Anything clickable that navigates must be keyboard-reachable and visibly focusable.**
  The homepage cards are primary navigation and were `<article onClick>`.
- **Run `git worktree list` before assuming repo state.** Codex worktrees for this repo live
  under `~\.config\superpowers\worktrees\ShadewaterLabs-Web\` on `codex/*` branches, outside
  the project tree, so a directory scan will not show them. Check `git remote -v` rather than
  inferring from upstream tracking.

Generic rails — no secrets, no overwriting dirty work, no pushing without approval, vault read
order — come from `Projects\AGENTS.md` one level up.

Project home note, and the source of truth for state and history:
`Memory\ShadewaterMemoryVault\50_Projects\Websites\ShadewaterLabs-Web.md`.
