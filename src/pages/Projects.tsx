import { useState, type MouseEvent } from 'react';
import { projectStatuses } from '@/content/projects';
import {
  SHADEWATER_LABS_MARK_CROPPED_SRC,
} from '@/lib/brandAssets';
import {
  AuroraPage,
  MONO,
  TG_DIM,
  adTone,
  pp,
} from '@/components/aurora/chrome';
import type { AdToneKey, AuroraNavigate } from '@/components/aurora/chrome';

interface ProjectsProps {
  onNavigate: AuroraNavigate;
}

type FilterKey = 'all' | 'ai_tools' | 'web' | 'pipelines';

interface ProjectCard {
  slug: string;
  page?: string;
  name: string;
  stage: string;
  summary: string;
  progress: number;
  accent: string;
  glyph?: string;
  logo?: { src: string; srcSet?: string };
  status: string;
  tone: AdToneKey;
  categories: FilterKey[];
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const seo = projectStatuses['shadewater-seo-report'];
  const webp = projectStatuses['webp-me-daddy'];
  const ink = projectStatuses['inkmaster-studio'];

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const cards: ProjectCard[] = [
    {
      slug: 'shadewater-seo-report',
      page: 'shadewater-seo-report',
      name: seo.name,
      stage: 'INTERNAL OPERATOR · v0.6',
      summary:
        'Deterministic SEO audit skill that turns live site evidence into branded dashboards, action plans, and rerunnable fix loops.',
      progress: 92,
      accent: '186 90% 60%',
      logo: { src: SHADEWATER_LABS_MARK_CROPPED_SRC },
      status: 'OPERATIONAL',
      tone: 'green',
      categories: ['ai_tools', 'pipelines'],
    },
    {
      slug: 'webp-me-daddy',
      page: 'webp-me-daddy',
      name: webp.name,
      stage: 'FEATURED PIPELINE · v0.9.4',
      summary:
        'Layout-aware image pipeline. Messy assets become recipe-driven WebPs with strict metadata, proof sheets, and audits.',
      progress: 78,
      accent: '184 85% 58%',
      logo: webp.hero.logo ? { src: webp.hero.logo.src, srcSet: webp.hero.logo.srcSet } : undefined,
      status: 'SHIPPING',
      tone: 'cyan',
      categories: ['pipelines', 'web'],
    },
    {
      slug: 'inkmaster-studio',
      page: 'inkmaster-studio',
      name: ink.name,
      stage: 'BETA PRODUCT · v0.8',
      summary:
        'Browser-based print-prep for apparel graphics. Knockout cleanup, texture controls, mockups, underbase, exports.',
      progress: 64,
      accent: '219 85% 65%',
      logo: ink.hero.logo ? { src: ink.hero.logo.src, srcSet: ink.hero.logo.srcSet } : undefined,
      status: 'CLOSED BETA',
      tone: 'amber',
      categories: ['web'],
    },
  ];

  const filters: FilterKey[] = ['all', 'ai_tools', 'web', 'pipelines'];

  const visibleCards =
    activeFilter === 'all' ? cards : cards.filter((p) => p.categories.includes(activeFilter));

  const shippingCount = visibleCards.filter(
    (p) => p.status === 'SHIPPING' || p.status === 'OPERATIONAL',
  ).length;
  const betaCount = visibleCards.filter((p) => p.status === 'CLOSED BETA').length;

