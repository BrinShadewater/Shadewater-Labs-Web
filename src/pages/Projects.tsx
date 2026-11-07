import CurrentProjects from '@/components/CurrentProjects';
import { useLayoutEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { openSourceReleases, thumbSrcSet } from '@/content/openSource';
import { buildProjectHref } from '@/lib/routes';
import {
  AuroraPage,
  MONO,
  TG_DIM,
  TG_MUTED,
  ad,
  adTone,
  pp,
} from '@/components/aurora/chrome';
import type { AdToneKey, AuroraNavigate } from '@/components/aurora/chrome';

interface ProjectsProps {
  onNavigate: AuroraNavigate;
}

interface ProjectCard {
  slug: string;
  /** Internal route, for products with a page on this site. */
  page?: string;
  /** External destination, for open-source releases whose artifact is the repo. */
  externalUrl?: string;
  name: string;
  stage: string;
  summary: string;
  /** Only for projects tracked in projects.ts. A repo has no meaningful percentage. */
  progress?: number;
  /** Shown in place of the progress bar. Facts about the release, never counters. */
  meta?: string[];
  accent: string;
  glyph?: string;
  logo?: { src: string; srcSet?: string };
  thumbnail?: { src: string; srcSet: string };
  status: string;
  tone: AdToneKey;
  categories: string[];
}

export default function Projects({ onNavigate }: ProjectsProps) {

  const [activeFilter, setActiveFilter] = useState('all');
  const [linkedSlug, setLinkedSlug] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<{ slug: string; manualUrl?: string } | null>(null);

  useLayoutEffect(() => {
    const followFragment = () => {
      const slug = window.location.hash.slice(1);
      const release = openSourceReleases.find((item) => item.id === slug);
      setLinkedSlug(release?.id ?? null);
      if (release) {
        setActiveFilter((filter) => release.categories.includes(filter) ? filter : 'all');
      }
    };

    followFragment();
    window.addEventListener('hashchange', followFragment);
    return () => window.removeEventListener('hashchange', followFragment);
  }, []);

  useLayoutEffect(() => {
    if (!linkedSlug) return;
    const card = document.getElementById(linkedSlug);
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: 'start' });
  }, [linkedSlug]);

  const copyProjectLink = async (slug: string) => {
    const url = new URL(buildProjectHref(slug), window.location.origin);
    try {
      await navigator.clipboard.writeText(url.href);
      setShareFeedback({ slug });
    } catch {
      setShareFeedback({ slug, manualUrl: url.href });
    }
  };

  const cards: ProjectCard[] = [
    ...openSourceReleases.map((r): ProjectCard => ({
      slug: r.id,
      externalUrl: r.url,
      name: r.name,
      stage: 'OPEN SOURCE',
      summary: r.summary,
      meta: [`${r.licence} licence`, r.language, r.repo],
      accent: r.accent,
      thumbnail: r.thumb ? { src: `/${r.thumb}.webp`, srcSet: thumbSrcSet(r.thumb) } : undefined,
      glyph: r.glyph,
      status: 'RELEASED',
      tone: 'green',
      categories: r.categories,
    })),
  ];

  // Only offer a filter that returns something; a control that always shows
  // "no results" is worse than no control.
  const filters = ['all', ...Array.from(new Set(cards.flatMap((c) => c.categories))).sort()];

  const visibleCards =
    activeFilter === 'all' ? cards : cards.filter((p) => p.categories.includes(activeFilter));

  const SHIPPED = ['SHIPPING', 'OPERATIONAL', 'RELEASED'];
  const shippingCount = visibleCards.filter((p) => SHIPPED.includes(p.status)).length;
  const betaCount = visibleCards.length - shippingCount;

  const handleCardNav = (page: string) => (e: MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  /**
   * Wraps card content in the right anchor: an internal route, an external repo, or
   * nothing at all. Keeps every clickable card element a real link rather than a
   * click handler on a div — the cards are navigation.
   */
  const linkWrap = (
    p: ProjectCard,
    children: ReactNode,
    extraStyle?: CSSProperties,
    ariaLabel?: string,
  ) => {
    if (p.page) {
      return (
        <a
          href={'/' + p.page}
          onClick={handleCardNav(p.page)}
          style={{ textDecoration: 'none', ...extraStyle }}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    if (p.externalUrl) {
      return (
        <a
          href={p.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', ...extraStyle }}
          aria-label={ariaLabel ? ariaLabel + ' on GitHub' : undefined}
        >
          {children}
        </a>
      );
    }
    return children;
  };

  const artInner = (p: ProjectCard) =>
    p.thumbnail ? (
      <img
        src={p.thumbnail.src}
        srcSet={p.thumbnail.srcSet}
        // The 180px-tall cover crop needs a 320px-wide 16:9 source even in narrow slots.
        sizes="(min-width: 1024px) 320px, (min-width: 640px) max(320px, calc((100vw - 186px) / 2)), max(320px, calc(100vw - 116px))"
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
      />
    ) : p.logo ? (
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
      title="Tools, in the open."
      lede="Open-source tools built for the work here, then published. Each release links to its repository."
    >
      <section style={pp.section}>
        <style>{`
          .pp-projectsGrid { grid-template-columns: minmax(0, 1fr); }
          .pp-releaseCard:focus-visible, .pp-releaseCard:target {
            outline: 2px solid hsl(186 80% 65%);
            outline-offset: 3px;
          }
          [data-prerender-route] .pp-copyProjectLink { display: none; }
          @media (min-width: 640px) {
            .pp-projectsGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (min-width: 1024px) {
            .pp-projectsGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          @media (max-width: 768px) {
            .pp-toolbar { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          }
        `}</style>
        <a href="#current-projects" style={{ ...ad.btnGhost, marginBottom: 20 }}>
          See prototypes and handoffs <span aria-hidden="true">↓</span>
        </a>
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

        <p className="sr-only" role="status">
          {shareFeedback && (shareFeedback.manualUrl
            ? 'Automatic copying is unavailable. The project URL is ready to select.'
            : 'Project link copied.')}
        </p>
        <div style={pp.projectsGrid} className="pp-projectsGrid">
          {visibleCards.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              tabIndex={-1}
              aria-labelledby={`${p.slug}-title`}
              className="pp-releaseCard"
              style={pp.projectCard}
            >
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

              {linkWrap(
                p,
                <div
                  style={{
                    ...pp.projectArt,
                    boxShadow:
                      '0 18px 50px hsl(' +
                      p.accent +
                      ' / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                    ...(p.page || p.externalUrl ? { cursor: 'pointer' } : null),
                  }}
                >
                  {artInner(p)}
                </div>,
                { display: 'block' },
                'Open ' + p.name,
              )}

              {linkWrap(
                p,
                <h3
                  id={`${p.slug}-title`}
                  style={{
                    ...pp.projectName,
                    ...(p.page || p.externalUrl ? { cursor: 'pointer' } : null),
                  }}
                >
                  {p.name}
                </h3>,
              )}

              <p style={pp.projectBlurb}>{p.summary}</p>

              {typeof p.progress === 'number' ? (
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
              ) : p.meta ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                  {p.meta.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontFamily: MONO,
                        fontSize: 10.5,
                        letterSpacing: '0.12em',
                        color: TG_DIM,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: 'hsl(200 30% 6% / 0.65)',
                        border: '1px solid hsl(' + p.accent + ' / 0.25)',
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              ) : null}

              <div style={pp.projectFoot}>
                <button
                  type="button"
                  className="pp-copyProjectLink"
                  aria-label={`Copy link to ${p.name}`}
                  onClick={() => void copyProjectLink(p.slug)}
                  style={{ color: TG_MUTED, fontSize: 14, cursor: 'pointer', minHeight: 32 }}
                >
                  Copy link {shareFeedback?.slug === p.slug && !shareFeedback.manualUrl && <span aria-hidden="true">✓</span>}
                </button>
                {p.page ? (
                  <a
                    href={'/' + p.page}
                    onClick={handleCardNav(p.page)}
                    style={{ ...pp.projectLink, color: 'hsl(' + p.accent + ')' }}
                  >
                    Open project <span style={{ marginLeft: 4 }}>↗</span>
                  </a>
                ) : p.externalUrl ? (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...pp.projectLink, color: 'hsl(' + p.accent + ')' }}
                  >
                    View on GitHub <span style={{ marginLeft: 4 }}>↗</span>
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
              {shareFeedback?.slug === p.slug && shareFeedback.manualUrl && (
                <input
                  type="url"
                  aria-label={`Project URL for ${p.name}`}
                  readOnly
                  value={shareFeedback.manualUrl}
                  onFocus={(event) => event.currentTarget.select()}
                  style={{ position: 'relative', width: '100%', marginTop: 8, padding: 8, border: '1px solid currentColor', borderRadius: 6, fontSize: 14 }}
                />
              )}
            </article>
          ))}
        </div>
      </section>
      <CurrentProjects />
    </AuroraPage>
  );
}
