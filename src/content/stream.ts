export interface StreamScheduleItem {
  day: string;
  time: string;
  category: string;
  description: string;
}

export interface SetupSection {
  title: string;
  items: Array<{
    name: string;
    details: string[];
  }>;
}

export const streamSchedule: StreamScheduleItem[] = [
  {
    day: 'Thursday',
    time: '7:00 PM PST - Late',
    category: 'Backlog & Chat',
    description: 'Chat Catch-up, Life Updates, Trailer Reacts and long-plays of my current hyperfixations',
  },
  {
    day: 'Friday',
    time: '7:00 PM PST - Late',
    category: 'Shadewater Labs',
    description: 'Tech & Science News & Headlines followed by select gaming obsessions',
  },
  {
    day: 'Sunday',
    time: '6:00 PM PST',
    category: 'Shadewater Sundaze',
    description: 'Oscar Watchparty & Indie Game Showcase.',
  },
];

export const streamAbout = {
  heading: 'A weekly rhythm built for hanging out',
  paragraphs: [
    'Variety gaming with a love for indie games, survival crafting, factory builders, and strategy titles. I enjoy discovering new games, experimenting with systems, and occasionally disappearing into a very serious automation spiral.',
    'I also cover tech and film industry news, and streams often drift into conversations about filmmaking, technology, science, and whatever unexpected rabbit hole chat uncovers that night.',
    'I aim for three streams a week, though when I’m working on film sets the schedule may shift to a weekend stream until production wraps.',
    'Also featuring regular appearances from my cat daughter, Margot.',
  ],
};

export const communityRules = [
  'Be kind and respectful to everyone',
  'No spam, self-promotion, or excessive caps',
  'Respect moderators and their decisions',
  'Keep conversations positive and inclusive',
  'No spoilers without warning',
  'Have fun and be yourself!',
];

export const streamSetupSections: SetupSection[] = [
  {
    title: 'Computer',
    items: [
      {
        name: 'Custom Windows PC',
        details: [
          'CPU: Intel i7-13700KF',
          'GPU: NVIDIA RTX 4070 Ti',
          'RAM: 64 GB DDR4',
          'Built for gaming, streaming, editing, and experimenting with AI tools.',
        ],
      },
    ],
  },
  {
    title: 'Monitors',
    items: [
      {
        name: 'All Samsung displays',
        details: [],
      },
      {
        name: 'Primary Monitor',
        details: ['Samsung 32" Odyssey G55A QHD 165Hz Curved Gaming Monitor', 'Used for gameplay.'],
      },
      {
        name: 'Left Monitor',
        details: ['Samsung Odyssey G55A Ultrawide', 'Used for OBS, stream monitoring, and additional tools.'],
      },
      {
        name: 'Right Monitor (Vertical)',
        details: ['Samsung 27" G302 Smart Monitor (FHD)', 'Used for chat, Discord, and browser windows.'],
      },
    ],
  },
  {
    title: 'Cameras',
    items: [
      {
        name: 'Sony ZV-E10 II',
        details: ['Primary camera used for streams and filming.'],
      },
      {
        name: 'Elgato Facecam MK2',
        details: ['Secondary camera for alternate angles or backup.'],
      },
    ],
  },
  {
    title: 'Microphone',
    items: [
      {
        name: 'Elgato Wave:3',
        details: ['USB condenser microphone with built-in clip guard and Wave Link audio control.'],
      },
    ],
  },
  {
    title: 'Headphones',
    items: [
      {
        name: 'SteelSeries Arctis Nova Pro Wireless (PC & PlayStation)',
        details: ['Wireless headset with excellent audio clarity and dual-system support.'],
      },
    ],
  },
  {
    title: 'Stream Control',
    items: [
      {
        name: 'Elgato Stream Deck',
        details: ['Used for scene switching, automation, sound triggers, and stream control.'],
      },
      {
        name: 'Elgato HD60 X Capture Card',
        details: ['Used for capture workflows and flexible console/gameplay routing.'],
      },
    ],
  },
  {
    title: 'Keyboard & Mouse',
    items: [
      {
        name: 'RK Royal Kludge S98 Mechanical Keyboard',
        details: [],
      },
      {
        name: 'RK Royal Kludge RK M3 Gaming Mouse',
        details: [],
      },
    ],
  },
  {
    title: 'Software',
    items: [
      {
        name: 'OBS Studio',
        details: ['Broadcasting and scene control'],
      },
      {
        name: 'Streamerbot',
        details: ['Automation and interactive commands'],
      },
      {
        name: 'Discord',
        details: ['Community, calls, and watch parties'],
      },
      {
        name: 'VS Code',
        details: ['Coding, websites, and AI experiments'],
      },
    ],
  },
  {
    title: 'Special Guest',
    items: [
      {
        name: 'Margot (Cat)',
        details: ['Occasional stream cameo.'],
      },
    ],
  },
];
