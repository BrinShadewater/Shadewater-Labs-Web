import { currentProjects } from '@/content/currentProjects';
import { MONO, TG_MUTED, pp } from '@/components/aurora/chrome';

export default function CurrentProjects() {
  return (
    <section aria-labelledby="current-projects-heading" style={pp.section}>
      <p style={{ fontFamily: MONO, color: TG_MUTED, fontSize: 12 }}>PROJECT STATUS · REVIEWED NOVEMBER 6, 2026</p>
      <h2 id="current-projects-heading" style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: '12px 0' }}>On the bench, out in the world.</h2>
      <p style={{ color: TG_MUTED, lineHeight: 1.6, maxWidth: 720 }}>Playable builds, development handoffs, and experiments at different stages. Each label describes what exists today.</p>
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
            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ ...pp.projectLink, color: 'hsl(186 90% 68%)', padding: '10px 0' }}>{project.linkLabel} ↗</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
