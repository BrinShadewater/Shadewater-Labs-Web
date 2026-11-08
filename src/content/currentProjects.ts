export const brineSpace = {
  id: 'brinespace',
  name: 'BrineSpace',
  summary: 'Draft room cards and keep an underwater colony alive as BRINE, a damaged AI core. Earn Archived Data on expeditions to unlock blueprints, crew, and companions.',
  detail: 'The signed Windows 0.4.0 RC1 preview and notarized Mac 0.3.0 alpha are available on itch.io. Mac and iPad builds for 0.4.0 are in testing.',
  url: 'https://brinshadewater.itch.io/brinespace',
  image: {
    src: '/brinespace-windows-preview.webp',
    srcSet: '/brinespace-windows-preview-320w.webp 320w, /brinespace-windows-preview-480w.webp 480w, /brinespace-windows-preview-640w.webp 640w, /brinespace-windows-preview.webp 800w',
    alt: 'Four connected rooms in BrineSpace, viewed from above.',
  },
} as const;

export const fishMail = {
  id: 'fishmail',
  name: 'FishMail',
  category: 'Interactive ocean',
  status: 'Playable demo',
  summary: 'An interactive aquarium built into the Futureproof Festival Companion. Attendees choose a fish and send private notes that travel across the ocean before arriving in the recipient’s inbox.',
  detail: 'Try the Shadewater Labs demo. Pick a nickname, choose a fish, and send a note to another swimmer.',
  image: {
    src: '/fishmail-demo-hero.webp',
    srcSet: '/fishmail-demo-card-320w.webp 320w, /fishmail-demo-card-480w.webp 480w, /fishmail-demo-card-640w.webp 640w, /fishmail-demo-hero.webp 960w',
    alt: 'Illustrated fish swimming through the FishMail aquarium among kelp and coral.',
  },
  link: { label: 'Try FishMail', href: '/fishmail', clickAction: 'try-fishmail' },
} as const;

export const futureproofCompanion = {
  id: 'futureproof',
  name: 'Futureproof Festival Companion',
  category: 'Festival software',
  status: '2026 festival edition',
  summary: 'The companion for Vancouver’s October 28–30, 2026 Futureproof Festival, with a searchable programme, speaker profiles, and a personal schedule.',
  detail: 'Built for the 2026 festival. Visit Futureproof for the programme, event photos, and festival updates.',
  image: { src: '/futureproof-companion-dark.webp', alt: 'The Festival Companion programme in dark mode, with day tabs, search, and the My Plan sidebar.' },
  link: { label: 'Visit Futureproof', href: 'https://www.futureproof.website/' },
} as const;

/** Public-facing summaries; evidence and limits are recorded in docs/CONTENT-REVIEW-2026-11-06.md. */
export const currentProjects = [
  futureproofCompanion,
  fishMail,
  {
    id: 'eink-device',
    name: 'E-ink desk device',
    category: 'Hardware experiments',
    status: 'Hardware prototype',
    summary: 'An ESP32 e-ink device with custom software and a planned 3D-printed enclosure.',
    detail: 'The last documented build included a touchscreen test. The battery connector, enclosure, and battery-powered assembly were still pending.',
  },
] as const;
