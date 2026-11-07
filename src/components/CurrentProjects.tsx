import { useEffect, useRef } from 'react';
import { currentProjects } from '@/content/currentProjects';
import { MONO, TG_MUTED, pp } from '@/components/aurora/chrome';

export default function CurrentProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && window.location.hash === '#' + section.id) {
      // React replaces the prerendered section after the browser resolves the fragment.
      section.focus({ preventScroll: true });
      section.scrollIntoView();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="current-projects"
      aria-labelledby="current-projects-heading"
      tabIndex={-1}
      style={pp.section}
    >
      <p style={{ fontFamily: MONO, color: TG_MUTED, fontSize: 12 }}>PROJECT STATUS · REVIEWED NOVEMBER 6, 2026</p>
      <h2 id="current-projects-heading" style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: '12px 0' }}>Prototypes &amp; handoffs</h2>
      <p style={{ color: TG_MUTED, lineHeight: 1.6, maxWidth: 720 }}>The current state of experiments and work handed off to collaborators.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, marginTop: 28 }}>
        {currentProjects.map(project => (
          <article key={project.id} style={{ ...pp.projectCard, padding: 26 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, color: TG_MUTED }}>
              <span>{project.category}</span>
              <span style={{ color: 'hsl(36 70% 75%)' }}>{project.status}</span>
            </div>
            <h3 style={{ ...pp.projectName, marginTop: 20 }}>{project.name}</h3>
            <p style={pp.projectBlurb}>{project.summary}</p>
            <p style={{ color: TG_MUTED, lineHeight: 1.6, fontSize: 14 }}>{project.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
