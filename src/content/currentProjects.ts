const brineSpacePreview = '0.4.0 RC1';

export const brineSpace = {
  id: 'brinespace',
  name: 'BrineSpace',
  summary: 'Draft room cards and keep an underwater colony alive as BRINE, a damaged AI core. Earn Archived Data on expeditions to unlock blueprints, crew, and companions.',
  previewVersion: brineSpacePreview,
  detail: `Version ${brineSpacePreview} is available on itch.io for Windows and macOS. Both builds are signed, and the macOS build is notarized. The iPad build is in testing.`,
  url: 'https://brinshadewater.itch.io/brinespace',
  image: {
    src: '/brinespace-windows-preview.webp',
    srcSet: '/brinespace-windows-preview-320w.webp 320w, /brinespace-windows-preview-480w.webp 480w, /brinespace-windows-preview-640w.webp 640w, /brinespace-windows-preview.webp 800w',
    alt: 'Four connected rooms in BrineSpace, viewed from above.',
  },
} as const;

export const brineSpaceAssetCase = {
  page: 'brinespace-asset-case',
  title: 'How BrineSpace assets are made',
  description: 'Follow the Desalination Unit from its original wall art through four rotation checks to the finished room in BrineSpace.',
  image: {
    src: '/brinespace-desalination-in-game.webp',
    alt: 'The finished Desalination Unit selected in a BrineSpace station, with its inspector open.',
    width: 1200,
    height: 676,
  },
} as const;

export const fishMail = {
  id: 'fishmail',
  name: 'FishMail',
  category: 'Interactive ocean',
  status: 'Playable demo',
  summary: 'At Futureproof Festival, attendees chose a fish to carry private notes across a shared aquarium.',
  detail: 'In the Labs demo, choose a nickname and a fish, then send a note to another swimmer.',
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
  detail: 'Visit Futureproof for the 2026 programme and event photos, plus updates on the next festival.',
  image: { src: '/futureproof-companion-dark.webp', alt: 'The Festival Companion programme in dark mode, with day tabs, search, and the My Plan sidebar.' },
  link: { label: 'Visit Futureproof', href: 'https://www.futureproof.website/' },
} as const;

export const futureproofCase = {
  page: 'futureproof',
  title: 'Futureproof Festival Companion & FishMail',
  description: 'See how festival attendees planned their day and sent notes through a shared aquarium.',
  image: { ...futureproofCompanion.image, width: 960, height: 540 },
} as const;

/** Public-facing summaries; evidence and limits are recorded in docs/CONTENT-REVIEW-2026-11-06.md. */
export const currentProjects = [
  futureproofCompanion,
  {
    id: 'eink-device',
    name: 'E-ink desk device',
    category: 'Hardware experiments',
    status: 'Hardware prototype',
    summary: 'An ESP32 e-ink device with custom software and a planned 3D-printed enclosure.',
    detail: 'The last documented build included a touchscreen test. The battery connector, enclosure, and battery-powered assembly were still pending.',
  },
] as const;
