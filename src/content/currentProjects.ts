export const brineSpace = {
  id: 'brinespace',
  name: 'BrineSpace',
  summary: 'Draft room cards and keep an underwater colony alive as BRINE, a damaged AI core. Earn Archived Data on expeditions to unlock blueprints, crew, and companions.',
  detail: 'The signed Windows 0.4.0 RC1 preview and notarized Mac 0.3.0 alpha are available on itch.io. Mac and iPad builds for 0.4.0 are in testing.',
  url: 'https://brinshadewater.itch.io/brinespace',
} as const;

/** Public-facing summaries; evidence and limits are recorded in docs/CONTENT-REVIEW-2026-11-06.md. */
export const currentProjects = [
  {
    id: 'futureproof',
    name: 'Futureproof Festival Companion',
    category: 'Festival software',
    status: '2026 festival edition',
    summary: 'The companion for Vancouver’s October 28–30, 2026 Futureproof Festival, with a searchable programme, speaker profiles, and a personal schedule.',
    detail: 'The festival hosts the companion on its own site. The programme is available without an attendee account while the festival keeps it online.',
    link: { label: 'Open festival companion', href: 'https://www.futureproof.website/app/' },
  },
  {
    id: 'fishmail',
    name: 'FishMail',
    category: 'Interactive ocean',
    status: '2026 festival edition',
    summary: 'An interactive aquarium built into the Futureproof Festival Companion. Attendees choose a fish and send private notes that travel across the ocean before arriving in the recipient’s inbox.',
    detail: 'The festival hosts this edition alongside the companion. Sending and receiving FishMail requires a Futureproof attendee sign-in.',
    link: { label: 'Open FishMail', href: 'https://www.futureproof.website/app/fish-mail/' },
  },
  {
    id: 'eink-device',
    name: 'E-ink desk device',
    category: 'Hardware experiments',
    status: 'Hardware prototype',
    summary: 'An ESP32 e-ink device with custom software and a planned 3D-printed enclosure.',
    detail: 'The last documented build included a touchscreen test. The battery connector, enclosure, and battery-powered assembly were still pending.',
  },
] as const;
