import CurrentProjects from '@/components/CurrentProjects';
import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { managedWebsites } from '@/content/websites';
import { brineSpace, fishMail } from '@/content/currentProjects';
import { openSourceReleases, thumbSrcSet } from '@/content/openSource';
import { queueItems } from '@/content/queue';
import { webpExample } from '@/content/webpExample';
import { seoAuditExample } from '@/content/seoAuditExample';
import {
  buildPath, buildProjectHref, BRINESPACE_DOWNLOAD_HEADING_ID, CASE_STUDIES_SECTION_ID,
  OPEN_SOURCE_SECTION_ID, PAGE_HEADING_ID, SEO_AUDIT_CHECK_HEADING_ID,
} from '@/lib/routes';
import { ADFooter, ADNav, MONO, pp, TG_MUTED } from '@/components/aurora/chrome';
import './ShadewaterLabs.css';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface ShadewaterLabsProps {
  onNavigate: AuroraNavigate;
}

const projectGuides = [
  {
    id: 'brinespace',
    href: `${buildPath('brinespace')}#${BRINESPACE_DOWNLOAD_HEADING_ID}`,
    title: 'Install BrineSpace',
    summary: 'Windows and macOS setup, file sizes and release notes.',
    image: { ...brineSpace.image, width: 800, height: 400 },
  },
  {
    id: 'webp',
    href: buildPath('webp-example'),
    title: 'Responsive WebP example',
    summary: 'Four WebP downloads, copyable HTML and measured file choices.',
    image: {
      ...webpExample.preview,
      srcSet: webpExample.variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
    },
  },
  {
    id: 'seo',
    href: `${buildPath('seo-audit-example')}#${SEO_AUDIT_CHECK_HEADING_ID}`,
    title: 'Test OAI-SearchBot access',
    summary: 'Copy two commands and compare them with a real deploy result.',
    image: { ...seoAuditExample.image, srcSet: thumbSrcSet('shadewaterseoskillthumb') },
  },
];

function ADHero() {
  return (
    <section className="deep-ocean-hero" aria-labelledby={PAGE_HEADING_ID}>
      <div className="deep-ocean-heroCopy">
        <h1 id={PAGE_HEADING_ID} tabIndex={-1}>Games, tools, and creative technology.</h1>
        <p>Shadewater Labs is an independent studio building games, open-source tools, websites, and hardware experiments.</p>
        <div className="deep-ocean-heroActions">
          <a
            href={brineSpace.url}
            data-project-click="play-brinespace"
            target="_blank"
            rel="noopener noreferrer"
            className="deep-ocean-button deep-ocean-buttonPrimary"
          >
            Play BrineSpace <span aria-hidden="true">↗</span>
          </a>
          <a
            href={buildProjectHref(OPEN_SOURCE_SECTION_ID)}
            data-project-click="browse-open-source"
            className="deep-ocean-button"
          >
            Browse open-source tools <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div style={home.sectionHead}>
      <div style={home.kicker}>
        <span style={home.kickerText}>{kicker}</span>
        <span style={home.kickerLine} />
      </div>
      <h2 style={home.h2}>{title}</h2>
      <p style={home.sub}>{sub}</p>
    </div>
  );
}

