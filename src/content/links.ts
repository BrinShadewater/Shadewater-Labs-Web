export interface SocialLink {
  name: string;
  url: string;
  platform: string;
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitch',
    url: 'https://twitch.tv/brinshadewater',
    platform: 'twitch',
    description: 'Watch live streams',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@brinshadewater',
    platform: 'youtube',
    description: 'Video essays & reviews',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/brinshadewater',
    platform: 'discord',
    description: 'Join the community',
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com/brinshadewater',
    platform: 'twitter',
    description: 'Thoughts & updates',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/brinshadewater',
    platform: 'instagram',
    description: 'Photos & stories',
  },
  {
    name: 'Letterboxd',
    url: 'https://letterboxd.com/brinshadewater',
    platform: 'letterboxd',
    description: 'Film reviews & lists',
  },
];
