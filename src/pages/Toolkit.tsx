import { tools, type Tool } from '@/content/tools';
import { AuroraPage, MONO, TG_DIM, pp } from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface ToolkitProps {
  onNavigate: AuroraNavigate;
}

const ACCENTS: Record<Tool['category'], string> = {
  'Video & motion': '320 70% 68%',
  Image: '184 85% 58%',
  'Agents & code': '186 90% 60%',
  'Build & ship': '150 60% 58%',
};

export default function Toolkit({ onNavigate }: ToolkitProps) {
  // Render only the categories in use, so an empty group never appears.
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <AuroraPage
      theme="ocean"
      active="toolkit"
      onNavigate={onNavigate}
      sectionLabel="Toolkit"
      eyebrow="WHAT WE ACTUALLY USE"
      title="The toolkit."
      lede="Third-party tools we use for code, design, and production, with examples of where they fit and what to watch for."
    >
      <section style={pp.section}>
        <style>{`
          @media (max-width: 760px) { .toolkit-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {categories.map((cat) => {
          const accent = ACCENTS[cat];
          return (
            <div key={cat} style={{ marginBottom: 34 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <h2
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: `hsl(${accent})`,
                  }}
                >
                  {cat.toUpperCase()}
                </h2>
                <span
                  style={{
                    flex: 1,
                    height: 1,
                    background: 'var(--ocean-border)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--ad-grid-gap)' }} className="toolkit-grid">
                {tools
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <article
                      key={t.id}
                      style={{
                        ...pp.projectCard,
                        border: 'var(--ad-card-border)',
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>
                        {t.name}
                      </h3>
                      <p
                        style={{
                          margin: '10px 0 0',
                          color: 'var(--ad-copy)',
                          fontSize: 15,
                          lineHeight: 1.6,
                        }}
                      >
                        {t.use}
                      </p>
                      {t.caveat ? (
                        <p
                          style={{
                            margin: '12px 0 0',
                            paddingTop: 12,
                            borderTop: '1px solid hsl(36 50% 40% / 0.28)',
                            color: 'hsl(36 45% 76%)',
                            fontSize: 13.5,
                            lineHeight: 1.55,
                          }}
                        >
                          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.2em' }}>
                            CAVEAT{' '}
                          </span>
                          {t.caveat}
                        </p>
                      ) : null}
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginTop: 'auto',
                          paddingTop: 16,
                          display: 'inline-flex',
                          alignItems: 'center',
                          marginLeft: 'auto',
                          color: `hsl(${accent})`,
                          fontWeight: 600,
                          fontSize: 14,
                          textDecoration: 'none',
                        }}
                      >
                        Visit <span style={{ marginLeft: 4 }}>{'↗'}</span>
                      </a>
                    </article>
                  ))}
              </div>
            </div>
          );
        })}

        <p
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: '0.1em',
            color: TG_DIM,
            lineHeight: 1.7,
            margin: '8px 0 0',
            maxWidth: 720,
          }}
        >
          No affiliate links, no sponsorships. If a tool stops being used it comes off this
          list rather than staying here for the traffic.
        </p>
      </section>
    </AuroraPage>
  );
}
