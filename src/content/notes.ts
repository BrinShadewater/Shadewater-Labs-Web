export type NoteCategory = 'Movies' | 'TV' | 'Games' | 'Tech' | 'Products' | 'AI' | 'Books';
export type NoteType = 'Review' | 'Video Review' | 'Essay' | 'Note';
export type NoteAuthor = 'Brin' | 'Teegly' | 'Krusher' | 'Crafty';

export interface NoteHeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Note {
  id: string;
  title: string;
  category: NoteCategory;
  type: NoteType;
  author: NoteAuthor;
  excerpt: string;
  content: string;
  date: string;
  youtubeId?: string;
  heroImage?: NoteHeroImage;
}

export const noteAuthorThemes: Record<
  NoteAuthor,
  {
    active: string;
    inactive: string;
    badge: string;
  }
> = {
  Brin: {
    active: 'bg-[hsl(186_37%_28%)] text-[hsl(186_50%_88%)] border-[hsl(186_37%_36%)] shadow-[0_0_20px_hsl(186_37%_28%/0.35)]',
    inactive: 'border-[hsl(186_37%_28%/0.45)] text-[hsl(186_45%_76%)] hover:border-[hsl(186_37%_40%)] hover:text-[hsl(186_55%_88%)]',
    badge: 'bg-[hsl(186_37%_28%/0.18)] text-[hsl(186_50%_72%)]',
  },
  Teegly: {
    active: 'bg-[hsl(105_34%_34%)] text-[hsl(95_45%_92%)] border-[hsl(105_34%_42%)] shadow-[0_0_20px_hsl(105_34%_34%/0.35)]',
    inactive: 'border-[hsl(105_34%_34%/0.45)] text-[hsl(95_30%_78%)] hover:border-[hsl(105_34%_46%)] hover:text-[hsl(95_45%_90%)]',
    badge: 'bg-[hsl(105_34%_34%/0.18)] text-[hsl(95_30%_76%)]',
  },
  Krusher: {
    active: 'bg-[hsl(var(--sandstone)/0.9)] text-[hsl(36_30%_96%)] border-[hsl(var(--sandstone-soft))] shadow-[0_0_20px_hsl(34_26%_48%/0.35)]',
    inactive: 'border-[hsl(var(--sandstone)/0.45)] text-[hsl(var(--sandstone-soft))] hover:border-[hsl(var(--sandstone-soft))] hover:text-[hsl(36_30%_92%)]',
    badge: 'bg-[hsl(var(--sandstone)/0.18)] text-[hsl(var(--sandstone-soft))]',
  },
  Crafty: {
    active: 'bg-[hsl(342_62%_46%)] text-[hsl(340_70%_96%)] border-[hsl(342_70%_58%)] shadow-[0_0_20px_hsl(342_62%_46%/0.35)]',
    inactive: 'border-[hsl(342_62%_46%/0.45)] text-[hsl(342_55%_74%)] hover:border-[hsl(342_70%_58%)] hover:text-[hsl(340_70%_92%)]',
    badge: 'bg-[hsl(342_62%_46%/0.18)] text-[hsl(342_55%_72%)]',
  },
};

export const notes: Note[] = [
  {
    id: '11',
    title: 'Bugonia - Placeholder Review',
    category: 'Movies',
    type: 'Review',
    author: 'Brin',
    excerpt: 'Temporary placeholder review copy so we can preview the Bugonia poster tile and article layout before the real writeup is ready.',
    content: `PLACEHOLDER REVIEW

This is temporary placeholder copy for Bugonia so we can preview the movie tile, poster treatment, and full post layout inside the site.

The final review is still to come, but this gives us a real content object to test with while the poster image is already in place.

Once the full review is written, we can swap this copy out directly without changing the image wiring.`,
    date: 'March 14, 2026',
    heroImage: {
      src: '/bugonia-review-hero.webp',
      alt: 'Bugonia review hero art centered on the poster face beneath dripping red liquid.',
      width: 696,
      height: 392,
    },
  },
  {
    id: '10',
    title: 'The Last Caretaker - Early Access Review',
    category: 'Games',
    type: 'Review',
    author: 'Teegly',
    excerpt: 'A quietly confident blend of survival crafting, light factory building, and calm system-driven discovery that feels more meditative than frantic.',
    content: `EARLY ACCESS REVIEW

This game scratches a very particular itch I didn't even realise I had. The Last Caretaker sits in that sweet spot between post-apocalyptic survival crafting and light factory building, and it feels quietly confident in what it's doing. It feels very zen while still including the occasional combat.

I really enjoy how little the game holds your hand. You're mostly left to experiment, make mistakes, and figure out your own solutions, which makes progress feel earned rather than guided. There's something deeply satisfying about optimising your setup over time and realising you've learned the systems simply by engaging with them.

The atmosphere leans more thoughtful than frantic, and the blend of survival mechanics with factory-style efficiency scratches that "just one more improvement" part of my brain. I did catch myself thinking how fun this could be in online co-op, though I also like the irony that it would kind of defeat the point of being the last caretaker.

If you enjoy games that trust you to learn by doing, reward curiosity, and blend survival with a slower paced process management system, this is absolutely worth your time.`,
    date: 'March 14, 2026',
    heroImage: {
      src: '/the-last-caretaker-early-access-review-hero.webp',
      alt: 'The Last Caretaker key art showing a lone robot on a shoreline. Text reads "THE LAST CARETAKER".',
      width: 460,
      height: 215,
    },
  },
  {
    id: '9',
    title: 'Whiskerwood - Early Access Impressions',
    category: 'Games',
    type: 'Review',
    author: 'Teegly',
    excerpt: 'A city builder so smart and charming it has fully crossed over into scheduled life activity territory.',
    content: `EARLY ACCESS REVIEW

Whiskerwood has completely taken over my brain. It's reached the point where I genuinely announce "okay, I'm off to play mouse game now, bye bye" like it's a scheduled life activity. No other city builder has hooked me like this, and I think it's the combination of smart systems and pure charm that's done me in.

Building vertically into the mountainside feels so good. Mining, terraforming, stacking production chains, then watching everything click into place is deeply satisfying. But the real magic is the mice themselves. The tiny hats. The little routines. I love zooming in on a single mouse from logistics, following their exact route to work, and then redesigning the whole system with trains, elevators, and shortcuts just to make their day faster and smoother.

My one big wish is better mouse management tools. I'd love more sorting options, especially by traits, and a clearer way to see which specific mice are giving negative feedback. If someone can't find clean clothes, let me know who they are so I can actually fix the problem properly. That said, this is already something really special. I'm obsessed, and I can't wait to see how it grows.

Steam review:
https://steamcommunity.com/id/teeglyathome/recommended/2489330`,
    date: 'January 31, 2026',
    heroImage: {
      src: '/whiskerwood-early-access-review-hero.webp',
      alt: 'Whiskerwood key art with armed mice and a giant cat above a woodland town. Text reads "Whiskerwood".',
      width: 460,
      height: 215,
    },
  },
];
