import { AuroraPage, MONO, TG_DIM, pp } from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface NotFoundProps {
  onNavigate: AuroraNavigate;
}

/**
 * Until 2026-07-31 an unknown path silently rendered the homepage, which reads to a
 * visitor as "the link worked" and to a crawler as duplicate content on every bad URL.
 * Retired routes are redirected at the edge in vercel.json; this catches everything else.
 */
export default function NotFound({ onNavigate }: NotFoundProps) {
  const routes: Array<{ page: string; label: string; blurb: string }> = [
    { page: 'projects', label: 'Projects', blurb: 'Open-source tools, each linking to its repository.' },
    { page: 'websites', label: 'Websites', blurb: 'The web properties built and maintained here.' },
    { page: 'toolkit', label: 'Toolkit', blurb: 'Third-party tools actually used here.' },
    { page: 'about', label: 'About', blurb: 'The person behind the lab.' },
  ];

  return (
    <AuroraPage
      active=""
      onNavigate={onNavigate}
      sectionLabel="404"
      eyebrow="NO SIGNAL"
      title="This page isn’t here."
      lede="The address didn’t match anything on the site. It may have moved, or it may never have existed — either way, here is everything that does."
    >
      <section style={pp.section}>
        <p style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.18em', color: TG_DIM, margin: '0 0 20px' }}>
          requested · {typeof window !== 'undefined' ? window.location.pathname : ''}
        </p>

        <div style={{ display: 'grid', gap: 12 }}>
          {routes.map((r) => (
            <a
              key={r.page}
              href={'/' + r.page}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(r.page);
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
                padding: '18px 22px',
                borderRadius: 14,
                textDecoration: 'none',
                background: 'hsl(200 30% 7% / 0.7)',
                border: '1px solid hsl(186 50% 40% / 0.25)',
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{r.label}</span>
              <span style={{ color: 'hsl(45 18% 82%)', fontSize: 14.5, flex: '1 1 240px' }}>{r.blurb}</span>
              <span style={{ color: 'hsl(186 90% 60%)', fontWeight: 600, fontSize: 14, marginLeft: 'auto' }}>
                Open <span style={{ marginLeft: 4 }}>↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </AuroraPage>
  );
}
