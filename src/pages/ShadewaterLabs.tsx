import { Button } from '@/components/ui/button';
import { projectStatuses } from '@/content/projects';
import { authorThemes as noteAuthorThemes } from '@/lib/authorThemes';
import {
  SHADEWATER_LABS_TEXT_LOGO_ALT,
  SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC,
} from '@/lib/brandAssets';

const labTracks = [
  {
    title: 'AI Tools & Creative Technology',
    description:
      'Experiments with AI tools, automation workflows, coding utilities, and creative software. This includes prompt engineering experiments, AI content tools, and new ways to combine artificial intelligence with creative production.',
  },
  {
    title: 'Websites & Coding Projects',
    description:
      'Custom web development projects, apps, and coding experiments built to explore new ideas. From small utilities to full website builds, these projects document how modern software and AI tools can work together.',
  },
  {
    title: 'Future Tech Experiments',
    description:
      'A home for prototypes, experimental apps, and emerging technology ideas. Some projects become full products. Others remain strange but useful experiments.',
  },
];

const comingSoon = [
  'Original AI tools and coding utilities',
  'Experimental web apps and creative software',
  'Behind-the-scenes technology experiments',
  'Small digital products and downloads for creators',
];

interface ShadewaterLabsProps {
  onNavigate: (page: string) => void;
}

export default function ShadewaterLabs({ onNavigate }: ShadewaterLabsProps) {
  const seoReport = projectStatuses['shadewater-seo-report'];
  const webpMeDaddy = projectStatuses['webp-me-daddy'];
  const inkmasterStudio = projectStatuses['inkmaster-studio'];
  const labsProjects = [
    {
      project: seoReport,
      badge: 'Internal Operator',
      page: 'shadewater-seo-report',
      buttonLabel: 'Shadewater SEO Report',
      description:
        'A deterministic SEO audit skill that turns live site evidence into branded dashboards, markdown reports, action plans, and rerunnable fix loops.',
      logoWrapperClass: 'h-56 items-center py-1',
      logoClass: 'max-h-[15rem] max-w-[9rem] drop-shadow-[0_16px_34px_hsl(192_70%_60%/0.16)]',
    },
    {
      project: webpMeDaddy,
      badge: 'Featured Project',
      page: 'webp-me-daddy',
      buttonLabel: 'Webp Me Daddy',
      description:
        'A layout-aware image pipeline for production websites. It turns messy project assets into recipe-driven WebP images with strict metadata, proof sheets, snippet generation, audits, and cleanup workflows.',
      logoWrapperClass: 'items-center py-5',
      logoClass: 'max-h-[8.75rem] max-w-[10.75rem] opacity-95 drop-shadow-[0_16px_34px_hsl(184_85%_58%/0.14)]',
    },
    {
      project: inkmasterStudio,
      badge: 'Beta Product',
      page: 'inkmaster-studio',
      buttonLabel: 'InkMaster Studio',
      description:
        'A browser-based print-prep workflow for apparel graphics. It turns rough artwork into DTG-ready files with knockout cleanup, texture controls, mockup previews, underbase generation, and export tools built around actual merch production.',
      logoWrapperClass: 'items-center py-8',
      logoClass: 'max-h-[7rem] max-w-[8.4rem] opacity-95 drop-shadow-[0_16px_34px_hsl(219_90%_58%/0.16)]',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="mb-2 flex justify-center px-4 sm:mb-3">
        <img
          src={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC}
          width={620}
          height={1220}
          alt={SHADEWATER_LABS_TEXT_LOGO_ALT}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-[28rem] w-auto drop-shadow-[0_20px_50px_hsl(192_70%_60%/0.22)] sm:h-[32rem] md:h-[40rem]"
        />
      </div>

      <section className="overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-[linear-gradient(135deg,hsl(220_28%_10%),hsl(192_34%_16%),hsl(30_22%_18%))] px-4 py-12 shadow-[0_24px_56px_hsl(210_66%_3%/0.32)] sm:px-10 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mx-auto max-w-[19rem] text-3xl font-bold text-white sm:max-w-none sm:text-5xl md:text-6xl">
            AI Tools, Coding Projects &amp; Tech Experiments
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base text-[hsl(var(--sandstone-soft))] sm:text-lg md:text-xl">
            <p>
              Shadewater Labs is the experimental technology studio of Brin Shadewater. Here I build AI tools, websites,
              coding projects, and creative technology experiments while exploring the future of artificial intelligence,
              internet culture, and digital products.
            </p>
            <p>This is where ideas become working prototypes, software tools, and future tech projects.</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              variant="hero"
              onClick={() => document.getElementById('labs-projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      <section id="labs-projects" className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">What Lives Here</h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
            Technology Experiments in Motion
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {labTracks.map((track) => (
            <div
              key={track.title}
              className="rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
            >
              <h3 className="text-2xl font-semibold text-white">{track.title}</h3>
              <p className="mt-3 text-foreground/68">{track.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="rounded-[2rem] border-2 border-[hsl(192_29%_21%/0.45)] bg-[linear-gradient(145deg,hsl(220_24%_12%/0.96),hsl(192_28%_15%/0.92))] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80">Projects</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Things That Already Live Here</h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground/72">
              Shadewater Labs is where ideas become actual tools. These are the projects that already have their own product
              pages, progress breakdowns, and clearer production stories.
            </p>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {labsProjects.map((item) => (
              <div
                key={item.project.slug}
                className="rounded-[1.75rem] border border-white/12 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_12px_28px_hsl(210_66%_3%/0.2)] sm:p-7"
              >
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">
                      {item.badge}
                    </p>
                    <span className={`rounded-full border border-white/10 px-3 py-1 text-xs font-medium ${noteAuthorThemes[item.project.author].badge}`}>
                      {item.project.author}
                    </span>
                  </div>

                  {item.project.hero.logo ? (
                    <div className={`flex h-32 justify-center ${item.logoWrapperClass}`}>
                      <img
                        src={item.project.hero.logo.src}
                        srcSet={item.project.hero.logo.srcSet}
                        sizes="(min-width: 1280px) 13rem, (min-width: 1024px) 15rem, 42vw"
                        width={item.project.hero.logo.width}
                        height={item.project.hero.logo.height}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`h-auto w-auto ${item.logoClass}`}
                      />
                    </div>
                  ) : null}

                  <div className="max-w-2xl">
                    <h3 className="mt-3 text-3xl font-bold text-white">{item.project.name}</h3>
                    <p className="mt-3 text-base text-foreground/72 sm:text-lg">{item.description}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button variant="hero" onClick={() => onNavigate(item.page)}>
                      {item.buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-16">
        <div className="rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.35)] bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.22)] md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white">Coming Soon</h2>
            <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
              New AI Tools, Apps &amp; Digital Projects
            </p>
          </div>

          <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-foreground/74">
            Shadewater Labs will soon include:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {comingSoon.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-foreground/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
