import { useEffect, useRef } from 'react';
import { brineSpace, currentProjects, fishMail } from '@/content/currentProjects';
import { MONO, TG_MUTED, ad, pp } from '@/components/aurora/chrome';

type StatusProject = {
  id: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  detail: string;
  image?: { src: string; alt: string };
  link?: { label: string; href: string };
};

export function PlayableProjects() {
  return (
    <ProjectSection
      id="play-and-explore"
      title="Play & explore"
      projects={[
        {
          ...brineSpace,
          category: 'Underwater survival',
          status: 'Playable preview',
          link: { label: 'Play BrineSpace', href: brineSpace.url },
        },
        fishMail,
      ]}
    />
  );
}

export default function CurrentProjects({ includeFishMail = true }: { includeFishMail?: boolean }) {
  return (
    <ProjectSection
      id="current-projects"
      title="Prototypes & handoffs"
      eyebrow="PROJECT STATUS · REVIEWED NOVEMBER 7, 2026"
      description="The current state of experiments and work handed off to collaborators."
      projects={includeFishMail ? currentProjects : currentProjects.filter(project => project.id !== fishMail.id)}
    />
  );
}

function ProjectSection({ id, title, eyebrow, description, projects }: {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  projects: readonly StatusProject[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && section?.contains(target)) {
      // React replaces prerendered targets after the browser resolves the fragment.
      target.focus({ preventScroll: true });
      target.scrollIntoView();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      tabIndex={-1}
      style={pp.section}
    >
      {eyebrow && <p style={{ fontFamily: MONO, color: TG_MUTED, fontSize: 12 }}>{eyebrow}</p>}
      <h2 id={`${id}-heading`} style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: '12px 0' }}>{title}</h2>
      {description && <p style={{ color: TG_MUTED, lineHeight: 1.6, maxWidth: 720 }}>{description}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, marginTop: description ? 28 : 16 }}>
        {projects.map(project => (
          <article
            key={project.id}
            id={project.id}
            aria-labelledby={`${project.id}-heading`}
            tabIndex={-1}
            style={{ ...pp.projectCard, padding: 26 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, color: TG_MUTED }}>
              <span>{project.category}</span>
              <span style={{ color: 'hsl(36 70% 75%)' }}>{project.status}</span>
            </div>
            {project.image && (
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 12, marginTop: 16 }}
              />
            )}
            <h3 id={`${project.id}-heading`} style={{ ...pp.projectName, marginTop: 20 }}>{project.name}</h3>
            <p style={pp.projectBlurb}>{project.summary}</p>
            <p style={{ color: TG_MUTED, lineHeight: 1.6, fontSize: 14, paddingBottom: project.link ? 16 : 0 }}>{project.detail}</p>
            {project.link && (
              <a
                href={project.link.href}
                style={{ ...ad.btnGhost, alignSelf: 'flex-start', marginTop: 'auto' }}
              >
                {project.link.label} <span aria-hidden="true">{project.link.href.startsWith('/') ? '→' : '↗'}</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
