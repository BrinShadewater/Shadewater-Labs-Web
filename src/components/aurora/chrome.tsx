import { useMemo, useState, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import {
  SHADEWATER_LABS_MARK_CROPPED_SRC,
} from '@/lib/brandAssets';
import { LABS_ORIGIN, BRIN_ORIGIN } from '@/lib/routes';

/* ------------------------------------------------------------------ */
/* Aurora Drift — shared chrome (ticker, nav, footer, backgrounds)    */
/* Pulled from the Shadewater Labs Futurized design handoff bundle.   */
/* ------------------------------------------------------------------ */

export const SANS = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";
export const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
export const TG_TEXT = 'hsl(45 25% 96%)';
export const TG_MUTED = 'hsl(200 18% 70%)';
export const TG_DIM = 'hsl(200 14% 55%)';
export const AD_BG = '#020a13';

export type AuroraNavigate = (page: string) => void;

const AD_SIGNALS = [
  '\u{2381} LAB.SIGNAL · 2026.05.09',
  'BUILDING · webp-me-daddy v0.9.4',
  'OBSERVING · long-context retrieval',
  'SHIPPING · seo report skill',
  'DRAFTING · inkmaster v1.0',
  'IDLE · weekend reset',
];

export const adTone = {
  green: 'hsl(150 70% 55%)',
  cyan: 'hsl(186 90% 60%)',
  amber: 'hsl(36 85% 62%)',
  blue: 'hsl(220 85% 65%)',
} as const;
export type AdToneKey = keyof typeof adTone;

export function ADTicker() {
  const lane = AD_SIGNALS.concat(AD_SIGNALS);
  return (
    <div style={ad.ticker} aria-hidden="true">
      <div style={ad.tickerLane} className="ad-tickerLane">
        {lane.map((s, i) => (
          <span key={i} style={ad.tickerItem}>
            <span style={ad.tickerDot} />
            <span>{s}</span>
            <span style={ad.tickerSep}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ADNav({
  onNavigate,
  active = 'labs',
}: {
  onNavigate: AuroraNavigate;
  active?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks: Array<{ label: string; page: string }> = [
    { label: 'Labs', page: 'labs' },
    { label: 'Projects', page: 'projects' },
    { label: 'Websites', page: 'websites' },
    { label: 'Tech News', page: 'tech-news' },
    { label: 'About', page: 'about' },
  ];
  return (
    <nav style={ad.nav}>
      <style>{`
        .ad-hamburger {
          display: none;
          background: none;
          border: 1px solid hsl(186 50% 40% / 0.3);
          color: hsl(186 60% 80%);
          border-radius: 8px;
          padding: 7px 11px;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
          margin-left: auto;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .ad-navInner { flex-wrap: wrap !important; }
          .ad-hamburger { display: flex !important; align-items: center; justify-content: center; }
          .ad-navLinks { display: none !important; order: 3; width: 100% !important; }
          .ad-navLinks.ad-navOpen {
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
            padding: 8px 0 12px !important;
            border-top: 1px solid hsl(186 50% 40% / 0.15) !important;
            margin-top: 4px !important;
          }
          .ad-navLinks.ad-navOpen a { width: 100% !important; text-align: left !important; }
          .ad-navBrand { order: 1; }
        }
      `}</style>
      <div style={ad.navInner} className="ad-navInner">
        <a
          href="/"
          style={ad.brand}
          className="ad-navBrand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('labs');
            setMenuOpen(false);
          }}
        >
          <img src={SHADEWATER_LABS_MARK_CROPPED_SRC} alt="" style={ad.brandMark} />
          <span style={ad.brandText}>
            <span style={ad.brandEyebrow}>shadewaterlabs.com</span>
            <span style={ad.brandWord}>
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(186 95% 75%), hsl(220 90% 78%))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Shadewater
              </span>
            </span>
          </span>
        </a>
        <button
          className="ad-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <div style={ad.navLinks} className={`ad-navLinks${menuOpen ? ' ad-navOpen' : ''}`}>
          {navLinks.map((link) => {
            const isActive = link.page === active;
            const href = link.page === 'labs' ? '/' : `/${link.page}`;
            return (
              <a
                key={link.page}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.page);
                  setMenuOpen(false);
                }}
                style={{ ...ad.navLink, ...(isActive ? ad.navLinkActive : null) }}
              >
                {link.label}
              </a>
            );
          })}
          <a href={BRIN_ORIGIN} target="_blank" rel="noopener noreferrer" style={ad.navCta}>
            Brin Shadewater <span style={{ marginLeft: 6 }}>↗</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export function ADFooter() {
  return (
    <footer style={ad.footer}>
      <div style={ad.footerBeam} />
      <div style={ad.footerInner} className="ad-footerInner">
        <div style={ad.footerBrand}>
          <img src={SHADEWATER_LABS_MARK_CROPPED_SRC} alt="" style={ad.footerMark} />
          <div>
            <div style={ad.footerWord}>Shadewater Labs</div>
            <div style={ad.footerEyebrow}>
              experimental technology studio · est. 2024 · 2026 build
            </div>
          </div>
        </div>
        <div style={ad.footerMono}>
          <span style={ad.footerCell}>build · 0.4.7</span>
          <span style={ad.footerCell}>uptime · 99.97%</span>
          <span style={ad.footerCell}>
            <a href={LABS_ORIGIN} style={{ color: 'inherit', textDecoration: 'none' }}>
              shadewaterlabs.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function ConstellationField() {
  const stars = useMemo(() => {
    const seeded = (n: number) => {
      let s = n * 9301 + 49297;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const rnd = seeded(7);
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      r: 0.6 + rnd() * 1.6,
      o: 0.25 + rnd() * 0.75,
      d: rnd() * 4,
      hue: rnd() < 0.18 ? 220 : 186,
    }));
  }, []);

  const links = useMemo<Array<[number, number, number]>>(
    () => [
      [0, 12, 0.18], [12, 23, 0.14], [23, 34, 0.12],
      [7, 19, 0.16], [19, 31, 0.12], [31, 42, 0.1],
      [4, 16, 0.14], [16, 28, 0.1],
      [50, 61, 0.16], [61, 73, 0.12], [73, 85, 0.1],
      [55, 67, 0.14], [67, 79, 0.1],
    ],
    [],
  );

  return (
    <div style={ad.constWrap} aria-hidden="true">
      <div style={ad.constSpin} className="ad-constSpin">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {links.map(([a, b, op], i) => {
            const sa = stars[a];
            const sb = stars[b];
            if (!sa || !sb) return null;
            return (
              <line
                key={i}
                x1={sa.x}
                y1={sa.y}
                x2={sb.x}
                y2={sb.y}
                stroke={`hsl(186 80% 70% / ${op})`}
                strokeWidth="0.08"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {stars.map((s) => (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.r}px`,
              height: `${s.r}px`,
              borderRadius: 999,
              background: `hsl(${s.hue} 90% 78%)`,
              opacity: s.o * 0.75,
            }}
          />
        ))}
      </div>
      <div style={ad.constFade} />
    </div>
  );
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    const onResize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    const seeded = (n: number) => {
      let s = n * 1567 + 12289;
      return () => { s = (s * 1567 + 12289) % 233280; return s / 233280; };
    };
    const rnd = seeded(13);
    const pts = Array.from({ length: 16 }, () => ({
      x: rnd() * w,
      y: (0.8 + rnd() * 0.6) * h,
      size: 1 + rnd() * 2.4,
      speed: (5 + rnd() * 7) * 0.012,
      drift: (-10 + rnd() * 20) * 0.3,
      hue: rnd() < 0.25 ? 220 : 186,
      progress: rnd(),
    }));
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.progress += p.speed / 100;
        if (p.progress > 1) { p.progress = 0; p.x = rnd() * w; p.y = (0.8 + rnd() * 0.3) * h; }
        const py = p.y - p.progress * h * 0.8;
        const px = p.x + Math.sin(p.progress * Math.PI * 2) * p.drift;
        const alpha = p.progress < 0.1 ? p.progress * 10 * 0.7
                    : p.progress > 0.85 ? (1 - p.progress) / 0.15 * 0.7 : 0.7;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue} 95% 75% / ${alpha.toFixed(2)})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

export function HeroMesh() {
  return (
    <div style={ad.meshWrap} aria-hidden="true">
      <div style={{ ...ad.meshBlob, ...ad.mesh1 }} className="ad-meshBlob" />
      <div style={{ ...ad.meshBlob, ...ad.mesh2 }} className="ad-meshBlob" />
      <div style={{ ...ad.meshBlob, ...ad.mesh3 }} className="ad-meshBlob" />
      <div style={ad.scanlines} />
    </div>
  );
}

/* ----- Interior page wrapper ----- */

export interface AuroraPageProps {
  active: string;
  onNavigate: AuroraNavigate;
  sectionLabel: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children: ReactNode;
}

export function AuroraPage({
  active,
  onNavigate,
  sectionLabel,
  eyebrow,
  title,
  lede,
  children,
}: AuroraPageProps) {
  return (
    <div style={ad.root}>
      <style>{`
        /* ---- Aurora mobile pass ---- */
        @media (max-width: 768px) {
          /* Nav — layout is handled by ADNav's own <style>, just adjust padding */
          .ad-navInner { padding: 12px 16px !important; }
          /* Page hero */
          .pp-heroInner { padding: 40px 20px 48px !important; }
          .pp-h1 { font-size: clamp(1.8rem, 7vw, 3rem) !important; }
          /* Grids */
          .pp-projectsGrid { grid-template-columns: 1fr !important; }
          .pp-sitesGrid { grid-template-columns: 1fr !important; }
          .pp-trackGrid { grid-template-columns: 1fr !important; }
          .pp-section { padding: 48px 20px 0 !important; }
          /* Footer */
          .ad-footerInner { flex-direction: column !important; gap: 20px !important; }
        }
        @media (max-width: 540px) {
          .pp-h1 { font-size: 1.7rem !important; }
          .pp-lede { font-size: 15px !important; }
        }
      `}</style>
      <ADTicker />
      <ADNav onNavigate={onNavigate} active={active} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        sectionLabel={sectionLabel}
        onNavigate={onNavigate}
      />
      <div style={pp.body}>{children}</div>
      <ADFooter />
    </div>
  );
}

function PageHero({
  eyebrow,
  title,
  lede,
  sectionLabel,
  onNavigate,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  sectionLabel: string;
  onNavigate: AuroraNavigate;
}) {
  return (
    <section style={pp.hero}>
      <div style={pp.heroAurora} aria-hidden="true">
        <div style={{ ...pp.blob, ...pp.blob1 }} className="ad-meshBlob" />
        <div style={{ ...pp.blob, ...pp.blob2 }} className="ad-meshBlob" />
      </div>
      <ConstellationField />
      <div style={pp.heroInner} className="pp-heroInner">
        <div style={pp.crumb}>
          <span style={pp.crumbDot} className="ad-pulse" />
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('labs');
            }}
            style={{ ...pp.crumbHome, textDecoration: 'none' }}
          >
            Shadewater Labs
          </a>
          <span style={pp.crumbSep}>/</span>
          <span style={pp.crumbCur}>{sectionLabel}</span>
        </div>
        <p style={pp.eyebrow}>{eyebrow}</p>
        <h1 style={pp.h1}>{title}</h1>
        <p style={pp.lede}>{lede}</p>
      </div>
      <div style={pp.heroBeam} />
    </section>
  );
}

/* ----- Page-level shared style sheet (`pp`) ----- */

export const pp: Record<string, CSSProperties> = {
  body: { paddingTop: 8 },

  hero: { position: 'relative', overflow: 'hidden', paddingBottom: 0 },
  heroAurora: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, contain: 'strict' as CSSProperties['contain'] },
  blob: { position: 'absolute', borderRadius: '50%', filter: 'blur(64px)', willChange: 'transform' },
  blob1: {
    width: 620, height: 620, top: -180, left: -120,
    background: 'radial-gradient(circle, hsl(186 95% 55% / 0.55), transparent 60%)',
    animation: 'adDrift1 28s ease-in-out infinite alternate',
  },
  blob2: {
    width: 540, height: 540, top: -120, right: -120,
    background: 'radial-gradient(circle, hsl(220 90% 55% / 0.5), transparent 60%)',
    animation: 'adDrift2 32s ease-in-out infinite alternate',
  },
  heroBeam: {
    height: 1, margin: '0 auto', maxWidth: 1180,
    background: 'linear-gradient(90deg, transparent, hsl(186 90% 60% / 0.5), transparent)',
  },
  heroInner: {
    position: 'relative', zIndex: 1,
    maxWidth: 1180, margin: '0 auto',
    padding: '52px 32px 56px',
    textAlign: 'left',
  },
  crumb: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em',
    padding: '7px 14px', borderRadius: 999,
    background: 'hsl(200 30% 8% / 0.65)',
    border: '1px solid hsl(186 60% 50% / 0.25)',
    color: 'hsl(186 35% 70%)',
    marginBottom: 22,
  },
  crumbDot: {
    width: 6, height: 6, borderRadius: 999, background: 'hsl(150 80% 60%)',
    boxShadow: '0 0 10px hsl(150 80% 60% / 0.7)',
    animation: 'adPulse 2.4s ease-in-out infinite',
  },
  crumbHome: { color: 'hsl(186 35% 70%)', cursor: 'pointer' },
  crumbCur: { color: '#fff', fontWeight: 600 },
  crumbSep: { color: 'hsl(186 25% 32%)' },

  eyebrow: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em',
    color: 'hsl(186 60% 78%)', margin: '0 0 14px',
  },
  h1: {
    fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700,
    margin: 0, maxWidth: 980, color: '#fff',
    background: 'linear-gradient(180deg, #fff 30%, hsl(186 30% 80%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textWrap: 'balance' as CSSProperties['textWrap'],
  },
  lede: {
    margin: '20px 0 0', maxWidth: 720,
    color: 'hsl(45 22% 86%)', fontSize: 18, lineHeight: 1.55,
  },

  section: { position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '56px 32px 0', zIndex: 1 },

  toolbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 18px', marginBottom: 22, borderRadius: 14,
    background: 'hsl(200 30% 8% / 0.6)',
    border: '1px solid hsl(186 50% 40% / 0.2)',
    flexWrap: 'wrap', gap: 12,
  },
  toolbarMono: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  toolbarChip: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(186 50% 78%)',
    padding: '5px 12px', borderRadius: 999,
    background: 'hsl(200 30% 6% / 0.7)', border: '1px solid hsl(186 40% 35% / 0.3)',
  },
  toolbarFilters: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  filterPill: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em',
    padding: '6px 12px', borderRadius: 999,
    color: 'hsl(186 30% 70%)',
    cursor: 'pointer',
  },
  filterActive: {
    color: '#04101b',
    background: 'linear-gradient(135deg, hsl(186 95% 75%), hsl(192 80% 60%))',
    boxShadow: '0 6px 20px hsl(186 90% 50% / 0.35)',
  },

  projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  projectCard: {
    position: 'relative', padding: 24, borderRadius: 24,
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
  projectTop: {
    position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 14, flexWrap: 'nowrap', gap: 10, minHeight: 27,
    minWidth: 0,
  },
  projectStage: {
    minWidth: 0,
    flex: '1 1 auto',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontFamily: MONO,
    fontSize: 10,
    letterSpacing: '0.24em',
    color: 'hsl(36 50% 75%)',
  },
  statusPill: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em',
    padding: '5px 11px', borderRadius: 999,
    background: 'hsl(0 0% 0% / 0.5)',
    border: '1px solid hsl(0 0% 100% / 0.1)',
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
  },
  statusDot: { width: 7, height: 7, borderRadius: 999 },
  projectArt: {
    position: 'relative',
    height: 180, borderRadius: 16, marginBottom: 16,
    background: 'linear-gradient(180deg, hsl(200 35% 14% / 0.85), hsl(200 30% 8% / 0.95))',
    border: '1px solid hsl(186 40% 35% / 0.3)',
    display: 'grid', placeItems: 'center', overflow: 'hidden',
  },
  projectLogo: {
    position: 'relative',
    zIndex: 1,
    display: 'block',
    width: 'min(68%, 180px)',
    height: 126,
    objectFit: 'contain',
    objectPosition: 'center',
    filter: 'drop-shadow(0 18px 34px hsl(210 80% 4% / 0.55))',
  },
  projectGlyph: {
    position: 'relative', zIndex: 1,
    width: 78, height: 78, borderRadius: 20,
    display: 'grid', placeItems: 'center',
    fontFamily: MONO, fontSize: 24, fontWeight: 700, color: '#04101b',
    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.4), 0 12px 28px hsl(186 80% 40% / 0.45)',
  },
  projectName: { position: 'relative', fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  projectBlurb: { position: 'relative', color: 'hsl(45 18% 82%)', fontSize: 14, lineHeight: 1.6, marginTop: 10 },

  progressRow: { position: 'relative', marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 },
  progressTrack: {
    flex: 1, height: 6, borderRadius: 999,
    background: 'hsl(200 30% 14% / 0.8)',
    border: '1px solid hsl(186 30% 25% / 0.4)',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 999 },
  progressVal: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.1em', color: 'hsl(186 50% 78%)', minWidth: 40, textAlign: 'right' },

  projectFoot: {
    position: 'relative',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 18, paddingTop: 14, borderTop: '1px solid hsl(186 30% 30% / 0.3)',
    flexWrap: 'wrap', gap: 8,
  },
  projectSig: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: TG_DIM },
  projectLink: { display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none' },

  sitesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 },
  siteCard: {
    position: 'relative', overflow: 'hidden',
    padding: '26px 28px', borderRadius: 24,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.3)',
    boxShadow: '0 20px 50px hsl(210 80% 4% / 0.5)',
  },
  siteGlow: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  siteTop: {
    position: 'relative',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 14, flexWrap: 'wrap', gap: 8,
  },
  siteRole: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', color: 'hsl(36 50% 75%)' },
  siteUrlRow: {
    position: 'relative',
    display: 'inline-flex', alignItems: 'center', gap: 0,
    fontFamily: MONO, fontSize: 13, letterSpacing: '0.04em',
    padding: '7px 14px', borderRadius: 10,
    background: 'hsl(200 30% 6% / 0.65)',
    border: '1px solid hsl(186 40% 35% / 0.25)',
  },
  siteUrlPrefix: { color: TG_DIM },
  siteUrl: { color: '#fff', fontWeight: 500, marginLeft: 2 },
  siteName: { position: 'relative', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '14px 0 0', color: '#fff' },
  siteBlurb: { position: 'relative', color: 'hsl(45 18% 82%)', fontSize: 14.5, lineHeight: 1.6, marginTop: 10, maxWidth: 540 },
  siteFoot: {
    position: 'relative',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 18, paddingTop: 14, borderTop: '1px solid hsl(186 30% 30% / 0.3)',
    flexWrap: 'wrap', gap: 8,
  },
  siteSig: { fontFamily: MONO, fontSize: 11, color: TG_DIM, letterSpacing: '0.18em' },
  siteVisit: { display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none' },

  newsList: { display: 'flex', flexDirection: 'column', gap: 18 },
  newsCard: {
    display: 'grid', gridTemplateColumns: '64px 1fr', gap: 0,
    padding: 0, borderRadius: 22,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.8), hsl(200 30% 7% / 0.92))',
    border: '1px solid hsl(186 50% 40% / 0.25)',
    overflow: 'hidden',
  },
  newsRail: {
    position: 'relative',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    padding: '22px 0',
    background: 'hsl(200 30% 7% / 0.5)',
    borderRight: '1px solid hsl(186 30% 30% / 0.25)',
  },
  newsRailNum: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: 'hsl(186 40% 65%)' },
  newsRailDot: { width: 9, height: 9, borderRadius: 999 },
  newsRailLine: { flex: 1, width: 1, background: 'linear-gradient(180deg, hsl(186 40% 50% / 0.4), transparent)' },
  newsBody: { padding: '24px 28px' },
  newsMeta: { display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', marginBottom: 12, flexWrap: 'wrap' },
  newsCat: { fontWeight: 600 },
  newsSep: { color: 'hsl(186 25% 32%)' },
  newsMono: { color: TG_MUTED },
  newsTitle: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: '#fff' },
  newsSummary: { color: 'hsl(45 18% 84%)', fontSize: 15.5, lineHeight: 1.6, marginTop: 10, maxWidth: 760 },
  newsTags: { marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  newsTag: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em',
    padding: '4px 10px', borderRadius: 999,
    background: 'hsl(186 30% 14% / 0.7)',
    border: '1px solid hsl(186 40% 35% / 0.3)',
    color: 'hsl(186 30% 78%)',
  },
  newsRead: { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none' },

  // Per-project simple page (SEO Report)
  projHero: { position: 'relative', overflow: 'hidden' },
  projHeroInner: { position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '60px 32px 64px' },
  projSplit: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'center', marginTop: 8 },
  projInfo: {},
  projBadge: {
    display: 'inline-block',
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em',
    padding: '6px 12px', borderRadius: 999,
    background: 'hsl(200 30% 6% / 0.7)',
    border: '1px solid', borderColor: 'hsl(186 60% 50% / 0.4)',
    marginBottom: 18,
  },
  projTitle: {
    fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.025em', fontWeight: 700,
    margin: 0, color: '#fff',
    background: 'linear-gradient(180deg, #fff 30%, hsl(186 30% 80%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  projDesc: { margin: '18px 0 0', maxWidth: 560, color: 'hsl(45 22% 86%)', fontSize: 17, lineHeight: 1.55 },
  projCtas: { display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' },
  projMetaRow: { marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' },
  projMetaCell: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: TG_DIM,
    padding: '5px 12px', borderRadius: 999,
    background: 'hsl(200 30% 6% / 0.65)',
    border: '1px solid hsl(186 40% 35% / 0.25)',
  },
  projHeroArt: { position: 'relative', height: 360, display: 'grid', placeItems: 'center' },
  projArtGlow: { position: 'absolute', inset: '-40px', filter: 'blur(40px)', pointerEvents: 'none' },
  projOrb: { position: 'relative', width: 320, height: 320, display: 'grid', placeItems: 'center' },
  projOrbRing: {
    position: 'absolute', inset: 0, borderRadius: '50%',
    border: '1px dashed hsl(186 60% 60% / 0.4)',
    animation: 'adRotate 32s linear infinite',
  },
  projOrbRing2: {
    position: 'absolute', inset: 24, borderRadius: '50%',
    border: '1px solid hsl(186 60% 60% / 0.18)',
    animation: 'adRotate 52s linear infinite reverse',
  },
  projOrbCore: {
    width: 200, height: 200, borderRadius: '50%',
    display: 'grid', placeItems: 'center',
    boxShadow: '0 30px 80px hsl(186 90% 50% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.3)',
  },
  projOrbGlyph: { fontFamily: MONO, fontSize: 56, fontWeight: 700, color: '#04101b', letterSpacing: '0.02em' },

  metricRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
    padding: '20px 24px', borderRadius: 22,
    background: 'hsl(200 30% 8% / 0.7)',
    border: '1px solid hsl(186 60% 50% / 0.25)',
    boxShadow: '0 20px 50px hsl(210 80% 4% / 0.4)',
  },
  metric: {
    display: 'flex', flexDirection: 'column', gap: 4,
    paddingLeft: 14, borderLeft: '1px solid hsl(186 50% 40% / 0.2)',
  },
  metricKey: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: 'hsl(186 35% 65%)' },
  metricVal: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
  metricSub: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.06em', color: 'hsl(36 30% 70%)' },

  kicker2: { display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  kickerLine2: { display: 'block', width: 28, height: 1, background: 'hsl(186 70% 60% / 0.4)' },
  kickerText2: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em', color: 'hsl(186 60% 78%)' },
  h2: { fontSize: 44, lineHeight: 1.04, letterSpacing: '-0.02em', fontWeight: 700, margin: '0 0 28px', color: '#fff' },

  steps: { display: 'grid', gap: 12 },
  step: {
    position: 'relative',
    display: 'grid', gridTemplateColumns: '64px 1fr 32px', gap: 18, alignItems: 'center',
    padding: '20px 24px', borderRadius: 18,
    background: 'hsl(200 30% 9% / 0.75)',
    border: '1px solid hsl(186 50% 40% / 0.22)',
  },
  stepNum: { fontFamily: MONO, fontSize: 22, fontWeight: 700, color: 'hsl(186 70% 75%)', letterSpacing: '0.02em' },
  stepTitle: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  stepBody: { color: 'hsl(45 18% 82%)', fontSize: 14.5, lineHeight: 1.55, marginTop: 6 },
  stepDot: { width: 8, height: 8, borderRadius: 999, background: 'hsl(186 90% 60%)', boxShadow: '0 0 14px hsl(186 90% 60% / 0.6)', justifySelf: 'end' },
};

/* ----- Top-level shared style sheet (`ad`) ----- */

export const ad: Record<string, CSSProperties> = {
  root: {
    fontFamily: SANS,
    color: TG_TEXT,
    background: AD_BG,
    backgroundImage: 'linear-gradient(180deg, #02080f 0%, #03101a 60%, #020a13 100%)',
    minHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  ticker: {
    position: 'relative', overflow: 'hidden',
    background: 'hsl(186 50% 12% / 0.6)',
    borderBottom: '1px solid hsl(186 50% 40% / 0.25)',
    height: 30,
  },
  tickerLane: {
    display: 'flex', gap: 28, whiteSpace: 'nowrap',
    animation: 'adTicker 50s linear infinite',
    paddingLeft: 32, height: '100%', alignItems: 'center',
    willChange: 'transform',
  },
  tickerItem: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: 'hsl(186 50% 80%)',
  },
  tickerDot: { width: 5, height: 5, borderRadius: 999, background: 'hsl(186 90% 60%)', boxShadow: '0 0 10px hsl(186 90% 60%)' },
  tickerSep: { color: 'hsl(186 30% 30%)' },

  nav: {
    position: 'sticky', top: 0, zIndex: 20,
    background: 'hsl(210 66% 5% / 0.7)',
    backdropFilter: 'blur(14px) saturate(140%)',
    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
    borderBottom: '1px solid hsl(186 50% 40% / 0.18)',
  },
  navInner: {
    maxWidth: 1180, margin: '0 auto', padding: '14px 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 16,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' },
  brandMark: { height: 44, filter: 'drop-shadow(0 6px 20px hsl(186 90% 50% / 0.5))' },
  brandText: { display: 'flex', flexDirection: 'column', gap: 4, lineHeight: 1 },
  brandEyebrow: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: 'hsl(186 50% 70%)' },
  brandWord: { fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  navLink: { padding: '8px 14px', borderRadius: 999, color: TG_MUTED, fontSize: 14, fontWeight: 500, cursor: 'pointer', textDecoration: 'none' },
  navLinkActive: {
    color: '#fff',
    background: 'linear-gradient(135deg, hsl(186 65% 22%), hsl(220 60% 28%))',
    boxShadow: 'inset 0 0 0 1px hsl(186 90% 60% / 0.3), 0 0 30px hsl(186 90% 50% / 0.25)',
  },
  navCta: {
    marginLeft: 10, display: 'inline-flex', alignItems: 'center',
    padding: '9px 16px', borderRadius: 999,
    color: '#04101b', fontWeight: 600, fontSize: 14,
    background: 'linear-gradient(135deg, hsl(186 95% 75%), hsl(220 85% 75%))',
    boxShadow: '0 10px 28px hsl(186 90% 50% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.5)',
    cursor: 'pointer', textDecoration: 'none',
  },

  meshWrap: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, contain: 'strict' as CSSProperties['contain'] },
  meshBlob: { position: 'absolute', borderRadius: '50%', filter: 'blur(64px)', willChange: 'transform' },
  mesh1: { width: 780, height: 780, top: -200, left: -160, background: 'radial-gradient(circle, hsl(186 95% 55% / 0.55), transparent 60%)', animation: 'adDrift1 28s ease-in-out infinite alternate' },
  mesh2: { width: 720, height: 720, top: -120, right: -180, background: 'radial-gradient(circle, hsl(220 90% 55% / 0.5), transparent 60%)', animation: 'adDrift2 32s ease-in-out infinite alternate' },
  mesh3: { width: 620, height: 620, top: 320, left: '36%', background: 'radial-gradient(circle, hsl(150 70% 50% / 0.4), transparent 60%)', animation: 'adDrift3 24s ease-in-out infinite alternate' },
  mesh4: { width: 540, height: 540, top: 600, left: '8%', background: 'radial-gradient(circle, hsl(280 65% 55% / 0.32), transparent 60%)', animation: 'adDrift1 36s ease-in-out infinite alternate-reverse' },
  scanlines: {
    position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, hsl(0 0% 100% / 0.012) 3px, hsl(0 0% 100% / 0.012) 4px)',
    mixBlendMode: 'overlay',
  },
  constWrap: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', contain: 'strict' as CSSProperties['contain'] },
  constSpin: {
    position: 'absolute', left: '-15%', right: '-15%', top: '-15%', bottom: '-15%',
    animation: 'adRotate 240s linear infinite', transformOrigin: '50% 50%',
    willChange: 'transform',
  },
  constFade: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 50% 30%, transparent 30%, #020a13 90%)' },
  particleWrap: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', contain: 'strict' as CSSProperties['contain'] },

  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '14px 26px', borderRadius: 999,
    color: '#04101b', fontWeight: 600, fontSize: 15,
    background: 'linear-gradient(135deg, hsl(186 95% 78%), hsl(192 80% 60%) 50%, hsl(220 85% 70%))',
    boxShadow: '0 18px 48px hsl(186 90% 50% / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.5)',
    cursor: 'pointer', textDecoration: 'none',
  },
  btnGhost: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '13px 24px', borderRadius: 999,
    color: 'hsl(186 60% 82%)', fontWeight: 500, fontSize: 15,
    background: 'hsl(186 50% 20% / 0.12)',
    border: '1px solid hsl(186 60% 55% / 0.28)',
    boxShadow: '0 4px 20px hsl(186 90% 50% / 0.10)',
    cursor: 'pointer', textDecoration: 'none',
  },

  footer: {
    position: 'relative', marginTop: 80,
    borderTop: '1px solid hsl(186 50% 40% / 0.15)',
    background: 'hsl(210 66% 4% / 0.8)',
  },
  footerBeam: {
    position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
    background: 'linear-gradient(90deg, transparent, hsl(186 90% 60% / 0.5), transparent)',
  },
  footerInner: {
    maxWidth: 1180, margin: '0 auto', padding: '32px 32px 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
    flexWrap: 'wrap' as CSSProperties['flexWrap'],
  },
  footerBrand: { display: 'flex', alignItems: 'center', gap: 12 },
  footerMark: { height: 36, width: 'auto', filter: 'drop-shadow(0 4px 12px hsl(186 90% 50% / 0.4))' },
  footerWord: { fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: '#fff' },
  footerEyebrow: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: 'hsl(186 50% 70%)', marginTop: 3 },
  footerMono: { display: 'flex', gap: 24, flexWrap: 'wrap' as CSSProperties['flexWrap'] },
  footerCell: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: TG_DIM },
};
