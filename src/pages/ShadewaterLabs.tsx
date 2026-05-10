import { type CSSProperties } from 'react';
import { projectStatuses } from '@/content/projects';
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
  adTone,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

/* ------------------------------------------------------------------ */
/* Aurora Drift home — direction B from the Futurized handoff bundle. */
/* ------------------------------------------------------------------ */

interface ShadewaterLabsProps {
  onNavigate: AuroraNavigate;
}

interface AdProject {
  badge: string;
  name: string;
  blurb: string;
  accent: string;
  glyph?: string;
  logo?: { src: string; srcSet?: string };
  sig: string;
  status: string;
  statusTone: 'green' | 'cyan' | 'amber';
  page: string;
}

const AD_TRACKS = [
  {
    id: '01',
    title: 'AI Tools & Creative Tech',
    body:
      'Prompt rigs, automation flows, creative software experiments. Where generative models become instruments.',
    sigil: '◐',
    accent: '186 90% 60%',
  },
  {
    id: '02',
    title: 'Websites & Coding Builds',
    body:
      'Custom web apps, utilities, and small ships. Software made for the way I actually work.',
    sigil: '◑',
    accent: '210 85% 65%',
  },
  {
    id: '03',
    title: 'Future Tech Experiments',
    body:
      'A workshop for prototypes — emerging-tech ideas, rough spikes, and the occasional graduate.',
    sigil: '◓',
    accent: '150 65% 55%',
  },
];

const AD_COMING = [
  { code: 'L-04', label: 'New AI tools and coding utilities' },
  { code: 'L-05', label: 'Experimental web apps and creative software' },
  { code: 'L-06', label: 'Behind-the-scenes technology notes' },
  { code: 'L-07', label: 'Small digital downloads for creators' },
];

function ADHero({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <section style={ad.hero ?? home.hero}>
      <HeroMesh />
      <ConstellationField />
      <ParticleField />
      <div style={home.heroInner}>
        <div style={home.heroChip}>
          <span style={home.heroChipPulse} className="ad-pulse" />
          <span style={home.heroChipText}>LAB.SIGNAL · ONLINE</span>
          <span style={home.heroChipMono}>52.486°N · 1.890°W · 10:42</span>
        </div>

        <img
          src={SHADEWATER_LABS_TEXT_LOGO_CROPPED_SRC}
          alt={SHADEWATER_LABS_TEXT_LOGO_ALT}
          style={{ ...home.heroLogo, objectFit: 'cover', width: 175, height: 250 }}
        />

        <h1 style={home.heroTitle}>
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
              LAB · LIVE READOUT
            </div>
            <div style={home.hudMeta}>last refresh · 8s</div>
          </div>
          <div style={home.hudGrid}>
            <HudCell k="ACTIVE_BUILDS" v="03" sub="2 shipping · 1 spike" />
            <HudCell k="SHIPPED_2025" v="07" sub="+2 vs 2024" />
            <HudCell k="MODELS_USED" v="04" sub="claude · gpt · llama · sd" />
            <HudCell k="CURRENT_FOCUS" v="img/io" sub="webp pipeline v0.9.4" />
          </div>
          <div style={home.hudSparkRow}>
            <div style={home.hudSparkLabel}>signal · 28d</div>
            <Sparkline />
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

function Sparkline() {
  const points = [12, 14, 9, 18, 16, 22, 19, 28, 24, 30, 26, 34, 31, 38, 36, 44, 41, 48, 52, 47, 56, 60, 58, 64, 70, 66, 72, 75];
  const max = Math.max(...points);
  const w = 720;
  const h = 38;
  const dx = w / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * dx).toFixed(1)},${(h - (p / max) * h).toFixed(1)}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={home.spark}>
      <defs>
        <linearGradient id="adSparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(186 90% 60%)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(186 90% 60%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#adSparkFill)" />
      <path d={path} fill="none" stroke="hsl(186 90% 70%)" strokeWidth="1.4" />
    </svg>
  );
}

function SectionHead({ step, title, sub, align = 'center' }: { step: string; title: string; sub: string; align?: 'center' | 'left' }) {
  return (
    <div style={{ ...home.sectionHead, textAlign: align, margin: align === 'left' ? '0 0 32px' : '0 auto 40px' }}>
      <div style={{ ...home.kicker, justifyContent: align === 'left' ? 'flex-start' : 'center' }}>
        <span style={home.kickerLine} />
        <span style={home.kickerText}>§ {step} · LAB</span>
        <span style={home.kickerLine} />
      </div>
      <h2 style={home.h2}>{title}</h2>
      <p style={{ ...home.sub, maxWidth: align === 'left' ? 'unset' : 720, margin: align === 'left' ? '12px 0 0' : '14px auto 0' }}>{sub}</p>
    </div>
  );
}