function HomeResearch() {
  return (
    <section id="labs-tracks" style={home.section} className="home-section">
      <a className="deep-ocean-research" href={buildPath('research')}>
        <div>
          <h2>Research</h2>
          <p>ADHD, sleep, and executive function · An illustrated paper and proposed study</p>
        </div>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

function ADProjects({ onNavigate }: { onNavigate: AuroraNavigate }) {

  interface CarouselCard {
    key: string;
    badge: string;
    name: string;
    blurb: string;
    accent: string;
    thumbnail?: string;
    thumbnailSrcSet?: string;
    thumbnailAlt?: string;
    largeImage?: { src: string; srcSet: string; alt: string };
    thumbnailPosition?: CSSProperties['objectPosition'];
    logo?: { src: string; srcSet?: string };
    glyph?: string;
    statusLabel: string;
    ctaLabel: string;
    clickAction?: string;
    /** Real destination, so the card title is a focusable link and not a click-only div. */
    href: string;
    external?: boolean;
    projectHref?: string;
    repoUrl?: string;
  }
  type DatedCarouselCard = CarouselCard & { updated: string };

  const THUMBS: Record<string, { src: string; srcSet: string }> = {
    brinshadewater: { src: '/brinshadewaterwebthumb.webp', srcSet: '/brinshadewaterwebthumb-320w.webp 320w, /brinshadewaterwebthumb-480w.webp 480w, /brinshadewaterwebthumb.webp 800w' },
    datagoblin: { src: '/datagoblinwebthumb.webp', srcSet: '/datagoblinwebthumb-320w.webp 320w, /datagoblinwebthumb-480w.webp 480w, /datagoblinwebthumb.webp 800w' },
    inkmasterstudio: { src: '/inkmasterstudiowebthumb.webp', srcSet: '/inkmasterstudiowebthumb-320w.webp 320w, /inkmasterstudiowebthumb-480w.webp 480w, /inkmasterstudiowebthumb.webp 800w' },
    strangeharvestmovie: { src: '/strangeharvestwebthumb.webp', srcSet: '/strangeharvestwebthumb-320w.webp 320w, /strangeharvestwebthumb-480w.webp 480w, /strangeharvestwebthumb.webp 800w' },
    losthills: { src: '/losthillswebthumb.webp', srcSet: '/losthillswebthumb-320w.webp 320w, /losthillswebthumb-480w.webp 480w, /losthillswebthumb.webp 800w' },
  };

  const projectCards = openSourceReleases.map((r): DatedCarouselCard => ({
    key: r.id,
    updated: r.updated,
    badge: 'OPEN SOURCE',
    name: r.name,
    blurb: r.summary,
    accent: r.accent,
    thumbnail: r.thumb ? `/${r.thumb}.webp` : undefined,
    thumbnailSrcSet: r.thumb ? thumbSrcSet(r.thumb) : undefined,
    thumbnailAlt: r.thumbAlt,
    glyph: r.glyph,
    statusLabel: 'RELEASED',
    ctaLabel: 'View project',
    href: buildProjectHref(r.id),
    repoUrl: r.url,
  }));

  const siteCards = managedWebsites.filter(s => s.id !== 'shadewaterlabs' && s.status !== 'Unavailable').map((s): DatedCarouselCard => {
    const thumb = THUMBS[s.id];
    const ACCENTS: Record<string, string> = {
      brinshadewater: '186 85% 60%',
      datagoblin: '150 65% 55%',
      inkmasterstudio: '219 85% 65%',
      strangeharvestmovie: '210 85% 65%',
      losthills: '48 30% 60%',
    };
    return {
      key: s.id,
      updated: s.updated,
      badge: s.role.toUpperCase(),
      name: s.name,
      blurb: s.description,
      accent: ACCENTS[s.id] ?? '186 90% 60%',
      thumbnail: thumb?.src,
      thumbnailSrcSet: thumb?.srcSet,
      statusLabel: s.status.toUpperCase(),
      ctaLabel: 'Visit site',
      href: s.url,
      external: true,
    };
  });

  // Feature the playable projects first, then sort releases and sites by repo activity.
  const featuredTool = projectCards.find(({ key }) => key === 'webp-me-daddy-skill');
  const recentCards = [...projectCards, ...siteCards]
    .filter((card) => card !== featuredTool)
    .sort((a, b) => b.updated.localeCompare(a.updated));
  const cards: CarouselCard[] = [
    {
      key: brineSpace.id,
      badge: 'GAME',
      name: brineSpace.name,
      blurb: brineSpace.summary,
      accent: '184 75% 62%',
      thumbnail: brineSpace.image.src,
      thumbnailSrcSet: brineSpace.image.srcSet,
      thumbnailAlt: brineSpace.image.alt,
      largeImage: {
        src: '/brinespace-expedition-station.webp',
        srcSet: '/brinespace-expedition-station-640w.webp 640w, /brinespace-expedition-station.webp 1200w',
        alt: 'A connected underwater colony in BrineSpace with the Desalination Unit selected.',
      },
      thumbnailPosition: 'center bottom',
      statusLabel: 'PLAYABLE PREVIEW',
      ctaLabel: 'Play on itch.io',
      clickAction: 'play-brinespace',
      href: brineSpace.url,
      external: true,
      projectHref: buildPath('brinespace'),
    },
    {
      key: fishMail.id,
      badge: fishMail.category.toUpperCase(),
      name: fishMail.name,
      blurb: fishMail.summary,
      accent: '186 85% 65%',
      thumbnail: fishMail.image.src,
      thumbnailSrcSet: fishMail.image.srcSet,
      thumbnailAlt: fishMail.image.alt,
      thumbnailPosition: 'center',
      statusLabel: fishMail.status.toUpperCase(),
      ctaLabel: fishMail.link.label,
      clickAction: 'try-fishmail',
      href: fishMail.link.href,
      projectHref: buildProjectHref(fishMail.id),
    },
    ...(featuredTool ? [featuredTool] : []),
    ...recentCards,
  ];
  const [idx, setIdx] = useState(0);
  const leadCard = useRef<HTMLElement>(null);
  const mobilePreviews = cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.key === fishMail.id || card.key === featuredTool?.key);

  const openPreview = (index: number) => {
    setIdx(index);
    requestAnimationFrame(() => {
      leadCard.current?.focus({ preventScroll: true });
      leadCard.current?.scrollIntoView({ block: 'start' });
    });
  };
  const total = cards.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const navigateCatalogue = (event: MouseEvent<HTMLAnchorElement>, page: string) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(page);
  };

  const getCard = (offset: number) => cards[(idx + offset + total) % total];

  return (
    <section id="labs-projects" style={home.section} className="home-section">
      <div role="group" aria-label="Featured work" aria-roledescription="carousel" style={{ position: 'relative' }}>
        <p className="sr-only" role="status" aria-atomic="true">
          {getCard(0).name}, {idx + 1} of {total}
        </p>
        <div className="deep-ocean-galleryHeading">
          <h2 className="deep-ocean-sectionTitle">Featured projects</h2>
          <div role="group" aria-label="Featured work controls" style={home.carouselControls}>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous featured item"
              aria-controls="featured-work-track"
              style={home.carouselArrow}
            >
              {'←'}
            </button>
            <select
              aria-label="Choose a featured item"
              aria-controls="featured-work-track"
              value={idx}
              onChange={(event) => setIdx(Number(event.currentTarget.value))}
              style={home.carouselSelect}
            >
              {cards.map((card, i) => <option key={card.key} value={i}>{card.name}</option>)}
            </select>
            <button
              type="button"
              onClick={next}
              aria-label="Next featured item"
              aria-controls="featured-work-track"
              style={home.carouselArrow}
            >
              {'→'}
            </button>
          </div>
        </div>
        <div id="featured-work-track" className="carousel-track">
          {[0, 1, 2].map((offset) => {
            const c = getCard(offset);
            const largeImage = offset === 0 ? c.largeImage : undefined;
            return (
              <article
                key={'slot-' + offset}
                className={'carousel-slot-' + offset}
                ref={offset === 0 ? leadCard : undefined}
                tabIndex={offset === 0 ? -1 : undefined}
                aria-labelledby={`featured-${c.key}-title`}
                onClick={(event) => {
                  // Let title and action links handle their own navigation.
                  if (!(event.target instanceof Element) || event.target.closest('a')) return;
                  if (c.external) window.open(c.href, '_blank', 'noopener,noreferrer');
                  else window.location.assign(c.href);
                }}
                style={{
                  ...home.projectCard,
                  cursor: 'pointer',
                }}
              >
                <div className="deep-ocean-projectArt" style={home.projectArt}>
                  {c.thumbnail ? (
                    <img
                      src={largeImage?.src ?? c.thumbnail}
                      srcSet={largeImage?.srcSet ?? c.thumbnailSrcSet}
                      sizes={offset === 0
                        ? 'auto, (min-width: 1180px) 660px, (min-width: 901px) 58vw, calc(100vw - 40px)'
                        : 'auto, (min-width: 1180px) 440px, 38vw'}
                      alt={largeImage?.alt ?? c.thumbnailAlt ?? ''}
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: largeImage ? 'contain' : 'cover', objectPosition: largeImage ? 'center' : c.thumbnailPosition ?? 'top' }}
                    />
                  ) : c.logo ? (
                    <img src={c.logo.src} srcSet={c.logo.srcSet} sizes="14rem" alt="" loading="lazy" decoding="async" style={home.projectLogo} />
                  ) : (
                    <div style={{ ...home.projectGlyph, background: 'conic-gradient(from 220deg at 50% 50%, hsl(' + c.accent + '), hsl(' + c.accent + ' / 0.4), hsl(' + c.accent + '))' }}>
                      <span>{c.glyph ?? '◇'}</span>
                    </div>
                  )}
                </div>
                <div className="deep-ocean-cardBody">
                  <div className="deep-ocean-cardMeta">{c.badge} <span>· {c.statusLabel}</span></div>
                  <h3 id={`featured-${c.key}-title`} style={home.projectName}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      style={{ color: 'inherit', textDecoration: 'none', outlineOffset: 4 }}
                    >
                      {c.name}
                    </a>
                  </h3>
                  <p style={home.projectBlurb}>{c.blurb}</p>
                  <div style={home.projectFoot}>
                    <div style={home.projectActions}>
                      <a
                        href={c.href}
                        data-project-click={c.clickAction}
                        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        aria-label={c.repoUrl ? `View project: ${c.name}` : undefined}
                        style={{
                          ...home.projectLink,
                          ...(c.projectHref ? home.projectPlayButton : {}),
                          color: 'var(--ocean-accent)',
                        }}
                      >
                        {c.ctaLabel} <span aria-hidden="true" style={{ marginLeft: 4 }}>{c.external ? '↗' : '→'}</span>
                      </a>
                      {c.projectHref && (
                        <a
                          href={c.projectHref}
                          aria-label={`View project: ${c.name}`}
                          style={home.projectSecondaryLink}
                        >
                          View project <span aria-hidden="true">→</span>
                        </a>
                      )}
                      {c.repoUrl && (
                        <a
                          href={c.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${c.name}`}
                          style={home.projectSecondaryLink}
                        >
                          GitHub <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="deep-ocean-mobilePreviews" role="group" aria-label="Featured project previews">
          {mobilePreviews.map(({ card, index }) => (
            <button
              key={card.key}
              type="button"
              aria-controls="featured-work-track"
              aria-pressed={idx === index}
              onClick={() => openPreview(index)}
            >
              <img
                src={card.thumbnail}
                srcSet={card.thumbnailSrcSet}
                sizes="auto, 72px"
                width={72}
                height={48}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span>{card.name}</span>
            </button>
          ))}
        </div>

        <div className="home-catalogue" style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/projects" onClick={(event) => navigateCatalogue(event, 'projects')} style={home.catalogueBtn}>
            All projects <span style={home.catalogueArrow}>{'→'}</span>
          </a>
          <a href="/websites" onClick={(event) => navigateCatalogue(event, 'websites')} style={home.catalogueBtn}>
            All websites <span style={home.catalogueArrow}>{'→'}</span>
          </a>
          <a href={buildProjectHref(CASE_STUDIES_SECTION_ID)} style={home.catalogueBtn}>
            Read the case studies <span aria-hidden="true" style={home.catalogueArrow}>→</span>
          </a>
          <a href="#current-projects" style={home.catalogueBtn}>
            Prototypes &amp; handoffs <span aria-hidden="true" style={home.catalogueArrow}>→</span>
          </a>
        </div>
      </div>
      <nav aria-labelledby="project-guides-heading" style={home.guideNav}>
        <h3 id="project-guides-heading" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 650 }}>Guides and examples</h3>
        <ul role="list" className="home-guideList">
          {projectGuides.map(({ id, href, title, summary, image }) => (
            <li key={id}>
              <a href={href} className="home-guideLink" aria-labelledby={`home-guide-${id}-title`}>
                <img
                  {...image}
                  alt=""
                  sizes="auto, (min-width: 1024px) 33vw, (min-width: 360px) 80px, 64px"
                  loading="lazy"
                  decoding="async"
                  className="home-guideImage"
                />
                <div className="home-guideText">
                  <h4 id={`home-guide-${id}-title`} className="home-guideTitle">{title}</h4>
                  <p className="home-guideSummary">{summary}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

function ADComing() {
  return (
    <section style={home.section} className="home-section">
      <div style={home.comingPanel}>
        <div style={home.comingHead}>
          <SectionHead
            kicker="Now"
            title="Work in progress"
            sub="Development and maintenance underway."
          />
        </div>
        <ul style={home.comingList}>
          {queueItems.map((q) => (
            <li key={q.id} style={home.comingItem}>
              <div>
                <span style={home.comingLabel}>{q.name}</span>
                <p style={home.comingNote}>{q.note}</p>
              </div>
              <span style={home.comingTag}>
                <span style={home.comingTagDot} className="ad-pulse" />
                {q.status.toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ShadewaterLabs({ onNavigate }: ShadewaterLabsProps) {
  return (
    <div className="deep-ocean">
      <ADNav onNavigate={onNavigate} active="labs" />
      <ADHero />
      <ADProjects onNavigate={onNavigate} />
      <HomeResearch />
      <CurrentProjects />
      <ADComing />
      <ADFooter />
    </div>
  );
}

/* ----- Home-page-only style sheet ----- */

const home: Record<string, CSSProperties> = {
  section: pp.section,
  sectionHead: { maxWidth: 720, margin: '0 0 clamp(20px, 3vw, 32px)' },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  kickerLine: { display: 'block', width: 28, height: 1, background: 'var(--ocean-border)' },
  kickerText: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em', color: 'var(--ocean-accent)' },
  h2: { ...pp.sectionTitle, margin: 0 },
  sub: { ...pp.projectBlurb, fontSize: 16 },

  projectCard: { ...pp.projectCard, padding: 0 },
  projectArt: {
    position: 'relative',
    background: 'var(--ocean-raised)', borderBottom: 'var(--ad-card-border)',
    display: 'grid', placeItems: 'center', overflow: 'hidden',
  },
  projectLogo: { maxHeight: 90, maxWidth: 170, objectFit: 'contain', position: 'relative', zIndex: 1 },
  projectGlyph: {
    position: 'relative', zIndex: 1, width: 90, height: 90, borderRadius: 22,
    display: 'grid', placeItems: 'center',
    fontFamily: MONO, fontSize: 28, fontWeight: 700, color: '#04101b', letterSpacing: '0.05em',
    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.4), 0 12px 32px hsl(186 80% 40% / 0.45)',
  },
  projectName: { position: 'relative', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  projectBlurb: { position: 'relative', color: 'hsl(45 18% 84%)', fontSize: 14.5, lineHeight: 1.6, marginTop: 10 },
  projectFoot: {
    position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 'auto', paddingTop: 16, borderTop: 'var(--ad-card-border)',
    gap: 8,
  },
  projectActions: { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', gap: '4px 12px', marginLeft: 'auto' },
  projectLink: { display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, textDecoration: 'none' },
  projectPlayButton: {
    padding: '8px 12px', borderRadius: 6,
    background: 'var(--ocean-raised)', border: 'var(--ad-card-border)',
  },
  projectSecondaryLink: { color: TG_MUTED, fontSize: 13, textDecoration: 'none' },
  carouselControls: { display: 'flex', alignItems: 'center', gap: 8, width: '100%', maxWidth: 300 },
  carouselSelect: {
    flex: '1 1 0', minWidth: 0, minHeight: 44, padding: '7px 12px', borderRadius: 10,
    colorScheme: 'dark', color: 'var(--ad-copy)', background: 'var(--ocean-raised)', border: 'var(--ad-card-border)',
    fontSize: 15, cursor: 'pointer',
  },
  carouselArrow: {
    background: 'var(--ocean-raised)', border: 'var(--ad-card-border)', color: 'var(--ocean-accent)',
    borderRadius: 10, flex: '0 0 44px', height: 44, cursor: 'pointer', fontSize: 17,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  catalogueBtn: {
    display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8,
    minHeight: 44, padding: '8px 16px', borderRadius: 6,
    background: 'var(--ocean-raised)',
    border: 'var(--ad-card-border)',
    color: 'var(--ocean-accent)',
    fontSize: 14,
    fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
  },
  catalogueArrow: { fontSize: 15, transform: 'translateY(-1px)' },
  guideNav: { marginTop: 28, paddingTop: 20, borderTop: 'var(--ad-card-border)' },

  comingPanel: {
    padding: 'clamp(16px, 3vw, 36px)', borderRadius: 'var(--ad-card-radius)',
    background: 'var(--ad-panel)', border: 'var(--ad-card-border)',
  },
  comingHead: { position: 'relative' },
  comingList: { position: 'relative', listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 },
  comingItem: {
    display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 18,
    padding: '16px 18px', borderRadius: 14,
    background: 'var(--ocean-base)', border: 'var(--ad-card-border)',
  },
  comingLabel: { fontSize: 16.5, fontWeight: 600, color: '#fff' },
  comingNote: { margin: '6px 0 0', color: 'hsl(45 18% 78%)', fontSize: 14, lineHeight: 1.55, maxWidth: 640 },
  comingTag: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(36 60% 78%)' },
  comingTagDot: {
    width: 6, height: 6, borderRadius: 999, background: 'hsl(36 80% 60%)',
    boxShadow: '0 0 10px hsl(36 80% 60% / 0.7)', animation: 'adPulse 2.4s ease-in-out infinite',
  },
};
