import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { fishMail, futureproofCompanion } from '@/content/currentProjects';
import { buildPath } from '@/lib/routes';

const features = [
  {
    project: futureproofCompanion,
    title: 'Planning a day at the festival',
    copy: 'Attendees could browse the programme by day, search for sessions, and look up speakers. The My Plan view collected saved sessions into a personal schedule.',
    caption: 'The dark-mode programme with search, day tabs, and My Plan.',
  },
  {
    project: fishMail,
    title: 'Sending a note through the aquarium',
    copy: 'Signed-in attendees chose a fish, found another attendee, and sent a private note. The fish carried the note across the aquarium before it appeared in the recipient’s inbox. The Shadewater Labs demo lets visitors join with a nickname and try the same interaction.',
    caption: 'The aquarium in the public FishMail demo.',
  },
] as const;

export default function Futureproof({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <AuroraPage
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="Futureproof"
      eyebrow="CASE STUDY · VANCOUVER · OCTOBER 28–30, 2026"
      title="Futureproof Festival Companion & FishMail"
      lede="A festival companion for planning what to see and a shared aquarium for sending notes to other attendees."
    >
      <article style={{ ...pp.section, maxWidth: 960 }}>
        {features.map(({ project, title, copy, caption }, index) => (
          <section key={project.id} aria-labelledby={`${project.id}-feature`} style={{ marginBottom: 40 }}>
            <h2 id={`${project.id}-feature`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff' }}>
              {title}
            </h2>
            <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>{copy}</p>
            <figure style={{ margin: '20px 0 14px' }}>
              <img
                src={project.image.src}
                alt={project.image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'contain', borderRadius: 12, background: 'hsl(205 35% 8%)' }}
              />
              <figcaption style={{ color: TG_MUTED, fontSize: 14, marginTop: 8 }}>{caption}</figcaption>
            </figure>
            <a href={project.link.href} style={ad.btnGhost}>
              {project.link.label} <span aria-hidden="true">{index === 0 ? '↗' : '→'}</span>
            </a>
          </section>
        ))}
        <a href={buildPath('projects')} style={{ color: TG_MUTED, textUnderlineOffset: 3 }}>
          <span aria-hidden="true">← </span>Back to Projects
        </a>
      </article>
    </AuroraPage>
  );
}
