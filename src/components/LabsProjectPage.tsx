import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectAction, ProjectStatus } from '@/content/projects';
import { authorThemes as noteAuthorThemes } from '@/lib/authorThemes';

interface LabsProjectPageProps {
  project: ProjectStatus;
  onNavigate: (page: string) => void;
}

function renderAction(action: ProjectAction, onNavigate: (page: string) => void) {
  if (action.type === 'href') {
    return (
      <Button key={action.id} variant={action.variant} asChild>
        <a
          href={action.target}
          target={action.newTab ? '_blank' : undefined}
          rel={action.newTab ? 'noopener noreferrer' : undefined}
        >
          {action.label}
        </a>
      </Button>
    );
  }

  if (action.type === 'page') {
    return (
      <Button key={action.id} variant={action.variant} onClick={() => onNavigate(action.target)}>
        {action.label}
      </Button>
    );
  }

  return (
    <Button
      key={action.id}
      variant={action.variant}
      onClick={() => document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
    >
      {action.label}
    </Button>
  );
}

export default function LabsProjectPage({ project, onNavigate }: LabsProjectPageProps) {
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<string | null>(null);
  const selectedShowcase = project.showcase.find((item) => item.id === selectedShowcaseId) ?? null;
  const hasMetrics = Boolean(project.metrics?.length);
  const hasShowcase = project.showcase.length > 0;

  useEffect(() => {
    if (!selectedShowcase) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedShowcaseId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShowcase]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      {project.hero.logo ? (
        <div className="mb-4 flex justify-center px-4 sm:mb-5">
          <img
            src={project.hero.logo.src}
            srcSet={project.hero.logo.srcSet}
            sizes={project.hero.logo.sizes}
            width={project.hero.logo.width}
            height={project.hero.logo.height}
            alt={project.hero.logo.alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={project.hero.logo.className ?? 'h-auto w-full max-w-[24rem]'}
          />
        </div>
      ) : null}

      <section className="overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-[linear-gradient(145deg,hsl(220_24%_12%),hsl(192_28%_15%),hsl(220_20%_11%))] px-6 py-10 shadow-[0_24px_56px_hsl(210_66%_3%/0.32)] sm:px-10 sm:py-14">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80">
              {project.hero.eyebrow}
            </p>
            <span className={`rounded-full border border-white/10 px-3 py-1 text-xs font-medium ${noteAuthorThemes[project.author].badge}`}>
              {project.author}
            </span>
          </div>
          <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">{project.hero.title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-[hsl(var(--sandstone-soft))] md:text-xl">{project.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.hero.actions.map((action) => renderAction(action, onNavigate))}
          </div>

          <div className="mt-8 inline-flex rounded-full border border-[hsl(var(--sandstone)/0.32)] bg-white/5 px-4 py-2 text-sm text-foreground/72">
            {project.hero.tagline}
          </div>
        </div>
      </section>

      {hasMetrics ? (
        <section className="pt-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {project.metrics?.map((metric) => (
              <article
                key={metric.id}
                className="rounded-[1.65rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_12px_26px_hsl(210_66%_3%/0.16)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">
                  {metric.label}
                </p>
                <div className="mt-4 text-5xl font-bold leading-none text-white">{metric.value}</div>
                <p className="mt-4 text-sm text-foreground/68">{metric.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pt-16">
        <div className="rounded-[2rem] border-2 border-[hsl(192_29%_21%/0.42)] bg-[linear-gradient(145deg,hsl(220_22%_12%/0.96),hsl(192_24%_15%/0.9))] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/78">
                Project Status
              </p>
              <h2 className="mt-3 text-4xl font-bold text-white">Current Progress</h2>
              <p className="mt-4 text-lg text-foreground/72">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground/72">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Stage: {project.currentStage}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Last updated: {project.lastUpdated}
                </span>
              </div>
            </div>

            <div className="min-w-[15rem] rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.9)] p-6 shadow-[0_14px_30px_hsl(210_66%_3%/0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/75">
                Total Progress
              </p>
              <div className="mt-4 text-6xl font-bold leading-none text-white">{project.overallProgress}%</div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,hsl(192_29%_21%),hsl(192_38%_34%),hsl(var(--sandstone-soft)))]"
                  style={{ width: `${project.overallProgress}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-foreground/68">
                Strong on core workflow. Still growing into the polished product and future web surface.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {project.phases.map((phase) => (
              <div
                key={phase.id}
                className="rounded-[1.65rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_12px_26px_hsl(210_66%_3%/0.16)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-white">{phase.label}</p>
                    <p className="mt-2 text-sm text-[hsl(var(--sandstone-soft))]/82">{phase.status}</p>
                  </div>
                  <div className="text-3xl font-bold text-white">{phase.progress}%</div>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,hsl(192_29%_21%),hsl(192_36%_31%),hsl(var(--sandstone-soft)))]"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>

                <p className="mt-4 text-foreground/68">{phase.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <div className="rounded-[1.65rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_12px_26px_hsl(210_66%_3%/0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">
                Recent Milestones
              </p>
              <div className="mt-5 space-y-4">
                {project.recentMilestones.map((milestone) => (
                  <div key={milestone} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-foreground/76">
                    {milestone}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.65rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_12px_26px_hsl(210_66%_3%/0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">What&apos;s Next</p>
              <div className="mt-5 space-y-4">
                {project.nextUp.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-foreground/76">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">{project.purpose.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/72">{project.purpose.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {project.purpose.items.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
            >
              <h3 className="text-2xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-foreground/68">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">{project.audienceSection.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/72">{project.audienceSection.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {project.audiences.map((audience) => (
            <div
              key={audience.id}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,hsl(220_20%_13%/0.94),hsl(220_18%_11%/0.92))] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
            >
              <h3 className="text-2xl font-semibold text-white">{audience.title}</h3>
              <p className="mt-3 text-foreground/68">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">{project.comparisonSection.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/72">{project.comparisonSection.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {project.comparisons.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,hsl(220_20%_13%/0.94),hsl(220_18%_11%/0.92))] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
            >
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-foreground/68">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">{project.limitationsSection.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/72">{project.limitationsSection.description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {project.limitations.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.75rem] border border-[hsl(var(--sandstone)/0.28)] bg-[linear-gradient(160deg,hsl(220_20%_13%/0.94),hsl(220_18%_11%/0.92))] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
            >
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-foreground/68">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="webp-loop" className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">{project.workflow.title}</h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
            {project.workflow.eyebrow}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {project.workflow.steps.map((step) => (
            <div
              key={step.id}
              className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(160deg,hsl(220_20%_13%/0.94),hsl(220_18%_11%/0.92))] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/78">{step.label}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-foreground/68">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {hasShowcase ? (
        <section className="pt-16">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white">Real Output Gallery</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/72">
              These are actual artifacts generated by the pipeline, not placeholder mockups. The goal is to make proofing,
              review, and decision-making visible instead of hidden behind a command line.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {project.showcase.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-[1.85rem] border border-white/10 bg-[hsl(220_20%_13%/0.94)] shadow-[0_16px_38px_hsl(210_66%_3%/0.2)] ${
                  item.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="border-b border-white/8 bg-[linear-gradient(180deg,hsl(220_18%_11%/0.85),hsl(220_18%_11%/0.45))] px-6 py-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-foreground/68">{item.description}</p>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[hsl(210_30%_8%)]">
                    <button
                      type="button"
                      onClick={() => setSelectedShowcaseId(item.id)}
                      className="block w-full cursor-zoom-in"
                      aria-label={`Enlarge ${item.title}`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
                      />
                    </button>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--sandstone-soft))]/70">
                    Click image to enlarge
                  </p>

                  <div className="mt-4 rounded-[1.15rem] border border-white/8 bg-[hsl(220_18%_11%/0.9)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[hsl(var(--sandstone-soft))]/76">
                      Command
                    </p>
                    <div className="mt-3 overflow-x-auto rounded-xl border border-white/8 bg-[hsl(210_30%_8%)] px-4 py-3">
                      <code className="block min-w-[18rem] whitespace-pre-wrap break-all text-sm text-foreground/78">
                        {item.command}
                      </code>
                    </div>
                    <p className="mt-3 text-sm text-foreground/66">{item.outputSummary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pt-16">
        <div className="rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.35)] bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.22)] md:p-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-white">{project.cta.title}</h2>
            <p className="mt-4 text-lg text-foreground/72">{project.cta.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.cta.actions.map((action) => renderAction(action, onNavigate))}
          </div>
        </div>
      </section>

      {selectedShowcase ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[hsl(210_66%_3%/0.88)] p-4 backdrop-blur-md"
          onClick={() => setSelectedShowcaseId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedShowcase.title}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.98)] shadow-[0_20px_60px_hsl(210_66%_3%/0.44)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedShowcaseId(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[hsl(220_20%_13%/0.88)] text-white transition-colors hover:bg-white/10"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="border-b border-white/8 px-6 py-5 pr-20">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/78">
                {selectedShowcase.label}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{selectedShowcase.title}</h3>
            </div>
            <div className="max-h-[calc(92vh-6rem)] overflow-auto p-4 sm:p-6">
              <img
                src={selectedShowcase.src}
                alt={selectedShowcase.alt}
                width={selectedShowcase.width}
                height={selectedShowcase.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-[1.25rem] border border-white/8 bg-[hsl(210_30%_8%)]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

    </div>
  );
}