  const handleCardNav = (page: string) => (e: MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  const artInner = (p: ProjectCard) =>
    p.logo ? (
      <img
        src={p.logo.src}
        srcSet={p.logo.srcSet}
        sizes="(min-width: 1024px) 13rem, 38vw"
        alt=""
        loading="lazy"
        decoding="async"
        style={pp.projectLogo}
      />
    ) : (
      <div
        style={{
          ...pp.projectGlyph,
          background:
            'conic-gradient(from 220deg at 50% 50%, hsl(' +
            p.accent +
            '), hsl(' +
            p.accent +
            ' / 0.35), hsl(' +
            p.accent +
            '))',
        }}
      >
        <span>{p.glyph}</span>
      </div>
    );

  return (
    <AuroraPage
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="Projects"
      eyebrow="CATALOG"
      title="The active project catalog."
      lede="Working tools, product experiments, creative-tech builds, and operator workflows. Each card is a real ship — even the queued ones."
    >
      <section style={pp.section}>
        <style>{`
          @media (max-width: 768px) {
            .pp-projectsGrid { grid-template-columns: 1fr !important; }
            .pp-toolbar { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          }
          @media (min-width: 480px) and (max-width: 768px) {
            .pp-projectsGrid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div style={pp.toolbar} className="pp-toolbar">
          <div style={pp.toolbarMono}>
            {shippingCount > 0 && (
              <span style={pp.toolbarChip}>shipping · {shippingCount}</span>
            )}
            {betaCount > 0 && <span style={pp.toolbarChip}>beta · {betaCount}</span>}
            {shippingCount === 0 && betaCount === 0 && (
              <span style={pp.toolbarChip}>no results</span>
            )}
          </div>
          <div style={pp.toolbarFilters}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: 'none',
                  border: 'none',
                  ...pp.filterPill,
                  ...(activeFilter === f ? pp.filterActive : null),
                  userSelect: 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={pp.projectsGrid} className="pp-projectsGrid">
          {visibleCards.map((p) => (
            <article key={p.slug} style={pp.projectCard}>
              <div
                style={{
                  ...pp.projectGlow,
                  background:
                    'radial-gradient(85% 70% at 50% 0%, hsl(' +
                    p.accent +
                    ' / 0.32), transparent 65%)',
                }}
              />
              <div style={pp.projectScan} />
              <div style={pp.projectTop}>
                <span style={pp.projectStage}>{p.stage}</span>
                <span style={pp.statusPill}>
                  <span style={{ ...pp.statusDot, background: adTone[p.tone] }} />
                  <span style={{ color: adTone[p.tone] }}>{p.status}</span>
                </span>
              </div>

              {p.page ? (
                <a
                  href={'/' + p.page}
                  onClick={handleCardNav(p.page)}
                  style={{ display: 'block', textDecoration: 'none' }}
                  aria-label={'Open ' + p.name}
                >
                  <div
                    style={{
                      ...pp.projectArt,
                      boxShadow:
                        '0 18px 50px hsl(' +
                        p.accent +
                        ' / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    {artInner(p)}
                  </div>
                </a>
              ) : (
                <div
                  style={{
                    ...pp.projectArt,
                    boxShadow:
                      '0 18px 50px hsl(' +
                      p.accent +
                      ' / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                  }}
                >
                  {artInner(p)}
                </div>
              )}

              {p.page ? (
                <a
                  href={'/' + p.page}
                  onClick={handleCardNav(p.page)}
                  style={{ textDecoration: 'none' }}
                >
                  <h3 style={{ ...pp.projectName, cursor: 'pointer' }}>{p.name}</h3>
                </a>
              ) : (
                <h3 style={pp.projectName}>{p.name}</h3>
              )}

              <p style={pp.projectBlurb}>{p.summary}</p>

              <div style={pp.progressRow}>
                <div style={pp.progressTrack}>
                  <div
                    style={{
                      ...pp.progressFill,
                      width: p.progress + '%',
                      background:
                        'linear-gradient(90deg, hsl(' +
                        p.accent +
                        '), hsl(' +
                        p.accent +
                        ' / 0.7))',
                      boxShadow: '0 0 16px hsl(' + p.accent + ' / 0.5)',
                    }}
                  />
                </div>
                <span style={pp.progressVal}>{p.progress}%</span>
              </div>

              <div style={pp.projectFoot}>
                {p.page ? (
                  <a
                    href={'/' + p.page}
                    onClick={handleCardNav(p.page)}
                    style={{ ...pp.projectLink, color: 'hsl(' + p.accent + ')' }}
                  >
                    Open project <span style={{ marginLeft: 4 }}>↗</span>
                  </a>
                ) : (
                  <span
                    style={{
                      ...pp.projectLink,
                      color: TG_DIM,
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: '0.18em',
                    }}
                  >
                    no page yet
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </AuroraPage>
  );
}

