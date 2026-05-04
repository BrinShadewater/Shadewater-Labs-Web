import { bioParagraphs, interests, brinFunFacts, margotParagraphs, margotFunFacts, margotInterests } from '../content/about';
import { BRIN_MARGOT_LOCKUP_ALT, BRIN_MARGOT_LOCKUP_SIZES, BRIN_MARGOT_LOCKUP_SRCSET } from '../lib/brandAssets';

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-center">
        <img
          src="/brin-margot-logo-lockup.webp"
          srcSet={BRIN_MARGOT_LOCKUP_SRCSET}
          sizes={BRIN_MARGOT_LOCKUP_SIZES}
          width={900}
          height={675}
          alt={BRIN_MARGOT_LOCKUP_ALT}
          loading="eager"
          decoding="async"
          className="h-auto w-full max-w-[520px] drop-shadow-[0_18px_40px_hsl(210_66%_3%/0.28)]"
        />
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white md:text-6xl">About</h1>
        <p className="mt-4 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/85">
          <span className="relative inline-block pr-1">
            Possibly More
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left animate-pulse rounded-full bg-[hsl(var(--sandstone-soft))]" />
          </span>{' '}
          Than You Wanted To Know About Me
        </p>
      </div>

      <section className="mb-14 rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.25)] bg-[hsl(220_20%_13%/0.92)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.22)] md:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Brin</h2>
        </div>

        <div className="space-y-6 text-lg leading-9 text-foreground/85">
          {bioParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%)] p-8 shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)]">
          <h2 className="mb-6 text-2xl font-bold text-white">Brin&apos;s Fun Facts</h2>
          <ul className="space-y-3">
            {brinFunFacts.map((fact) => (
              <li key={fact} className="flex gap-3 text-foreground/80">
                <span className="text-primary">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-white">Interests &amp; Obsessions</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border-2 border-white/10 bg-[hsl(220_20%_13%)] px-4 py-2 text-sm text-[hsl(var(--sandstone-soft))]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-8 flex justify-center">
        <img
          src="/margot-trans.webp"
          width={351}
          height={596}
          alt="Margot illustration"
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-[180px] drop-shadow-[0_16px_36px_hsl(210_66%_3%/0.34)]"
        />
      </div>

      <section className="rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.28)] bg-[linear-gradient(135deg,hsl(220_22%_11%/0.96),hsl(210_20%_12%/0.94),hsl(34_18%_18%/0.88))] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Margot</h2>
        </div>

        <div className="space-y-5 text-lg leading-8 text-foreground/82">
          {margotParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-[hsl(220_20%_13%/0.72)] p-6">
          <h3 className="mb-5 text-xl font-bold text-white">Margot&apos;s Fun Facts</h3>
          <ul className="space-y-3">
            {margotFunFacts.map((fact) => (
              <li key={fact} className="flex gap-3 text-foreground/80">
                <span className="text-[hsl(var(--sandstone-soft))]">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[hsl(220_20%_13%/0.72)] p-6">
          <h3 className="mb-5 text-xl font-bold text-white">Interests &amp; Obsessions</h3>
          <div className="flex flex-wrap gap-3">
            {margotInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[hsl(var(--sandstone-soft))]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
