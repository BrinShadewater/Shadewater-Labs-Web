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
      active="toolkit"
      onNavigate={onNavigate}
      sectionLabel="Toolkit"
      eyebrow="WHAT WE ACTUALLY USE"
      title="The toolkit."
      lede="Third-party tools that survived contact with real work here. The bar is used on something that shipped, not looks interesting — and where a tool has a limitation worth knowing, it says so."
    >
      <section style={pp.section}>
        <style>{`
          .toolkit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
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
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: '0.28em',
                    color: `hsl(${accent})`,
                  }}
                >
                  {cat.toUpperCase()}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: 1,
                    background: `hsl(${accent} / 0.28)`,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="toolkit-grid">
                {tools
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <article
                      key={t.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px 22px',
                        borderRadius: 18,
                        background: 'hsl(200 30% 8% / 0.72)',
                        border: `1px solid hsl(${accent} / 0.22)`,
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>
                        {t.name}
                      </h3>
                      <p
                        style={{
                          margin: '10px 0 0',
                          color: 'hsl(45 18% 82%)',
                          fontSize: 14.5,
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
