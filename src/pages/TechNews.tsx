import { ExternalLink } from 'lucide-react';
import { techNewsItems } from '@/content/techNews';

export default function TechNews() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80">Tech News</p>
        <h1 className="mt-3 text-5xl font-bold text-white md:text-6xl">AI & Creative Tech Notes</h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/72">
          A manually curated space for AI-related technology signals, product ideas, and workflow changes worth tracking.
        </p>
      </section>

      <div className="space-y-5">
        {techNewsItems.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[hsl(var(--sandstone-soft))]/76">
              <span>{item.category}</span>
              <span className="text-foreground/35">/</span>
              <span>{item.date}</span>
              <span className="text-foreground/35">/</span>
              <span>{item.source}</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">{item.title}</h2>
            <p className="mt-3 max-w-3xl text-foreground/70">{item.summary}</p>
            {item.href ? (
              <a
                href={item.href}
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--sandstone-soft))] hover:text-white"
              >
                Read source
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
