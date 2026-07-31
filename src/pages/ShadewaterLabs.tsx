import { useState, useEffect, type CSSProperties } from 'react';
import { managedWebsites } from '@/content/websites';
import { openSourceReleases, thumbSrcSet } from '@/content/openSource';
import { queueItems } from '@/content/queue';
import {
  SHADEWATER_LABS_TEXT_LOGO_ALT,
  SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC,
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
    title: 'Future Tech Experiments',
    body: 'A workshop for prototypes: emerging-tech ideas, rough spikes, and the occasional graduate.',
    accent: '150 65% 55%',
  },
];

/**
 * Everything in the status readout is derived from the site's own content
 * files, so it stays true on its own. Nothing here is hand-entered.
 */
function useLabStatus() {
  const liveSites = managedWebsites.filter((s) => s.status === 'Live').length;
  const betaSites = managedWebsites.length - liveSites;
  const newest = managedWebsites.reduce((a, b) => (b.updated > a.updated ? b : a));
  return { liveSites, betaSites, newest };
}

function ADHero({ onNavigate }: { onNavigate: AuroraNavigate }) {
  const { liveSites, betaSites, newest } = useLabStatus();
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

        <img
          src={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC}
          alt={SHADEWATER_LABS_TEXT_LOGO_ALT}
          width={245}
          height={350}
          decoding="async"
          style={{ ...home.heroLogo, objectFit: 'cover', width: 245, height: 350 }}
        />

        <h1 style={home.heroTitle} className="home-heroTitle">
          The studio for <span style={home.heroAccent}>weird-good</span>
          <br />
          AI tools and tech experiments.
        </h1>

        <p style={home.heroLede}>
          Brin Shadewater builds AI rigs, web apps, and creative-tech prototypes in public. Each
          project ships with a working page, progress notes, and the rough edges left intact.
        </p>

        <div style={home.heroCtas}>
          <a
            href="#labs-projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('labs-projects')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            style={ad.btnPrimary}
          >
            <span>Explore the lab</span>
            <span style={home.btnArrow}>→</span>
          </a>
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('projects');
            }}
            style={ad.btnGhost}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
            Read the lab log
          </a>
        </div>

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
              sub={`${liveSites} live · ${betaSites} in beta`}
            />
            <HudCell
              k="Open source"
              v={String(openSourceReleases.length)}
              sub="released on GitHub"
            />
            <HudCell k="Last updated" v={newest.updated} sub={newest.name} />
            <HudCell
              k="Newest release"
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
    updated: string;
    badge: string;
    name: string;
    blurb: string;
    accent: string;
    thumbnail?: string;
    thumbnailSrcSet?: string;
    logo?: { src: string; srcSet?: string };
    glyph?: string;
    statusLabel: string;
    statusTone: string;
    onClick: () => void;
    ctaLabel: string;
    /** Real destination, so the card title is a focusable link and not a click-only div. */
    href: string;
    external?: boolean;
  }

  const THUMBS: Record<string, { src: string; srcSet: string }> = {
    brinshadewater: { src: '/brinshadewaterwebthumb.webp', srcSet: '/brinshadewaterwebthumb-320w.webp 320w, /brinshadewaterwebthumb-480w.webp 480w, /brinshadewaterwebthumb.webp 800w' },
    shadewaterlabs: { src: '/shadewaterlabswebthumb.webp', srcSet: '/shadewaterlabswebthumb-320w.webp 320w, /shadewaterlabswebthumb-480w.webp 480w, /shadewaterlabswebthumb.webp 800w' },
    datagoblin: { src: '/datagoblinwebthumb.webp', srcSet: '/datagoblinwebthumb-320w.webp 320w, /datagoblinwebthumb-480w.webp 480w, /datagoblinwebthumb.webp 800w' },
    inkmasterstudio: { src: '/inkmasterstudiowebthumb.webp', srcSet: '/inkmasterstudiowebthumb-320w.webp 320w, /inkmasterstudiowebthumb-480w.webp 480w, /inkmasterstudiowebthumb.webp 800w' },
    strangeharvestmovie: { src: '/strangeharvestwebthumb.webp', srcSet: '/strangeharvestwebthumb-320w.webp 320w, /strangeharvestwebthumb-480w.webp 480w, /strangeharvestwebthumb.webp 800w' },
    strangeharvestmerch: { src: '/strangeharvestmerchwebthumb.webp', srcSet: '/strangeharvestmerchwebthumb-320w.webp 320w, /strangeharvestmerchwebthumb-480w.webp 480w, /strangeharvestmerchwebthumb.webp 800w' },
    losthills: { src: '/losthillswebthumb.webp', srcSet: '/losthillswebthumb-320w.webp 320w, /losthillswebthumb-480w.webp 480w, /losthillswebthumb.webp 800w' },
  };

  const projectCards: CarouselCard[] = [
    ...openSourceReleases.map((r): CarouselCard => ({
      key: r.id,
      updated: r.updated,
      badge: 'OPEN SOURCE',
      name: r.name,
      blurb: r.summary,
      accent: r.accent,
      thumbnail: `/${r.thumb}.webp`,
      thumbnailSrcSet: thumbSrcSet(r.thumb),
      statusLabel: 'RELEASED',
      statusTone: 'hsl(150 70% 55%)',
      onClick: () => { window.open(r.url, '_blank', 'noopener,noreferrer'); },
      ctaLabel: 'View on GitHub',
      href: r.url,
      external: true,
    })),
  ];

  const siteCards: CarouselCard[] = managedWebsites.map((s) => {
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
      onClick: () => { window.open(s.url, '_blank', 'noopener,noreferrer'); },
      ctaLabel: 'Visit site',
      href: s.url,
      external: true,
    };
  });

  // Newest first. ISO YYYY-MM-DD sorts lexicographically, so this is chronological.
  const cards: CarouselCard[] = [...projectCards, ...siteCards].sort((a, b) =>
    b.updated.localeCompare(a.updated),
  );
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = cards.length;

  useEffect(() => {
    if (paused) return;
    // WCAG 2.2.2: don't auto-advance for people who asked for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 4000);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => { setPaused(true); setIdx((i) => (i - 1 + total) % total); };
  const next = () => { setPaused(true); setIdx((i) => (i + 1) % total); };

  const getCard = (offset: number) => cards[(idx + offset + total) % total];

  return (
    <section id="labs-projects" style={home.section} className="home-section">
      <SectionHead kicker="Work" title="Projects and managed sites" sub="Every card goes to a real page. Click any of them." />
      <style>{`
        .carousel-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 900px) {
          .carousel-track { grid-template-columns: repeat(2, 1fr); }
          .carousel-slot-2 { display: none !important; }
        }
        @media (max-width: 600px) {
          .carousel-track { grid-template-columns: 1fr; }
          .carousel-slot-1 { display: none !important; }
        }
      `}</style>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        style={{ position: 'relative' }}
      >
        <div className="carousel-track">
          {[0, 1, 2].map((offset) => {
            const c = getCard(offset);
            return (
              <article
                key={'slot-' + offset}
                className={'carousel-slot-' + offset}
                onClick={c.onClick}
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
                      sizes="(min-width: 1024px) 340px, 90vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  ) : c.logo ? (
                    <img src={c.logo.src} srcSet={c.logo.srcSet} sizes="14rem" alt="" loading="lazy" decoding="async" style={home.projectLogo} />
                  ) : (
                    <div style={{ ...home.projectGlyph, background: 'conic-gradient(from 220deg at 50% 50%, hsl(' + c.accent + '), hsl(' + c.accent + ' / 0.4), hsl(' + c.accent + '))' }}>
                      <span>{c.glyph ?? '◇'}</span>
                    </div>
                  )}
                </div>
                <h3 style={home.projectName}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={(e) => {
                      // The card's onClick is a mouse convenience; the link is the real
                      // control. Stop propagation so we don't navigate twice.
                      e.stopPropagation();
                      if (!c.external) {
                        e.preventDefault();
                        c.onClick();
                      }
                    }}
                    style={{ color: 'inherit', textDecoration: 'none', outlineOffset: 4 }}
                  >
                    {c.name}
                  </a>
                </h3>
                <p style={home.projectBlurb}>{c.blurb}</p>
                <div style={home.projectFoot}>
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(' + c.accent + ' / 0.6)' }}>
                    {offset === 0 ? '● ' : '○ '}{(idx + offset) % total + 1}/{total}
                  </span>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!c.external) {
                        e.preventDefault();
                        c.onClick();
                      }
                    }}
                    style={{ ...home.projectLink, color: 'hsl(' + c.accent + ')' }}
                  >
                    {c.ctaLabel} <span style={{ marginLeft: 4 }}>{'↗'}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 28 }}>
          <button
            onClick={prev}
            aria-label="Previous"
            style={{ background: 'hsl(200 30% 10%)', border: '1px solid hsl(186 50% 40% / 0.3)', color: 'hsl(186 60% 75%)', borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {'←'}
          </button>
          <div style={{ display: 'flex' }}>
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPaused(true); setIdx(i); }}
                aria-label={'Go to slide ' + (i + 1)}
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
          <button
            onClick={next}
            aria-label="Next"
            style={{ background: 'hsl(200 30% 10%)', border: '1px solid hsl(186 50% 40% / 0.3)', color: 'hsl(186 60% 75%)', borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {'→'}
          </button>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('projects')} style={home.catalogueBtn}>
            All projects <span style={home.catalogueArrow}>{'→'}</span>
          </button>
          <button onClick={() => onNavigate('websites')} style={home.catalogueBtn}>
            All websites <span style={home.catalogueArrow}>{'→'}</span>
          </button>
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
            title="In the queue"
            sub="What the lab is actually working on. No ship dates — intent is checkable, a date is a promise."
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
          .home-heroInner { padding: 40px 20px 60px !important; }
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
      <ADHero onNavigate={onNavigate} />
      <ADTracks />
      <ADProjects onNavigate={onNavigate} />
      <ADComing />
      <ADFooter />
    </div>
  );
}

