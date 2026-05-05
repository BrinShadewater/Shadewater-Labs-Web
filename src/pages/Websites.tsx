import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { managedWebsites } from '@/content/websites';

export default function Websites() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80">Websites</p>
        <h1 className="mt-3 text-5xl font-bold text-white md:text-6xl">Managed Web Properties</h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/72">
          The public web surfaces currently managed, designed, or productized through Shadewater Labs.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        {managedWebsites.map((site) => (
          <article
            key={site.id}
            className="flex min-h-full flex-col rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/76">
                {site.role}
              </p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70">
                {site.status}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">{site.name}</h2>
            <p className="mt-3 text-foreground/70">{site.description}</p>
            <div className="mt-auto pt-6">
              <Button variant="hero-outline" asChild>
                <a href={site.url} rel="noopener noreferrer">
                  Visit Site
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
