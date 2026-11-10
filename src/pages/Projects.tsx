import CurrentProjects, { PlayableProjects } from '@/components/CurrentProjects';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { brineSpaceAssetCase, futureproofCase } from '@/content/currentProjects';
import { seoAuditExample } from '@/content/seoAuditExample';
import { openSourceReleases, thumbSrcSet } from '@/content/openSource';
import { webpExample } from '@/content/webpExample';
import { buildPath, buildProjectHref, CASE_STUDIES_SECTION_ID, OPEN_SOURCE_SECTION_ID } from '@/lib/routes';
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

const jumpLinkStyle = { ...ad.btnGhost, padding: '9px 13px', fontSize: 14 };
const filters = ['all', ...Array.from(new Set(openSourceReleases.flatMap((release) => release.categories))).sort()];
const toolTasks = [
  { label: 'Optimize website images', slug: 'webp-me-daddy-skill' },
  { label: 'Build and check game assets', slug: 'game-asset-pipeline' },
  { label: 'Audit a website’s SEO', slug: 'shadewater-seo-skill' },
];

function applyCategory(url: URL, filter: string) {
  if (filter === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', filter);
  url.hash = OPEN_SOURCE_SECTION_ID;
  return url;
}

interface ProjectCard {
  slug: string;
  /** Internal route, for products with a page on this site. */
  page?: string;
  /** External destination, for open-source releases whose artifact is the repo. */
  externalUrl?: string;
  guide?: { label: string; href: string };
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
  thumbnail?: { src: string; srcSet: string; alt?: string };
  status: string;
  tone: AdToneKey;
  categories: string[];
}

export default function Projects({ onNavigate }: ProjectsProps) {

  const [activeFilter, setActiveFilter] = useState('all');
  const [linkedSlug, setLinkedSlug] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<{
    key: string;
    manualUrl?: string;
    trigger?: HTMLButtonElement;
  } | null>(null);
  const manualCopyInput = useRef<HTMLInputElement>(null);
  const copyRequestId = useRef(0);

  useLayoutEffect(() => {
    const followLocation = () => {
      const slug = window.location.hash.slice(1);
      const release = openSourceReleases.find((item) => item.id === slug);
      const category = new URLSearchParams(window.location.search).get('category');
      const filter = category && filters.includes(category) ? category : 'all';
      // An exact card link takes precedence over a filter that would hide it.
      setActiveFilter(release && !release.categories.includes(filter) ? 'all' : filter);
      setLinkedSlug(release?.id ?? null);
      if (slug === OPEN_SOURCE_SECTION_ID || slug === CASE_STUDIES_SECTION_ID) {
        // Restore the target after React replaces the prerendered section.
        const section = document.getElementById(slug);
        section?.focus({ preventScroll: true });
        section?.scrollIntoView({ block: 'start' });
      }
    };

    followLocation();
    window.addEventListener('popstate', followLocation);
    window.addEventListener('hashchange', followLocation);
    return () => {
      window.removeEventListener('popstate', followLocation);
      window.removeEventListener('hashchange', followLocation);
    };
  }, []);

  useLayoutEffect(() => {
    if (!linkedSlug) return;
    const card = document.getElementById(linkedSlug);
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: 'start' });
  }, [linkedSlug]);

  useLayoutEffect(() => {
    if (shareFeedback?.manualUrl && document.activeElement === shareFeedback.trigger) {
      manualCopyInput.current?.focus();
    }
  }, [shareFeedback]);

  const copyLink = async (key: string, url: URL, trigger: HTMLButtonElement) => {
    const requestId = ++copyRequestId.current;
    try {
      await navigator.clipboard.writeText(url.href);
      if (requestId === copyRequestId.current) setShareFeedback({ key });
    } catch {
      if (requestId === copyRequestId.current) setShareFeedback({ key, manualUrl: url.href, trigger });
    }
  };

  const manualCopy = (url: string, helpId: string, label: string) => (
    <div style={{ position: 'relative', marginTop: 8, width: '100%' }}>
      <p id={helpId} style={{ color: TG_MUTED, fontSize: 13, marginBottom: 6 }}>
        Automatic copying is unavailable. Select the link and use your device’s Copy command.
      </p>
      <input
        ref={manualCopyInput}
        type="url"
        aria-label={label}
        aria-describedby={helpId}
        readOnly
        value={url}
        onFocus={(event) => event.currentTarget.select()}
        style={{ width: '100%', padding: 8, border: '1px solid currentColor', borderRadius: 6, fontSize: 14 }}
      />
    </div>
  );

  const cards: ProjectCard[] = [
    ...openSourceReleases.map((r): ProjectCard => ({
      slug: r.id,
      externalUrl: r.url,
      guide: r.guide,
      name: r.name,
      stage: 'OPEN SOURCE',
      summary: r.summary,
      meta: [`${r.licence} licence`, r.language, r.repo],
      accent: r.accent,
      thumbnail: r.thumb ? { src: `/${r.thumb}.webp`, srcSet: thumbSrcSet(r.thumb), alt: r.thumbAlt } : undefined,
      glyph: r.glyph,
      status: 'RELEASED',
      tone: 'green',
      categories: r.categories,
    })),
  ];

  const selectFilter = (filter: string) => {
    if (filter === activeFilter) return;
    const url = applyCategory(new URL(window.location.href), filter);
    window.history.pushState({}, '', url);
    setActiveFilter(filter);
    setLinkedSlug(null);
  };

  const visibleCards =
    activeFilter === 'all' ? cards : cards.filter((p) => p.categories.includes(activeFilter));

  const resultCount = visibleCards.length;
  const filterLabel = activeFilter === 'seo' ? 'SEO' : activeFilter;
  const viewCopyKey = `view:${activeFilter}`;
  const viewCopied = shareFeedback?.key === viewCopyKey && !shareFeedback.manualUrl;

  const copyViewLink = (trigger: HTMLButtonElement) => {
    const url = applyCategory(new URL(buildPath('projects'), window.location.origin), activeFilter);
    void copyLink(viewCopyKey, url, trigger);
  };

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
        alt={p.thumbnail.alt ?? ''}
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
      title="Projects from the lab."
      lede="Play a demo, read a case study, browse open-source tools, or explore prototypes and handoffs."
    >
      <nav aria-label="On this page" style={{ ...pp.section, paddingTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <a href="#play-and-explore" style={jumpLinkStyle}>Play &amp; explore</a>
        <a href={`#${CASE_STUDIES_SECTION_ID}`} style={jumpLinkStyle}>Case studies &amp; examples</a>
        <a href={`#${OPEN_SOURCE_SECTION_ID}`} style={jumpLinkStyle}>Open-source tools</a>
        <a href="#current-projects" style={jumpLinkStyle}>Prototypes &amp; handoffs</a>
      </nav>
      <PlayableProjects />
      <section id={CASE_STUDIES_SECTION_ID} tabIndex={-1} style={pp.section} aria-labelledby="case-studies-heading">
        <h2 id="case-studies-heading" style={pp.sectionTitle}>Case studies &amp; examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 390px), 1fr))', gap: 'var(--ad-grid-gap)', marginTop: 16 }}>
          <CaseStudyCard study={brineSpaceAssetCase} />
          <CaseStudyCard study={futureproofCase} clickAction="read-case-study" />
          <CaseStudyCard
            study={{ page: 'webp-example', title: 'Webp Me Daddy', description: webpExample.description, image: webpExample.preview }}
            linkLabel="See the example"
          />
          <CaseStudyCard study={seoAuditExample} linkLabel="See a sample audit" />
        </div>
      </section>
      <section id={OPEN_SOURCE_SECTION_ID} tabIndex={-1} style={pp.section} aria-labelledby="open-source-heading">
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
            .pp-toolbar { flex-direction: column !important; align-items: flex-start !important; }
          }
        `}</style>
        <h2 id="open-source-heading" style={pp.sectionTitle}>Open-source tools</h2>
        <nav aria-labelledby="tool-tasks-heading" style={{ margin: '0 0 16px' }}>
          <h3 id="tool-tasks-heading" style={{ color: 'var(--ad-copy)', fontSize: 16, fontWeight: 650, marginBottom: 8 }}>
            Choose a tool by task
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {toolTasks.map(({ label, slug }) => (
              <a key={slug} href={`#${slug}`} style={{ ...jumpLinkStyle, minHeight: 44 }}>
                {label} <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </nav>
        <div style={pp.toolbar} className="pp-toolbar">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px' }}>
            <p role="status" aria-atomic="true" style={{ ...pp.toolbarChip, margin: 0 }}>
              {resultCount} {resultCount === 1 ? 'tool' : 'tools'} shown
              <span className="sr-only">
                {activeFilter === 'all' ? ' across all categories.' : ` for ${filterLabel}.`}
              </span>
            </p>
            <button
              type="button"
              className="pp-copyProjectLink"
              onClick={(event) => copyViewLink(event.currentTarget)}
              style={{ ...pp.filterPill, fontWeight: 500 }}
            >
              {viewCopied ? 'Link copied' : 'Copy this view'}
            </button>
          </div>
          <div role="group" aria-label="Filter open-source tools" style={pp.toolbarFilters}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={activeFilter === f}
                aria-controls="open-source-results"
                onClick={() => selectFilter(f)}
                style={{
                  ...pp.filterPill,
                  ...(activeFilter === f ? pp.filterActive : null),
                  userSelect: 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          {shareFeedback?.key === viewCopyKey && shareFeedback.manualUrl && manualCopy(shareFeedback.manualUrl, 'view-copy-help', 'Filtered tools URL')}
        </div>

        <p className="sr-only" role="status">
          {viewCopied ? 'Link copied.' : shareFeedback && !shareFeedback.manualUrl && !shareFeedback.key.startsWith('view:') && 'Project link copied.'}
        </p>
        <div id="open-source-results" style={pp.projectsGrid} className="pp-projectsGrid">
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
                    'radial-gradient(90% 68% at 50% 0%, hsl(' +
                    p.accent +
                    ' / 0.19), transparent 72%)',
                }}
              />
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
              {(p.guide || p.slug === 'game-asset-pipeline' || p.slug === 'webp-me-daddy-skill' || p.slug === 'shadewater-seo-skill') && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 10, color: `hsl(${p.accent})` }}>
                  {p.guide && (
                    <a href={p.guide.href} target="_blank" rel="noopener noreferrer" style={{ ...pp.projectLink, marginLeft: 0, gap: 5 }}>
                      {p.guide.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {p.slug === 'game-asset-pipeline' && (
                    <a href={buildPath('brinespace-asset-case')} style={{ ...pp.projectLink, marginLeft: 0, gap: 5 }}>
                      Read the asset case study <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {p.slug === 'webp-me-daddy-skill' && (
                    <a href={buildPath('webp-example')} style={{ ...pp.projectLink, marginLeft: 0, gap: 5 }}>
                      See a real example <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {p.slug === 'shadewater-seo-skill' && (
                    <a href={buildPath(seoAuditExample.page)} style={{ ...pp.projectLink, marginLeft: 0, gap: 5 }}>
                      See a sample audit <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              )}

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
                  onClick={(event) => void copyLink(p.slug, new URL(buildProjectHref(p.slug), window.location.origin), event.currentTarget)}
                  style={{ color: TG_MUTED, fontSize: 14, cursor: 'pointer', minHeight: 32 }}
                >
                  Copy link {shareFeedback?.key === p.slug && !shareFeedback.manualUrl && <span aria-hidden="true">✓</span>}
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
              {shareFeedback?.key === p.slug && shareFeedback.manualUrl && manualCopy(shareFeedback.manualUrl, `${p.slug}-copy-help`, `Project URL for ${p.name}`)}
            </article>
          ))}
        </div>
      </section>
      <CurrentProjects includeFishMail={false} />
    </AuroraPage>
  );
}