/* ----- Home-page-only style sheet ----- */

const home: Record<string, CSSProperties> = {
  hero: { position: 'relative', overflow: 'hidden', paddingBottom: 0 },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '64px 32px 88px', textAlign: 'center' },
  heroChip: {
    display: 'inline-flex', alignItems: 'center', gap: 12,
    padding: '8px 16px', borderRadius: 999,
    background: 'hsl(200 30% 8% / 0.75)',
    border: '1px solid hsl(186 80% 60% / 0.35)',
    boxShadow: '0 0 30px hsl(186 90% 50% / 0.18)',
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em',
    color: 'hsl(186 60% 85%)', marginBottom: 30,
  },
  heroChipPulse: {
    width: 8, height: 8, borderRadius: 999, background: 'hsl(150 80% 60%)',
    boxShadow: '0 0 0 4px hsl(150 80% 60% / 0.18), 0 0 14px hsl(150 80% 60% / 0.7)',
    animation: 'adPulse 2.4s ease-in-out infinite',
  },
  heroChipText: { color: '#fff', fontWeight: 600 },
  heroChipMono: { color: 'hsl(186 25% 60%)' },
  heroLogo: {
    height: 240, width: 'auto', display: 'block', margin: '0 auto 6px',
    filter: 'drop-shadow(0 30px 80px hsl(186 95% 55% / 0.5)) drop-shadow(0 6px 24px hsl(220 80% 60% / 0.35))',
  },
  heroTitle: {
    fontSize: 68, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700,
    margin: '12px auto 0', maxWidth: 980, textWrap: 'balance' as CSSProperties['textWrap'], color: '#fff',
  },
  heroAccent: {
    background: 'linear-gradient(135deg, hsl(186 95% 75%) 0%, hsl(220 85% 78%) 50%, hsl(150 70% 65%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
  },
  heroLede: {
    margin: '24px auto 0', maxWidth: 720, color: 'hsl(45 22% 86%)',
    fontSize: 18, lineHeight: 1.55, textWrap: 'pretty' as CSSProperties['textWrap'],
  },
  heroCtas: { display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' },
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
  projectLink: { display: 'inline-flex', alignItems: 'center', marginLeft: 'auto', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none' },
  catalogueBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '15px 30px', borderRadius: 999,
    background: 'hsl(200 30% 9% / 0.75)',
    border: '1px solid hsl(186 60% 50% / 0.38)',
    color: 'hsl(186 90% 68%)',
    fontFamily: MONO, fontSize: 13.5, letterSpacing: '0.16em',
    fontWeight: 600, cursor: 'pointer',
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
