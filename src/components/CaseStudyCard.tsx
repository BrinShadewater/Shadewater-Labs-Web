import { ad, pp } from '@/components/aurora/chrome';
import { buildPath, buildProjectHref, CASE_STUDIES_SECTION_ID } from '@/lib/routes';

type CaseStudy = {
  page: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
};

export function CaseStudyCard({ study, clickAction }: { study: CaseStudy; clickAction?: string }) {
  const { page, title, description, image } = study;
  const headingId = `${page}-case-heading`;

  return (
    <article aria-labelledby={headingId} style={{ ...pp.projectCard, padding: 26 }}>
      <img {...image} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'contain', borderRadius: 12, background: '#0a1e29' }} />
      <h3 id={headingId} style={{ ...pp.projectName, marginTop: 20 }}>{title}</h3>
      <p style={{ ...pp.projectBlurb, paddingBottom: 16 }}>{description}</p>
      <a href={buildPath(page)} data-project-click={clickAction} aria-label={`Read the case study – ${title}`} style={{ ...ad.btnGhost, alignSelf: 'flex-start', marginTop: 'auto' }}>
        Read the case study <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export function MoreFromLab({ study }: { study: CaseStudy }) {
  return (
    <section aria-labelledby="more-from-the-lab" style={{ ...pp.section, maxWidth: 960 }}>
      <h2 id="more-from-the-lab" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>More from the lab</h2>
      <div style={{ maxWidth: 548 }}>
        <CaseStudyCard study={study} />
      </div>
      <a href={buildProjectHref(CASE_STUDIES_SECTION_ID)} style={{ ...pp.projectLink, marginTop: 16, gap: 5, textDecoration: 'underline', textUnderlineOffset: 3 }}>
        Browse all case studies <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
