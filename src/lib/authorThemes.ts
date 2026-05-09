// Author badge colour themes used on project and Labs pages.
// Extracted from the legacy notes content file; lives here so Labs
// components don't depend on Brin-era note data.

export type ProjectAuthor = 'Brin' | 'Teegly' | 'Krusher' | 'Crafty';

export const authorThemes: Record<
  ProjectAuthor,
  {
    active: string;
    inactive: string;
    badge: string;
  }
> = {
  Brin: {
    active:
      'bg-[hsl(186_37%_28%)] text-[hsl(186_50%_88%)] border-[hsl(186_37%_36%)] shadow-[0_0_20px_hsl(186_37%_28%/0.35)]',
    inactive:
      'border-[hsl(186_37%_28%/0.45)] text-[hsl(186_45%_76%)] hover:border-[hsl(186_37%_40%)] hover:text-[hsl(186_55%_88%)]',
    badge: 'bg-[hsl(186_37%_28%/0.18)] text-[hsl(186_50%_72%)]',
  },
  Teegly: {
    active:
      'bg-[hsl(105_34%_34%)] text-[hsl(95_45%_92%)] border-[hsl(105_34%_42%)] shadow-[0_0_20px_hsl(105_34%_34%/0.35)]',
    inactive:
      'border-[hsl(105_34%_34%/0.45)] text-[hsl(95_30%_78%)] hover:border-[hsl(105_34%_46%)] hover:text-[hsl(95_45%_90%)]',
    badge: 'bg-[hsl(105_34%_34%/0.18)] text-[hsl(95_30%_76%)]',
  },
  Krusher: {
    active:
      'bg-[hsl(var(--sandstone)/0.9)] text-[hsl(36_30%_96%)] border-[hsl(var(--sandstone-soft))] shadow-[0_0_20px_hsl(34_26%_48%/0.35)]',
    inactive:
      'border-[hsl(var(--sandstone)/0.45)] text-[hsl(var(--sandstone-soft))] hover:border-[hsl(var(--sandstone-soft))] hover:text-[hsl(36_30%_92%)]',
    badge: 'bg-[hsl(var(--sandstone)/0.18)] text-[hsl(var(--sandstone-soft))]',
  },
  Crafty: {
    active:
      'bg-[hsl(342_62%_46%)] text-[hsl(340_70%_96%)] border-[hsl(342_70%_58%)] shadow-[0_0_20px_hsl(342_62%_46%/0.35)]',
    inactive:
      'border-[hsl(342_62%_46%/0.45)] text-[hsl(342_55%_74%)] hover:border-[hsl(342_70%_58%)] hover:text-[hsl(340_70%_92%)]',
    badge: 'bg-[hsl(342_62%_46%/0.18)] text-[hsl(342_55%_72%)]',
  },
};
