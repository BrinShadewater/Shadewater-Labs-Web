export const brineSpace = {
  id: 'brinespace',
  name: 'BrineSpace',
  summary: 'Draft rooms and rebuild an underwater station as BRINE, a damaged AI core. Carry discoveries into the next expedition.',
  detail: 'The Windows 0.4.0 RC1 preview and Mac 0.3.0 alpha are available on itch.io. Mac and iPad builds for 0.4.0 are in testing.',
  url: 'https://brinshadewater.itch.io/brinespace',
} as const;

/** Public-facing summaries; evidence and limits are recorded in docs/CONTENT-REVIEW-2026-11-06.md. */
export const currentProjects = [
  {
    id: 'futureproof',
    name: 'Futureproof companion',
    category: 'Festival software',
    status: 'Integration handoff',
    summary: 'A festival companion with a programme, saved sessions, speaker information, and an interactive ocean with FishMail.',
    detail: 'The latest recorded milestone is the October source handoff and account-integration work. Public activation has not been confirmed here.',
  },
  {
    id: 'eink-device',
    name: 'E-ink desk device',
    category: 'Hardware experiments',
    status: 'Hardware prototype',
    summary: 'An ESP32 e-ink device with custom software and a planned 3D-printed enclosure.',
    detail: 'The touchscreen has been tested. Battery connector compatibility remains unresolved in the latest build notes; the wireless assembly is not complete.',
  },
] as const;
