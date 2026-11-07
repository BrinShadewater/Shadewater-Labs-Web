export const BRINESPACE_PLAY_URL = 'https://brinshadewater.itch.io/brinespace';

/** Public-facing summaries; evidence and limits are recorded in docs/CONTENT-REVIEW-2026-11-06.md. */
export const currentProjects = [
  {
    id: 'brinespace',
    name: 'BrineSpace',
    category: 'Game development',
    status: 'Playable alpha',
    summary: 'An underwater station-restoration roguelite. Play BRINE, a damaged AI core rebuilding through room drafting, resource management, and discoveries that carry between expeditions.',
    detail: 'The Windows 0.4.0 RC1 preview and Mac 0.3.0 alpha are available on itch.io. Mac and iPad builds for 0.4.0 are in testing.',
    url: BRINESPACE_PLAY_URL,
    linkLabel: 'Play on itch.io',
  },
  {
    id: 'futureproof',
    name: 'Futureproof companion',
    category: 'Festival software',
    status: 'Integration handoff',
    summary: 'A festival companion with a programme, saved sessions, speaker information, and an interactive ocean with FishMail.',
    detail: 'The latest recorded milestone is the October source handoff and account-integration work. Public activation has not been confirmed here.',
    url: undefined,
    linkLabel: undefined,
  },
  {
    id: 'gist',
    name: 'GIST',
    category: 'Communication tools',
    status: 'Concept prototype',
    summary: 'A context and translation companion for conversations across languages: helping people follow what was said, what was meant, and where they can join in.',
    detail: 'Formerly Babel Chat. The current work covers the product concept, identity, and interface mockups. Meeting, CLI, and chat integrations are proposed, not released features.',
    url: undefined,
    linkLabel: undefined,
  },
  {
    id: 'eink-device',
    name: 'E-ink desk device',
    category: 'Hardware experiments',
    status: 'Hardware prototype',
    summary: 'An ESP32 e-ink device with custom software and a planned 3D-printed enclosure.',
    detail: 'The touchscreen has been tested. Battery connector compatibility remains unresolved in the latest build notes; the wireless assembly is not complete.',
    url: undefined,
    linkLabel: undefined,
  },
] as const;
