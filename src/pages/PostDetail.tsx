import { noteAuthorThemes, notes } from '../content/notes';

interface PostDetailProps {
  noteId: string;
  onNavigate: (page: string) => void;
}

export default function PostDetail({ noteId, onNavigate }: PostDetailProps) {
  const note = notes.find((n) => n.id === noteId);
  const contentParagraphs = note?.content
    ? note.content.split('\n\n').map((paragraph) => paragraph.trim()).filter(Boolean)
    : [];
  const headerLabel =
    contentParagraphs[0] &&
    contentParagraphs[0].length <= 48 &&
    contentParagraphs[0] === contentParagraphs[0].toUpperCase()
      ? contentParagraphs[0]
      : null;
  const articleParagraphs = headerLabel ? contentParagraphs.slice(1) : contentParagraphs;

  if (!note) {
    return (
      <div className="max-w-4xl mx-auto px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Note Not Found</h1>
          <button
            onClick={() => onNavigate('notes')}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('notes')}
        className="mb-8 flex items-center gap-2 rounded-lg border-2 border-foreground/10 bg-background/50 px-4 py-2 text-foreground/70 shadow-md transition-all hover:border-primary/40 hover:text-primary hover:shadow-lg"
      >
        <span>←</span>
        <span>Back to Notes</span>
      </button>

      {/* Article Header */}
      <article className="rounded-[2rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm md:p-8">
        <header className="mb-10">
          <div className="mb-3">
            <span className={`text-xs px-3 py-1.5 rounded-full font-sans font-semibold ${noteAuthorThemes[note.author].badge}`}>
              {note.author}
            </span>
          </div>
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-sans">
              {note.category}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-sans">
              {note.type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {note.title}
          </h1>
          {note.heroImage ? (
            <div className="mb-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[hsl(220_18%_10%)] shadow-[0_16px_34px_hsl(210_66%_3%/0.24)]">
              <img
                src={note.heroImage.src}
                alt={note.heroImage.alt}
                width={note.heroImage.width}
                height={note.heroImage.height}
                loading="eager"
                decoding="async"
                className="h-auto w-full"
                style={{ aspectRatio: `${note.heroImage.width} / ${note.heroImage.height}` }}
              />
            </div>
          ) : null}
          <p className="text-sm uppercase tracking-[0.22em] text-[hsl(var(--sandstone-soft))]/80 font-sans">{note.date}</p>
        </header>

        {/* YouTube Embed Placeholder */}
        {note.youtubeId && (
          <div className="mb-8 flex aspect-video items-center justify-center rounded-xl border-2 border-foreground/10 bg-background/50">
            <div className="text-center">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-xl text-foreground/70 font-sans">YouTube Video Embed</p>
              <p className="text-sm text-foreground/50 mt-2 font-sans">
                Placeholder for video ID: {note.youtubeId}
              </p>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-[1.08rem] leading-8 text-[hsl(var(--sandstone-soft))] md:text-[1.15rem] md:leading-9">
            {note.excerpt}
          </p>
          {headerLabel ? (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/70 font-sans">
              {headerLabel}
            </p>
          ) : null}
          <div className="space-y-6 text-[1.02rem] leading-8 text-foreground/84 md:text-[1.08rem] md:leading-9">
            {articleParagraphs.map((paragraph, index) => {
              const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean);
              const urlLine = lines.length > 1 ? lines.find((line) => /^https?:\/\//.test(line)) : null;

              if (urlLine) {
                const labelLines = lines.filter((line) => line !== urlLine);
                return (
                  <div key={index} className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                    {labelLines.map((line) => (
                      <p key={line} className="font-medium text-foreground/88">
                        {line}
                      </p>
                    ))}
                    <a
                      href={urlLine}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-[hsl(var(--sandstone-soft))] underline decoration-[hsl(var(--sandstone-soft))]/40 underline-offset-4 transition-colors hover:text-white"
                    >
                      {urlLine}
                    </a>
                  </div>
                );
              }

              return <p key={index}>{lines.join(' ')}</p>;
            })}
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <div className="mt-16 pt-8 border-t border-foreground/10">
        <p className="text-center text-foreground/70 mb-4">
          Want to discuss this? Join the conversation on Discord.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => window.open('https://discord.gg/brinshadewater', '_blank', 'noopener,noreferrer')}
            className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-sans"
          >
            Join Discord
          </button>
        </div>
      </div>
    </div>
  );
}