function ADTracks() {
  return (
    <section id="labs-tracks" style={home.section}>
      <SectionHead step="02" title="What lives here" sub="Three working currents inside the lab." />
      <div style={home.trackGrid}>
        {AD_TRACKS.map((t) => (
          <article key={t.id} style={home.trackCard}>
            <div style={{ ...home.trackHalo, background: `radial-gradient(120% 100% at 50% -10%, hsl(${t.accent} / 0.40), transparent 65%)` }} />
            <div style={home.trackTop}>
              <span style={home.trackId}>TRACK_{t.id}</span>
              <span style={{ ...home.trackSigil, color: `hsl(${t.accent})` }}>{t.sigil}</span>
            </div>
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
  const seoReport = projectStatuses['shadewater-seo-report'];
  const webp = projectStatuses['webp-me-daddy'];
  const ink = projectStatuses['inkmaster-studio'];

  const projects: AdProject[] = [
    {
      badge: 'INTERNAL · OPERATOR',
      name: seoReport.name,
      blurb: 'Deterministic SEO audit skill — turns live evidence into branded dashboards, action plans, and rerunnable fix loops.',
      accent: '186 90% 60%',
      glyph: 'SR',
      sig: 'sig · 7af2',
      status: 'OPERATIONAL',
      statusTone: 'green',
      page: 'shadewater-seo-report',
    },
    {
      badge: 'FEATURED · PIPELINE',
      name: webp.name,
      blurb: 'Layout-aware image pipeline. Messy assets become recipe-driven WebPs with strict metadata, proof sheets, and audits.',
      accent: '184 85% 58%',
      logo: webp.hero.logo ? { src: webp.hero.logo.src, srcSet: webp.hero.logo.srcSet } : undefined,
      sig: 'sig · 19c4',
      status: 'SHIPPING v0.9.4',
      statusTone: 'cyan',
      page: 'webp-me-daddy',
    },
    {
      badge: 'BETA · PRODUCT',
      name: ink.name,
      blurb: 'Browser-based print-prep for apparel graphics. Knockout cleanup, texture controls, mockups, underbase, exports.',
      accent: '219 85% 65%',
      logo: ink.hero.logo ? { src: ink.hero.logo.src, srcSet: ink.hero.logo.srcSet } : undefined,
      sig: 'sig · b83e',
      status: 'CLOSED BETA',
      statusTone: 'amber',
      page: 'inkmaster-studio',
    },
  ];

  return (
    <section id="labs-projects" style={home.section}>
      <SectionHead step="03" title="Things that already live here" sub="Working software with its own product page, progress notes, and a clearer production story." />
      <div style={home.projectGrid}>
        {projects.map((p) => (
          <article key={p.name} style={home.projectCard}>
            <div style={{ ...home.projectGlow, background: `radial-gradient(85% 70% at 50% 0%, hsl(${p.accent} / 0.35), transparent 65%)` }} />
            <div style={home.projectScan} />
            <div style={home.projectTop}>
              <span style={home.projectBadge}>{p.badge}</span>
              <span style={home.projectStatus}>
                <span style={{ ...home.statusDot, background: adTone[p.statusTone] }} />
                <span style={{ color: adTone[p.statusTone] }}>{p.status}</span>
              </span>
            </div>
            <div style={{ ...home.projectArt, boxShadow: `0 18px 50px hsl(${p.accent} / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.06)` }}>
              {p.logo ? (
                <img src={p.logo.src} srcSet={p.logo.srcSet} sizes="(min-width: 1024px) 14rem, 40vw" alt="" loading="lazy" decoding="async" style={home.projectLogo} />
              ) : (
                <div style={{ ...home.projectGlyph, background: `conic-gradient(from 220deg at 50% 50%, hsl(${p.accent}), hsl(${p.accent} / 0.4), hsl(${p.accent}))` }}>
                  <span>{p.glyph}</span>
                </div>
              )}
              <div style={home.projectArtCorner}><span>◜</span></div>
            </div>
            <h3 style={home.projectName}>{p.name}</h3>
            <p style={home.projectBlurb}>{p.blurb}</p>
            <div style={home.projectFoot}>
              <span style={home.projectSig}>{p.sig}</span>
              <a href={`/${p.page}`} onClick={(e) => { e.preventDefault(); onNavigate(p.page); }} style={{ ...home.projectLink, color: `hsl(${p.accent})` }}>
                Open <span style={{ marginLeft: 4 }}>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ADComing() {
  return (
    <section style={home.section}>
      <div style={home.comingPanel}>
        <div style={home.comingGlow} />
        <div style={home.comingHead}>
          <SectionHead step="04" title="On the bench" sub="Sketches and queued experiments — no ship dates, just intent." align="left" />
        </div>
        <ul style={home.comingList}>
          {AD_COMING.map((c) => (
            <li key={c.code} style={home.comingItem}>
              <span style={home.comingCode}>{c.code}</span>
              <span style={home.comingLabel}>{c.label}</span>
              <span style={home.comingTag}>
                <span style={home.comingTagDot} className="ad-pulse" />
                queued
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
  hudSparkRow: { marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 },
  hudSparkLabel: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: 'hsl(186 35% 65%)' },
  spark: { flex: 1, height: 38 },

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
  trackTop: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  trackId: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: 'hsl(186 60% 75%)' },
  trackSigil: { fontSize: 22, lineHeight: 1, filter: 'drop-shadow(0 0 14px currentColor)' },
  trackTitle: { position: 'relative', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  trackBody: { position: 'relative', color: 'hsl(45 18% 84%)', fontSize: 15, lineHeight: 1.6, marginTop: 12 },
  trackLine: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, opacity: 0.8 },

  projectGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
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
    marginTop: 22, paddingTop: 16, borderTop: '1px solid hsl(186 30% 30% / 0.3)',
  },
  projectSig: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: TG_DIM },
  projectLink: { display: 'inline-flex', alignItems: 'center', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none' },

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
    display: 'grid', gridTemplateColumns: '92px 1fr auto', alignItems: 'center', gap: 18,
    padding: '14px 18px', borderRadius: 14,
    background: 'hsl(200 30% 7% / 0.7)', border: '1px solid hsl(186 50% 40% / 0.2)',
  },
  comingCode: { fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', color: 'hsl(186 60% 75%)' },
  comingLabel: { fontSize: 16, color: '#fff' },
  comingTag: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'hsl(36 60% 78%)' },
  comingTagDot: {
    width: 6, height: 6, borderRadius: 999, background: 'hsl(36 80% 60%)',
    boxShadow: '0 0 10px hsl(36 80% 60% / 0.7)', animation: 'adPulse 2.4s ease-in-out infinite',
  },
};
