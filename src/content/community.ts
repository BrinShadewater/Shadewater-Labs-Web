export interface CommunityLink {
  label: string;
  url: string;
  kind: 'twitch' | 'website' | 'profile' | 'network' | 'discord';
}

export interface ChaosPal {
  name: string;
  role: string;
  description: string;
  avatarSrc: string;
  avatarTheme: 'teegly' | 'crafty' | 'krusher';
  recentBadge?: string;
  links: CommunityLink[];
}

export const communityHero = {
  eyebrow: 'A cozy corner of the internet for curious, kind people',
  title: 'Community',
  description:
    'This community grew out of late-night streams, indie game discoveries, film discussions, technology rabbit holes, and the occasional chaotic tangent about the future of everything.',
  followup:
    'People here tend to enjoy thoughtful conversations, creative projects, strange ideas, and games that spark curiosity. It is a place where memes, media analysis, and delightfully weird late-night energy can all coexist.',
  tags: ['Thoughtful conversations', 'Creative projects', 'Indie games', 'Late-night internet energy'],
  orbitCards: [
    {
      label: 'Chaos Pals',
      value: '3 creators',
      description: 'Regular collaborators across streams, community nights, and ongoing internet chaos.',
    },
    {
      label: 'Stream Team',
      value: 'The Canopy',
      description: 'A wider circle of creators supporting each other through raids, collabs, and discovery.',
    },
    {
      label: 'Discord',
      value: '250+ members',
      description: 'The place where conversations keep going between streams, events, and watch parties.',
    },
  ],
};

export const chaosPalsIntro = {
  title: 'Chaos Pals',
  description:
    'Friends, collaborators, and fellow creators who regularly appear across streams, discussions, and community events. They helped shape the tone of the community: curious, supportive, and just chaotic enough to keep things interesting.',
};

export const chaosPals: ChaosPal[] = [
  {
    name: 'Teegly',
    role: 'Frequent co-streamer and chaos amplifier',
    description:
      'Expect thoughtful conversations, unexpected game discoveries, and the occasional completely unhinged tangent.',
    avatarSrc: '/teegly-community-avatar.webp',
    avatarTheme: 'teegly',
    recentBadge: 'Seen on stream recently',
    links: [
      {
        label: 'Twitch',
        url: 'https://www.twitch.tv/teeglyathome',
        kind: 'twitch',
      },
    ],
  },
  {
    name: 'CraftingChaosGaming',
    role: 'Streamer & Chaos Queen',
    description:
      'Known for creating cozy chaos across games and online spaces, with one foot in collaboration and the other in pure internet mayhem.',
    avatarSrc: '/crafty-chaos-gaming-community-avatar.webp',
    avatarTheme: 'crafty',
    recentBadge: 'Chaos Queen',
    links: [
      {
        label: 'Website',
        url: 'https://craftingchaosgaming.com/',
        kind: 'website',
      },
      {
        label: 'Twitch',
        url: 'https://www.twitch.tv/Craftingchaosgaming',
        kind: 'twitch',
      },
    ],
  },
  {
    name: 'Krusherdom',
    role: 'Resident Tinkerer and System Administrator',
    description:
      'Tech guru of the family, always ready with a clever fix, a better setup idea, or the kind of behind-the-scenes systems wisdom that keeps things humming.',
    avatarSrc: '/krusherdom-community-avatar.webp',
    avatarTheme: 'krusher',
    recentBadge: 'Tinkerer',
    links: [
      {
        label: 'Profile',
        url: 'https://craftingchaosgaming.com/krusherdom/',
        kind: 'profile',
      },
      {
        label: 'Twitch',
        url: 'https://www.twitch.tv/krusherdom',
        kind: 'twitch',
      },
    ],
  },
];

export const canopyInfo = {
  title: 'The Canopy',
  eyebrow: 'Some communities grow outward. This one also grows sideways.',
  description:
    'The Canopy is a network of creators and streamers who support each other through raids, collaborations, shared events, and community discovery.',
  followup:
    'If you enjoy finding new creators with a similar spirit, this is a great place to explore next.',
  link: {
    label: 'Visit The Canopy',
    url: 'https://thecanopy.team/',
    kind: 'network' as const,
  },
};

export const communityAtmosphere = [
  {
    title: 'Thoughtful Conversations',
    description:
      'Chat moves easily from memes to film analysis, game design discussions, and the occasional strange science rabbit hole.',
  },
  {
    title: 'Curiosity Driven',
    description:
      'People here love exploring ideas, whether that means indie games, filmmaking, technology, or whatever weird topic appears that night.',
  },
  {
    title: 'Creative Energy',
    description:
      'A lot of community members are creators themselves: streamers, artists, filmmakers, developers, and builders of interesting internet projects.',
  },
  {
    title: 'Late-Night Internet Energy',
    description:
      'The vibe leans relaxed, curious, and occasionally delightfully chaotic, especially when a stream slips into one more tangent.',
  },
];

export const communityMoments = [
  'Watch parties and trailer reactions',
  'Game discovery nights and indie recommendations',
  'Tech rabbit holes, AI tangents, and future-talk',
  'Collaborative streams, raids, and community hangouts',
];

export const discordInfo = {
  memberCount: '250+',
  inviteUrl: 'https://discord.gg/brinshadewater',
  title: 'Join the Community',
  description:
    'If you want to hang out between streams, catch watch parties, join discussions, or discover new games and creators, the Discord is where most of the community gathers.',
  followup: 'Join the little corner of the internet where this all started.',
};
