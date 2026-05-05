import { Button } from '@/components/ui/button';
import { projectStatuses } from '@/content/projects';

interface ProjectsProps {
  onNavigate: (page: string) => void;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const projects = Object.values(projectStatuses);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80">Projects</p>
        <h1 className="mt-3 text-5xl font-bold text-white md:text-6xl">Shadewater Labs Projects</h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/72">
          The active catalog of Labs tools, product experiments, creative technology builds, and operator workflows.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex min-h-full flex-col rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_34px_hsl(210_66%_3%/0.18)]"
          >
            {project.hero.logo ? (
              <div className="mb-5 flex h-32 items-center justify-center">
                <img
                  src={project.hero.logo.src}
                  srcSet={project.hero.logo.srcSet}
                  sizes={project.hero.logo.sizes}
                  width={project.hero.logo.width}
                  height={project.hero.logo.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-28 w-auto max-w-[12rem]"
                />
              </div>
            ) : null}
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/76">
              {project.currentStage}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">{project.name}</h2>
            <p className="mt-3 text-foreground/70">{project.summary}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,hsl(192_29%_21%),hsl(192_38%_34%),hsl(var(--sandstone-soft)))]"
                style={{ width: `${project.overallProgress}%` }}
              />
            </div>
            <div className="mt-auto pt-6">
              <Button variant="hero" onClick={() => onNavigate(project.slug)}>
                Open Project
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
