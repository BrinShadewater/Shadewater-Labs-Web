import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { MoreFromLab } from '@/components/CaseStudyCard';
import { brineSpaceAssetCase, fishMail, futureproofCase, futureproofCompanion } from '@/content/currentProjects';

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
      layout="article"
      onNavigate={onNavigate}
      sectionLabel="Futureproof"
      eyebrow="CASE STUDY · VANCOUVER · OCTOBER 28–30, 2026"
      title={futureproofCase.title}
      lede="A festival companion for planning what to see and a shared aquarium for sending notes to other attendees."
    >
      <article style={pp.section}>
        {features.map(({ project, title, copy, caption }, index) => (
          <section key={project.id} aria-labelledby={`${project.id}-feature`} style={{ marginBottom: 'var(--ad-section-space)' }}>
            <h2 id={`${project.id}-feature`} style={pp.sectionTitle}>
              {title}
            </h2>
            <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>{copy}</p>
            <figure style={{ margin: '20px 0 14px' }}>
              <img
                src={project.image.src}
                alt={project.image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ ...pp.figureImage, aspectRatio: '16 / 9', objectFit: 'contain' }}
              />
              <figcaption style={{ color: TG_MUTED, fontSize: 14, marginTop: 8 }}>{caption}</figcaption>
            </figure>
            <a
              href={project.link.href}
              data-project-click={'clickAction' in project.link ? project.link.clickAction : undefined}
              style={ad.btnGhost}
            >
              {project.link.label} <span aria-hidden="true">{index === 0 ? '↗' : '→'}</span>
            </a>
          </section>
        ))}
      </article>
      <MoreFromLab study={brineSpaceAssetCase} />
    </AuroraPage>
  );
}
