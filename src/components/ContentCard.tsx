import { noteAuthorThemes, type NoteAuthor, type NoteHeroImage } from '../content/notes';

interface ContentCardProps {
  title: string;
  category: string;
  type: string;
  author: NoteAuthor;
  excerpt: string;
  date: string;
  heroImage?: NoteHeroImage;
  onClick?: () => void;
}

export default function ContentCard({ title, category, type, author, excerpt, date, heroImage, onClick }: ContentCardProps) {
  const authorTheme = noteAuthorThemes[author];

  return (
    <div 
      className="group overflow-hidden rounded-2xl border-[3px] border-border bg-[hsl(220_20%_13%)] shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)] outline-none transition-all hover:-translate-y-1 hover:bg-[hsl(220_20%_15%)] hover:shadow-xl hover:shadow-primary-glow/10 hover:shadow-[0_8px_20px_hsl(0_0%_0%/0.4),0_0_30px_hsl(192_49%_14%/0.2)] cursor-pointer"
      onClick={onClick}
    >
      {heroImage ? (
        <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-[hsl(220_18%_10%)]">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="p-8">
        <div className="mb-4 flex gap-2">
          <span className="rounded-full border border-primary/25 bg-primary/18 px-2.5 py-1 text-xs font-medium text-primary-glow">{category}</span>
          <span className="rounded-full border border-secondary/25 bg-secondary/18 px-2.5 py-1 text-xs font-medium text-secondary-glow">{type}</span>
          <span className={`rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium ${authorTheme.badge}`}>{author}</span>
        </div>
        <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary-glow md:text-2xl">{title}</h3>
        <p className="mb-4 text-sm text-foreground-muted line-clamp-2 md:text-base">{excerpt}</p>
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground-muted/85">{date}</span>
      </div>
    </div>
  );
}
