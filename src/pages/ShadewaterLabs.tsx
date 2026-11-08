import CurrentProjects from '@/components/CurrentProjects';
import { useState, type CSSProperties, type MouseEvent } from 'react';
import { managedWebsites } from '@/content/websites';
import { brineSpace, fishMail } from '@/content/currentProjects';
import { openSourceReleases, thumbSrcSet } from '@/content/openSource';
import { queueItems } from '@/content/queue';
import { buildProjectHref, OPEN_SOURCE_SECTION_ID, PAGE_HEADING_ID } from '@/lib/routes';
import {
  SHADEWATER_LABS_TEXT_LOGO_ALT,
  SHADEWATER_LABS_TEXT_LOGO_CROPPED_SIZES,
  SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC,
  SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRCSET,
  SHADEWATER_LABS_TEXT_LOGO_HEIGHT,
  SHADEWATER_LABS_TEXT_LOGO_WIDTH,
} from '@/lib/brandAssets';
import {
  ad,
  ADFooter,
  ADNav,
  ADTicker,
  ConstellationField,
  HeroMesh,
  MONO,
  ParticleField,
  TG_DIM,
  TG_MUTED,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface ShadewaterLabsProps {
  onNavigate: AuroraNavigate;
}


const AD_TRACKS = [
  {
    id: 'ai-tools',
    title: 'AI Tools & Creative Tech',
    body:
      'Prompt rigs, automation flows, and creative software experiments. Where generative models become instruments.',
    accent: '186 90% 60%',
  },
  {
    id: 'web',
    title: 'Websites & Coding Builds',
    body: 'Custom web apps, utilities, and small ships. Software made for the way I actually work.',
    accent: '210 85% 65%',
  },
  {
    id: 'experiments',
    title: 'Games & Hardware',
    body: 'BrineSpace below the surface, reusable game-art tools, and an e-ink device taking shape on the desk.',
    accent: '150 65% 55%',
  },
];

/**
 * Everything in the status readout is derived from the site's own content files, and the
 * dates in those files are written from GitHub at build time (scripts/refresh-updated.mjs).
 * Nothing here is hand-entered. (The dates were, until 2026-09-05, and had drifted by up to
 * five months while this comment said otherwise.)
 */
function useLabStatus() {
  const liveSites = managedWebsites.filter((s) => s.status === 'Live').length;
  const newest = managedWebsites.reduce((a, b) => (b.updated > a.updated ? b : a));
  return { liveSites, newest };
}

function ADHero() {
  const { liveSites, newest } = useLabStatus();
  const newestRelease = openSourceReleases.reduce((a, b) => (b.updated > a.updated ? b : a));
  return (
    <section style={home.hero}>
      <HeroMesh />
      <ConstellationField />
      <ParticleField />
      <div style={home.heroInner} className="home-heroInner">
        <div style={home.heroChip}>
          <span style={home.heroChipPulse} className="ad-pulse" />
          <span style={home.heroChipText}>Shadewater Labs</span>
          <span style={home.heroChipMono}>Vancouver, BC</span>
        </div>

        {/* The responsive lockup is the primary image in the hero. */}
        <img
          src={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC}
          srcSet={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRCSET}
          sizes={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SIZES}
          alt={SHADEWATER_LABS_TEXT_LOGO_ALT}
          width={SHADEWATER_LABS_TEXT_LOGO_WIDTH}
          height={SHADEWATER_LABS_TEXT_LOGO_HEIGHT}
          fetchPriority="high"
          decoding="async"
          style={home.heroLogo}
        />

        <h1 id={PAGE_HEADING_ID} tabIndex={-1} style={home.heroTitle} className="home-heroTitle">
          The studio for <span style={home.heroAccent}>weird-good</span>
          <br />
          AI tools and tech experiments.
        </h1>

        <p style={home.heroLede}>
          Brin Shadewater builds games, agent tools, websites, and hardware experiments.{' '}
          <a href="#current-projects" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            See prototypes and handoffs
          </a>.
        </p>

        <div style={home.heroCtas}>
          <a
            href={brineSpace.url}
            data-project-click="play-brinespace"
            target="_blank"
            rel="noopener noreferrer"
            style={ad.btnPrimary}
          >
            <span>Play BrineSpace</span>
            <span aria-hidden="true" style={home.btnArrow}>↗</span>
          </a>
          <a
            href={buildProjectHref(OPEN_SOURCE_SECTION_ID)}
            data-project-click="browse-open-source"
            style={ad.btnGhost}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
            Browse open-source tools
          </a>
        </div>

        <a
          href={fishMail.link.href}
          data-project-click={fishMail.link.clickAction}
          style={home.heroDemoLink}
        >
          {fishMail.link.label} <span aria-hidden="true">→</span>
        </a>

        <div style={home.hud}>
          <div style={home.hudHead}>
            <div style={home.hudTitle}>
              <span style={home.hudPulse} className="ad-pulse" />
              Where things stand
            </div>
            <div style={home.hudMeta}>from the project files</div>
          </div>
          <div style={home.hudGrid} className="home-hudGrid">
            <HudCell
              k="Sites managed"
              v={String(managedWebsites.length)}
              sub={`${liveSites} live`}
            />
            <HudCell
              k="Open source"
              v={String(openSourceReleases.length)}
              sub="released on GitHub"
            />
            <HudCell k="Last updated" v={newest.updated} sub={newest.name} />
            <HudCell
              k="Latest repo activity"
              v={newestRelease.name}
              sub={newestRelease.licence + ' · ' + newestRelease.language}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HudCell({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div style={home.hudCell}>
      <div style={home.hudKey}>{k}</div>
      <div style={home.hudVal}>{v}</div>
      <div style={home.hudSub}>{sub}</div>
    </div>
  );
}


function SectionHead({ kicker, title, sub, align = 'center' }: { kicker: string; title: string; sub: string; align?: 'center' | 'left' }) {
  return (
    <div style={{ ...home.sectionHead, textAlign: align, margin: align === 'left' ? '0 0 32px' : '0 auto 40px' }}>
      <div style={{ ...home.kicker, justifyContent: align === 'left' ? 'flex-start' : 'center' }}>
        <span style={home.kickerLine} />
        <span style={home.kickerText}>{kicker}</span>
        <span style={home.kickerLine} />
      </div>
      <h2 style={home.h2}>{title}</h2>
      <p style={{ ...home.sub, maxWidth: align === 'left' ? 'unset' : 720, margin: align === 'left' ? '12px 0 0' : '14px auto 0' }}>{sub}</p>
    </div>
  );
}

function ADTracks() {
  return (
    <section id="labs-tracks" style={home.section} className="home-section">
      <SectionHead kicker="Focus" title="What lives here" sub="Three things the lab actually works on." />
      <div style={home.trackGrid} className="home-trackGrid">
        {AD_TRACKS.map((t) => (
          <article key={t.id} style={home.trackCard}>
            <div style={{ ...home.trackHalo, background: `radial-gradient(120% 100% at 50% -10%, hsl(${t.accent} / 0.40), transparent 65%)` }} />
            <h3 style={home.trackTitle}>{t.title}</h3>
            <p style={home.trackBody}>{t.body}</p>
            <div style={{ ...home.trackLine, background: `linear-gradient(90deg, transparent, hsl(${t.accent} / 0.7), transparent)` }} />
          </article>
        ))}
      </div>
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
    thumbnailPosition?: CSSProperties['objectPosition'];
    logo?: { src: string; srcSet?: string };
    glyph?: string;
    statusLabel: string;
    statusTone: string;
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
    shadewaterlabs: { src: '/shadewaterlabswebthumb.webp', srcSet: '/shadewaterlabswebthumb-320w.webp 320w, /shadewaterlabswebthumb-480w.webp 480w, /shadewaterlabswebthumb.webp 800w' },
    datagoblin: { src: '/datagoblinwebthumb.webp', srcSet: '/datagoblinwebthumb-320w.webp 320w, /datagoblinwebthumb-480w.webp 480w, /datagoblinwebthumb.webp 800w' },
    inkmasterstudio: { src: '/inkmasterstudiowebthumb.webp', srcSet: '/inkmasterstudiowebthumb-320w.webp 320w, /inkmasterstudiowebthumb-480w.webp 480w, /inkmasterstudiowebthumb.webp 800w' },
    strangeharvestmovie: { src: '/strangeharvestwebthumb.webp', srcSet: '/strangeharvestwebthumb-320w.webp 320w, /strangeharvestwebthumb-480w.webp 480w, /strangeharvestwebthumb.webp 800w' },
    strangeharvestmerch: { src: '/strangeharvestmerchwebthumb.webp', srcSet: '/strangeharvestmerchwebthumb-320w.webp 320w, /strangeharvestmerchwebthumb-480w.webp 480w, /strangeharvestmerchwebthumb.webp 800w' },
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
    glyph: r.glyph,
    statusLabel: 'RELEASED',
    statusTone: 'hsl(150 70% 55%)',
    ctaLabel: 'View project',
    href: buildProjectHref(r.id),
    repoUrl: r.url,
  }));

  const siteCards = managedWebsites.map((s): DatedCarouselCard => {
    const thumb = THUMBS[s.id];
    const ACCENTS: Record<string, string> = {
      brinshadewater: '186 85% 60%',
      shadewaterlabs: '186 90% 60%',
      datagoblin: '150 65% 55%',
      inkmasterstudio: '219 85% 65%',
      strangeharvestmovie: '210 85% 65%',
      strangeharvestmerch: '36 85% 62%',
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
      statusTone: s.status === 'Live' ? 'hsl(150 70% 55%)' : 'hsl(36 85% 62%)',
      ctaLabel: 'Visit site',
      href: s.url,
      external: true,
    };
  });

  // Feature the playable projects first, then sort releases and sites by repo activity.
  const recentCards = [...projectCards, ...siteCards].sort((a, b) =>
    b.updated.localeCompare(a.updated),
  );
  const cards: CarouselCard[] = [
    {
      key: brineSpace.id,
      badge: 'GAME',
      name: brineSpace.name,
      blurb: `${brineSpace.summary} ${brineSpace.detail}`,
      accent: '184 75% 62%',
      thumbnail: brineSpace.image.src,
      thumbnailSrcSet: brineSpace.image.srcSet,
      thumbnailAlt: brineSpace.image.alt,
      thumbnailPosition: 'center bottom',
      statusLabel: 'PLAYABLE PREVIEW',
      statusTone: 'hsl(150 70% 55%)',
      ctaLabel: 'Play on itch.io',
      clickAction: 'play-brinespace',
      href: brineSpace.url,
      external: true,
    },
    {
      key: fishMail.id,
      badge: fishMail.category.toUpperCase(),
      name: fishMail.name,
      blurb: `${fishMail.summary} ${fishMail.detail}`,
      accent: '186 85% 65%',
      thumbnail: fishMail.image.src,
      thumbnailSrcSet: fishMail.image.srcSet,
      thumbnailAlt: fishMail.image.alt,
      thumbnailPosition: 'center',
      statusLabel: fishMail.status.toUpperCase(),
      statusTone: 'hsl(150 70% 55%)',
      ctaLabel: fishMail.link.label,
      clickAction: 'try-fishmail',
      href: fishMail.link.href,
      projectHref: buildProjectHref(fishMail.id),
    },
    ...recentCards,
  ];
  const [idx, setIdx] = useState(0);
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
      <SectionHead kicker="Work" title="Projects and managed sites" sub="Play BrineSpace, try FishMail, browse open-source tools, and visit managed sites." />
      <style>{`
        .carousel-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 900px) {
          .carousel-track { grid-template-columns: repeat(2, 1fr); }
          .carousel-slot-2 { display: none !important; }
        }
        @media (max-width: 600px) {
          .carousel-track { grid-template-columns: 1fr; }
          .carousel-slot-1 { display: none !important; }
          .carousel-picker { max-width: 204px; margin-inline: auto; }
        }
      `}</style>
      <div role="group" aria-label="Featured work" aria-roledescription="carousel" style={{ position: 'relative' }}>
        <p className="sr-only" role="status" aria-atomic="true">
          {getCard(0).name}, {idx + 1} of {total}
        </p>
        <div role="group" aria-label="Featured work controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous featured item"
            aria-controls="featured-work-track"
            style={home.carouselArrow}
          >
            {'←'}
          </button>
          <span aria-hidden="true" style={{ color: TG_MUTED, fontFamily: MONO, fontSize: 12 }}>
            {idx + 1} / {total}
          </span>
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
        <div id="featured-work-track" className="carousel-track">
          {[0, 1, 2].map((offset) => {
            const c = getCard(offset);
            return (
              <article
                key={'slot-' + offset}
                className={'carousel-slot-' + offset}
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
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ ...home.projectGlow, background: 'radial-gradient(85% 70% at 50% 0%, hsl(' + c.accent + ' / 0.35), transparent 65%)' }} />
                <div style={home.projectScan} />
                <div style={home.projectTop}>
                  <span style={home.projectBadge}>{c.badge}</span>
                  <span style={home.projectStatus}>
                    <span style={{ ...home.statusDot, background: c.statusTone }} />
                    <span style={{ color: c.statusTone }}>{c.statusLabel}</span>
                  </span>
                </div>
                <div style={{ ...home.projectArt, boxShadow: '0 18px 50px hsl(' + c.accent + ' / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)', overflow: 'hidden' }}>
                  {c.thumbnail ? (
                    <img
                      src={c.thumbnail}
                      srcSet={c.thumbnailSrcSet}
                      sizes="auto, (min-width: 901px) 310px, (min-width: 601px) 40vw, 80vw"
                      alt={c.thumbnailAlt ?? ''}
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.thumbnailPosition ?? 'top' }}
                    />
                  ) : c.logo ? (
                    <img src={c.logo.src} srcSet={c.logo.srcSet} sizes="14rem" alt="" loading="lazy" decoding="async" style={home.projectLogo} />
                  ) : (
                    <div style={{ ...home.projectGlyph, background: 'conic-gradient(from 220deg at 50% 50%, hsl(' + c.accent + '), hsl(' + c.accent + ' / 0.4), hsl(' + c.accent + '))' }}>
                      <span>{c.glyph ?? '◇'}</span>
                    </div>
                  )}
                </div>
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
                  <span aria-hidden="true" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(' + c.accent + ' / 0.6)' }}>
                    {offset === 0 ? '● ' : '○ '}{(idx + offset) % total + 1}/{total}
                  </span>
                  <div style={home.projectActions}>
                    <a
                      href={c.href}
                      data-project-click={c.clickAction}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={c.repoUrl ? `View project: ${c.name}` : undefined}
                      style={{
                        ...home.projectLink,
                        ...(c.projectHref ? home.projectPlayButton : {}),
                        color: 'hsl(' + c.accent + ')',
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
              </article>
            );
          })}
        </div>

        <div className="carousel-picker" role="group" aria-label="Choose a featured item" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
          {cards.map((card, i) => (
            <button
              key={card.key}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show ${card.name}`}
              aria-current={i === idx ? 'true' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: i === idx ? 20 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === idx ? 'hsl(186 90% 60%)' : 'hsl(186 25% 48%)',
                  transition: 'all 0.25s ease',
                }}
              />
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/projects" onClick={(event) => navigateCatalogue(event, 'projects')} style={home.catalogueBtn}>
            All projects <span style={home.catalogueArrow}>{'→'}</span>
          </a>
          <a href="/websites" onClick={(event) => navigateCatalogue(event, 'websites')} style={home.catalogueBtn}>
            All websites <span style={home.catalogueArrow}>{'→'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ADComing() {
  return (
    <section style={home.section} className="home-section">
      <div style={home.comingPanel}>
        <div style={home.comingGlow} />
        <div style={home.comingHead}>
          <SectionHead
            kicker="Now"
            title="Work in progress"
            sub="Development and maintenance underway."
            align="left"
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
    <div style={ad.root}>
      <style>{`
        @media (max-width: 768px) {
          .home-heroTitle { font-size: clamp(2rem, 9vw, 3.5rem) !important; line-height: 1.08 !important; }
          .home-hudGrid { grid-template-columns: repeat(2, 1fr) !important; }
          .home-trackGrid { grid-template-columns: 1fr !important; }
          .home-section { padding: 48px 20px 0 !important; }
        }
        @media (max-width: 480px) {
          .home-hudGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <ADTicker />
      <ADNav onNavigate={onNavigate} active="labs" />
      <ADHero />
      <ADTracks />
      <ADProjects onNavigate={onNavigate} />
      <CurrentProjects />
      <ADComing />
      <ADFooter />
    </div>
  );
}

/* ----- Home-page-only style sheet ----- */

const home: Record<string, CSSProperties> = {
  hero: { position: 'relative', overflow: 'hidden', paddingBottom: 0 },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) var(--ad-gutter) clamp(56px, 7vw, 88px)', textAlign: 'center' },
  heroChip: {
    display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 10px',
    padding: '8px 14px', borderRadius: 999,
    background: 'hsl(200 30% 8% / 0.75)',
    border: '1px solid hsl(186 80% 60% / 0.35)',
    boxShadow: '0 0 30px hsl(186 90% 50% / 0.18)',
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em',
    color: 'hsl(186 60% 85%)', marginBottom: 18,
  },
  heroChipPulse: {
    width: 8, height: 8, borderRadius: 999, background: 'hsl(150 80% 60%)',
    boxShadow: '0 0 0 4px hsl(150 80% 60% / 0.18), 0 0 14px hsl(150 80% 60% / 0.7)',
    animation: 'adPulse 2.4s ease-in-out infinite',
  },
  heroChipText: { color: '#fff', fontWeight: 600 },
  heroChipMono: { color: 'hsl(186 25% 60%)' },
  heroLogo: {
    width: 'clamp(145px, 40vw, 205px)', height: 'auto', display: 'block', margin: '0 auto 6px',
    filter: 'drop-shadow(0 30px 80px hsl(186 95% 55% / 0.5)) drop-shadow(0 6px 24px hsl(220 80% 60% / 0.35))',
  },
  heroTitle: {
    fontSize: 'clamp(2.25rem, 6.2vw, 4.25rem)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700,
    margin: '12px auto 0', maxWidth: 980, textWrap: 'balance' as CSSProperties['textWrap'], color: '#fff',
  },
  heroAccent: {
    background: 'linear-gradient(135deg, hsl(186 95% 75%) 0%, hsl(220 85% 78%) 50%, hsl(150 70% 65%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
  },
  heroLede: {
    margin: '18px auto 0', maxWidth: 720, color: 'hsl(45 22% 86%)',
    fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.55, textWrap: 'pretty' as CSSProperties['textWrap'],
  },
  heroCtas: { display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' },
  heroDemoLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44,
    color: 'hsl(186 60% 82%)', fontSize: 14, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3,
  },
  btnArrow: { transform: 'translateY(-1px)' },

  hud: {
    position: 'relative', margin: '60px auto 0', maxWidth: 920, padding: '20px 24px 18px',
    borderRadius: 22, background: 'hsl(200 30% 7% / 0.7)',
    border: '1px solid hsl(186 70% 55% / 0.25)',
    boxShadow: '0 24px 60px hsl(210 80% 4% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
    backdropFilter: 'blur(10px)',
  },
  hudHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  hudTitle: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', color: 'hsl(186 60% 80%)' },
  hudPulse: {
    width: 7, height: 7, borderRadius: 999, background: 'hsl(150 80% 60%)',
    boxShadow: '0 0 12px hsl(150 80% 60% / 0.7)', animation: 'adPulse 2.4s ease-in-out infinite',
  },
  hudMeta: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.2em', color: TG_DIM },
  hudGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 },
  hudCell: {
    display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 0',
    borderLeft: '1px solid hsl(186 50% 40% / 0.2)', paddingLeft: 16, textAlign: 'left',
  },
  hudKey: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: 'hsl(186 35% 65%)' },
  hudVal: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
  hudSub: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.06em', color: 'hsl(36 30% 70%)' },

  section: { position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '80px 32px 0', zIndex: 1 },
  sectionHead: { textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  kickerLine: { display: 'block', width: 28, height: 1, background: 'hsl(186 70% 60% / 0.4)' },
  kickerText: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em', color: 'hsl(186 60% 78%)' },
  h2: {
    fontSize: 50, lineHeight: 1.04, letterSpacing: '-0.025em', fontWeight: 700, margin: 0,
    background: 'linear-gradient(180deg, #fff 30%, hsl(186 30% 80%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
  },
  sub: { color: TG_MUTED, fontSize: 17, lineHeight: 1.55 },

  trackGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  trackCard: {
    position: 'relative', padding: 26, borderRadius: 22,
    background: 'linear-gradient(180deg, hsl(200 30% 12% / 0.7), hsl(200 30% 8% / 0.85))',
    border: '1px solid hsl(186 50% 40% / 0.25)',
    boxShadow: '0 16px 40px hsl(210 80% 4% / 0.5), inset 0 1px 0 hsl(186 70% 70% / 0.06)',
    overflow: 'hidden',
  },
  trackHalo: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  trackTitle: { position: 'relative', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  trackBody: { position: 'relative', color: 'hsl(45 18% 84%)', fontSize: 15, lineHeight: 1.6, marginTop: 12 },
  trackLine: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, opacity: 0.8 },

  projectGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  projectCard: {
    position: 'relative', display: 'flex', flexDirection: 'column',
    padding: 24, borderRadius: 24,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.3)',
    boxShadow: '0 20px 50px hsl(210 80% 4% / 0.5), inset 0 1px 0 hsl(186 70% 70% / 0.06)',
    overflow: 'hidden',
  },
  projectGlow: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  projectScan: {
    position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, hsl(0 0% 100% / 0.018) 3px, hsl(0 0% 100% / 0.018) 4px)',
    pointerEvents: 'none',
  },
  projectTop: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  projectBadge: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', color: 'hsl(36 50% 75%)' },
  projectStatus: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em',
    padding: '5px 11px', borderRadius: 999,
    background: 'hsl(0 0% 0% / 0.5)', border: '1px solid hsl(0 0% 100% / 0.1)',
  },
  statusDot: { width: 7, height: 7, borderRadius: 999 },
  projectArt: {
    position: 'relative', height: 140, borderRadius: 16, marginBottom: 18,
    background: 'linear-gradient(180deg, hsl(200 35% 14% / 0.85), hsl(200 30% 8% / 0.95))',
    border: '1px solid hsl(186 40% 35% / 0.3)',
    display: 'grid', placeItems: 'center', overflow: 'hidden',
  },
  projectLogo: { maxHeight: 90, maxWidth: 170, objectFit: 'contain', position: 'relative', zIndex: 1 },
  projectGlyph: {
    position: 'relative', zIndex: 1, width: 90, height: 90, borderRadius: 22,
    display: 'grid', placeItems: 'center',
    fontFamily: MONO, fontSize: 28, fontWeight: 700, color: '#04101b', letterSpacing: '0.05em',
    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.4), 0 12px 32px hsl(186 80% 40% / 0.45)',
  },
  projectArtCorner: { position: 'absolute', top: 8, right: 10, fontFamily: MONO, fontSize: 14, color: 'hsl(186 50% 70% / 0.5)' },
  projectName: { position: 'relative', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  projectBlurb: { position: 'relative', color: 'hsl(45 18% 84%)', fontSize: 14.5, lineHeight: 1.6, marginTop: 10 },
  projectFoot: {
    position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 'auto', paddingTop: 16, borderTop: '1px solid hsl(186 30% 30% / 0.3)',
    gap: 8,
  },
  projectActions: { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', gap: '4px 12px', marginLeft: 'auto' },
  projectLink: { display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, textDecoration: 'none' },
  projectPlayButton: {
    padding: '8px 12px', borderRadius: 999,
    background: 'hsl(186 45% 20% / 0.55)', border: '1px solid hsl(186 60% 50% / 0.38)',
  },
  projectSecondaryLink: { color: TG_MUTED, fontSize: 13, textDecoration: 'none' },
  carouselArrow: {
    background: 'hsl(200 30% 10%)', border: '1px solid hsl(186 50% 40% / 0.3)', color: 'hsl(186 60% 75%)',
    borderRadius: 999, flex: '0 0 36px', height: 36, cursor: 'pointer', fontSize: 16,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  catalogueBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '15px 30px', borderRadius: 999,
    background: 'hsl(200 30% 9% / 0.75)',
    border: '1px solid hsl(186 60% 50% / 0.38)',
    color: 'hsl(186 90% 68%)',
    fontFamily: MONO, fontSize: 13.5, letterSpacing: '0.16em',
    fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
  },
  catalogueArrow: { fontSize: 15, transform: 'translateY(-1px)' },

  comingPanel: {
    position: 'relative', overflow: 'hidden', padding: '36px 40px', borderRadius: 28,
    background: 'linear-gradient(160deg, hsl(192 50% 14% / 0.7), hsl(220 45% 12% / 0.7))',
    border: '1px solid hsl(186 70% 55% / 0.25)',
    boxShadow: '0 24px 60px hsl(210 80% 4% / 0.5)',
  },
  comingGlow: {
    position: 'absolute', top: -120, right: -120, width: 380, height: 380,
    background: 'radial-gradient(circle, hsl(186 90% 60% / 0.35), transparent 60%)',
    filter: 'blur(40px)', pointerEvents: 'none',
  },
  comingHead: { position: 'relative' },
  comingList: { position: 'relative', listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 },
  comingItem: {
    display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 18,
    padding: '16px 18px', borderRadius: 14,
    background: 'hsl(200 30% 7% / 0.7)', border: '1px solid hsl(186 50% 40% / 0.2)',
  },
  comingLabel: { fontSize: 16.5, fontWeight: 600, color: '#fff' },
  comingNote: { margin: '6px 0 0', color: 'hsl(45 18% 78%)', fontSize: 14, lineHeight: 1.55, maxWidth: 640 },
  comingTag: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(36 60% 78%)' },
  comingTagDot: {
    width: 6, height: 6, borderRadius: 999, background: 'hsl(36 80% 60%)',
    boxShadow: '0 0 10px hsl(36 80% 60% / 0.7)', animation: 'adPulse 2.4s ease-in-out infinite',
  },
};
