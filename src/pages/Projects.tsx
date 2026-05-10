import { type CSSProperties } from 'react';
import { projectStatuses } from '@/content/projects';
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
  sig: string;
  status: string;
  tone: AdToneKey;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const seo = projectStatuses['shadewater-seo-report'];
  const webp = projectStatuses['webp-me-daddy'];
  const ink = projectStatuses['inkmaster-studio'];

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
      glyph: 'SR',
      sig: '7af2',
      status: 'OPERATIONAL',
      tone: 'green',
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
      sig: '19c4',
      status: 'SHIPPING',
      tone: 'cyan',
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
      sig: 'b83e',
      status: 'CLOSED BETA',
      tone: 'amber',
    },
    {
      slug: 'lab-bench-04',
      name: 'Bench · L-04',
      stage: 'QUEUED · DRAFT',
      summary:
        'Sketch for a small AI tool — surface area still being defined. Will graduate when it earns a name.',
      progress: 14,
      accent: '150 65% 55%',
      glyph: '◇',
      sig: '0a11',
      status: 'QUEUED',
      tone: 'green',
    },
    {
      slug: 'lab-bench-05',
      name: 'Bench · L-05',
      stage: 'SPIKE · WEB UTIL',
      summary:
        'A small web utility experiment. Currently a one-pager prototype that may or may not grow.',
      progress: 22,
      accent: '210 85% 65%',
      glyph: '◇',
      sig: '0c33',
      status: 'SPIKE',
      tone: 'blue',
    },
    {
      slug: 'lab-bench-06',
      name: 'Bench · L-06',
      stage: 'OBSERVING · NOTES',
      summary:
        'Reading-only — collecting evidence on a problem before deciding whether to build for it.',
      progress: 8,
      accent: '36 85% 62%',
      glyph: '◇',
      sig: '0e77',
      status: 'OBSERVING',
      tone: 'amber',
    },
  ];

  const filters = ['all', 'ai_tools', 'web', 'pipelines', 'spikes'];

  return (
    <AuroraPage
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="Projects"
      eyebrow="§ 02 · CATALOG"
      title="The active project catalog."
      lede="Working tools, product experiments, creative-tech builds, and operator workflows. Each card is a real ship — even the queued ones."
    >
      <section style={pp.section}>
        <div style={pp.toolbar}>
          <div style={pp.toolbarMono}>
            <span style={pp.toolbarChip}>shipping · 2</span>
            <span style={pp.toolbarChip}>beta · 1</span>
            <span style={pp.toolbarChip}>queued · 3</span>
          </div>
          <div style={pp.toolbarFilters}>
            {filters.map((f, i) => (
              <span key={f} style={{ ...pp.filterPill, ...(i === 0 ? pp.filterActive : null) }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div style={pp.projectsGrid}>
          {cards.map((p) => (
            <article key={p.slug} style={pp.projectCard}>
              <div
                style={{
                  ...pp.projectGlow,
                  background: `radial-gradient(85% 70% at 50% 0%, hsl(${p.accent} / 0.32), transparent 65%)`,
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

              <div
                style={{
                  ...pp.projectArt,
                  boxShadow: `0 18px 50px hsl(${p.accent} / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)`,
                }}
              >
                {p.logo ? (
                  <img src={p.logo.src} srcSet={p.logo.srcSet} sizes="(min-width: 1024px) 13rem, 38vw" alt="" loading="lazy" decoding="async" style={pp.projectLogo} />
                ) : (
                  <div
                    style={{
                      ...pp.projectGlyph,
                      background: `conic-gradient(from 220deg at 50% 50%, hsl(${p.accent}), hsl(${p.accent} / 0.35), hsl(${p.accent}))`,
                    }}
                  >
                    <span>{p.glyph}</span>
                  </div>
                )}
              </div>

              <h3 style={pp.projectName}>{p.name}</h3>
              <p style={pp.projectBlurb}>{p.summary}</p>

              <div style={pp.progressRow}>
                <div style={pp.progressTrack}>
                  <div
                    style={{
                      ...pp.progressFill,
                      width: `${p.progress}%`,
                      background: `linear-gradient(90deg, hsl(${p.accent}), hsl(${p.accent} / 0.7))`,
                      boxShadow: `0 0 16px hsl(${p.accent} / 0.5)`,
                    }}
                  />
                </div>
                <span style={pp.progressVal}>{p.progress}%</span>
              </div>

              <div style={pp.projectFoot}>
                <span style={pp.projectSig}>sig · {p.sig}</span>
                {p.page ? (
                  <a
                    href={`/${p.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(p.page as string);
                    }}
                    style={{ ...pp.projectLink, color: `hsl(${p.accent})` }}
                  >
                    Open project <span style={{ marginLeft: 4 }}>↗</span>
                  </a>
                ) : (
                  <span style={{ ...pp.projectLink, color: TG_DIM, fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em' }}>
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

void ({} as CSSProperties);
