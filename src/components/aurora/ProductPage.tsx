import { type CSSProperties, type ReactNode } from 'react';
import {
  ad,
  ADFooter,
  ADNav,
  ADTicker,
  ConstellationField,
  MONO,
  TG_DIM,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

/* ------------------------------------------------------------------ */
/* Aurora Drift product-page chrome (shared by Webp Me Daddy +        */
/* InkMaster Studio).                                                 */
/* ------------------------------------------------------------------ */

export function shiftHue(accent: string, delta: number): string {
  return accent.replace(/^(\d+)( \d+%)/, (_, h: string, rest: string) => `${parseInt(h, 10) + delta}${rest}`);
}

interface CtaCopy {
  primary: string;
  primaryHref?: string;
  secondary: string;
  secondaryHref?: string;
}

interface MetricItem { k: string; v: string; sub: string; }
interface PurposeItem { id: string; title: string; description: string; }
interface ShowcaseItem { id: string; label: string; title: string; description: string; tag: string; command: string; featured?: boolean; }
interface ComparisonItem { id: string; title: string; description: string; }
interface LimitationItem { id: string; title: string; description: string; }
interface WorkflowStep { id: string; label: string; title: string; description: string; }
interface SectionCopy { title: string; description: string; }

export interface ProductPageData {
  sectionLabel: string;
  accent: string;
  badge: string;
  eyebrow: string;
  name: string;
  lede: string;
  logo: { src: string; srcSet?: string; style?: CSSProperties };
  meta: string[];
  cta: CtaCopy;
  metrics: MetricItem[];
  stage: { progress: number; headline: string; summary: string };
  purpose: { section: SectionCopy; items: PurposeItem[] };
  workflow: { eyebrow: string; title: string; steps: WorkflowStep[] };
  showcase: ShowcaseItem[];
  comparison: { section: SectionCopy; items: ComparisonItem[] };
  limitations: { section: SectionCopy; items: LimitationItem[] };
  finalCta: { title: string; body: string };
}

export interface ProductPageProps {
  data: ProductPageData;
  onNavigate: AuroraNavigate;
}

export default function ProductPage({ data, onNavigate }: ProductPageProps) {
  return (
    <div style={ad.root}>
      <style>{`
        @media (max-width: 768px) {
          .prod-section { padding: 40px 20px 0 !important; }
          .prod-heroInner { padding: 32px 20px 48px !important; }
          .prod-heroSplit { grid-template-columns: 1fr !important; }
          .prod-heroArt { display: none !important; }
          .prod-h1 { font-size: clamp(2rem, 10vw, 3.5rem) !important; line-height: 1.08 !important; }
          .prod-h2 { font-size: clamp(1.6rem, 7vw, 2.5rem) !important; }
          .prod-metricStrip { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; padding: 18px 16px !important; }
          .prod-purposeGrid { grid-template-columns: 1fr !important; }
          .prod-step { grid-template-columns: 48px 1fr !important; }
          .prod-stepLine { display: none !important; }
          .prod-stepDot { display: none !important; }
          .prod-showcaseGrid { grid-template-columns: 1fr !important; }
          .prod-showcaseFeatured { grid-column: span 1 !important; }
          .prod-compareGrid { grid-template-columns: 1fr !important; }
          .prod-limitRow { grid-template-columns: 1fr !important; gap: 10px !important; }
          .prod-ctaWrap { padding: 28px 20px !important; }
        }
        @media (max-width: 480px) {
          .prod-metricStrip { grid-template-columns: repeat(2, 1fr) !important; }
          .prod-h1 { font-size: 2rem !important; }
        }
      `}</style>
      <ADTicker />
      <ADNav onNavigate={onNavigate} active="projects" />
      <Hero data={data} onNavigate={onNavigate} />
      <MetricStrip accent={data.accent} metrics={data.metrics} />
      <StageStrip accent={data.accent} stage={data.stage} />
      <PurposeGrid accent={data.accent} section={data.purpose.section} items={data.purpose.items} />
      <WorkflowSteps accent={data.accent} eyebrow={data.workflow.eyebrow} title={data.workflow.title} steps={data.workflow.steps} />
      <ShowcaseGrid accent={data.accent} items={data.showcase} />
      <ComparisonRow accent={data.accent} section={data.comparison.section} items={data.comparison.items} />
      <LimitationsRow section={data.limitations.section} items={data.limitations.items} />
      <ProductCta accent={data.accent} cta={data.cta} title={data.finalCta.title} body={data.finalCta.body} />
      <ADFooter />
    </div>
  );
}

function Hero({ data, onNavigate }: { data: ProductPageData; onNavigate: AuroraNavigate }) {
  const { accent, sectionLabel, badge, eyebrow, name, lede, logo, meta, cta } = data;
  const blob2 = shiftHue(accent, 36);
  return (
    <section style={prod.hero}>
      <div style={prod.heroAurora} aria-hidden="true">
        <div style={{ ...prod.blob, ...prod.blob1, background: `radial-gradient(circle, hsl(${accent} / 0.55), transparent 60%)` }} className="ad-meshBlob" />
        <div style={{ ...prod.blob, ...prod.blob2, background: `radial-gradient(circle, hsl(${blob2} / 0.42), transparent 60%)` }} className="ad-meshBlob" />
      </div>
      <ConstellationField />

      <div style={prod.heroInner} className="prod-heroInner">
        <div style={prod.crumb}>
          <span style={prod.crumbDot} className="ad-pulse" />
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('labs'); }} style={{ ...prod.crumbHome, textDecoration: 'none' }}>Labs</a>
          <span style={prod.crumbSep}>/</span>
          <a href="/projects" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }} style={{ ...prod.crumbHome, textDecoration: 'none' }}>Projects</a>
          <span style={prod.crumbSep}>/</span>
          <span style={prod.crumbCur}>{sectionLabel}</span>
        </div>

        <div style={prod.heroSplit} className="prod-heroSplit">
          <div>
            <span style={{ ...prod.badge, color: `hsl(${accent})`, borderColor: `hsl(${accent} / 0.45)` }}>{badge}</span>
            <p style={prod.eyebrow}>{eyebrow}</p>
            <h1 style={prod.h1} className="prod-h1">{name}</h1>
            <p style={prod.lede}>{lede}</p>

            <div style={prod.ctaRow}>
              <a
                href={cta.primaryHref ?? '#'}
                target={cta.primaryHref?.startsWith('http') ? '_blank' : undefined}
                rel={cta.primaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ ...ad.btnPrimary, background: `linear-gradient(135deg, hsl(${accent} / 0.95), hsl(${shiftHue(accent, 24)}))` }}
              >
                {cta.primary} <span>→</span>
              </a>
              <a
                href={cta.secondaryHref ?? '#'}
                target={cta.secondaryHref?.startsWith('http') ? '_blank' : undefined}
                rel={cta.secondaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={ad.btnGhost}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
                {cta.secondary}
              </a>
            </div>

            <div style={prod.metaRow}>
              {meta.map((m) => (<span key={m} style={prod.metaCell}>{m}</span>))}
            </div>
          </div>

          <div style={prod.heroArt} className="prod-heroArt">
            <div style={{ ...prod.artGlow, background: `radial-gradient(60% 60% at 50% 50%, hsl(${accent} / 0.55), transparent 70%)` }} />
            <div style={prod.artFrame}>
              <div style={prod.artGrid} />
              <div style={{ ...prod.artRing, borderColor: `hsl(${accent} / 0.35)` }} />
              <div style={{ ...prod.artRing2, borderColor: `hsl(${accent} / 0.18)` }} />
              <img src={logo.src} srcSet={logo.srcSet} alt="" style={{ ...prod.artLogo, ...logo.style }} />
              <div style={prod.artCorners} aria-hidden="true">
                <span style={{ ...prod.artCorner, top: 10, left: 10, borderTop: `1px solid hsl(${accent} / 0.5)`, borderLeft: `1px solid hsl(${accent} / 0.5)` }} />
                <span style={{ ...prod.artCorner, top: 10, right: 10, borderTop: `1px solid hsl(${accent} / 0.5)`, borderRight: `1px solid hsl(${accent} / 0.5)` }} />
                <span style={{ ...prod.artCorner, bottom: 10, left: 10, borderBottom: `1px solid hsl(${accent} / 0.5)`, borderLeft: `1px solid hsl(${accent} / 0.5)` }} />
                <span style={{ ...prod.artCorner, bottom: 10, right: 10, borderBottom: `1px solid hsl(${accent} / 0.5)`, borderRight: `1px solid hsl(${accent} / 0.5)` }} />
              </div>
              <div style={{ ...prod.artStamp, color: `hsl(${accent})` }}>// {sectionLabel.toLowerCase().replace(/ /g, '-')}.lab</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kicker({ accent, label, tone = 'accent' }: { accent: string; label: string; tone?: 'accent' | 'amber' }) {
  const lineColor = tone === 'amber' ? 'hsl(36 80% 60% / 0.5)' : `hsl(${accent} / 0.4)`;
  const textColor = tone === 'amber' ? 'hsl(36 75% 75%)' : `hsl(${accent} / 0.85)`;
  return (
    <div style={prod.kicker}>
      <span style={{ ...prod.kickerLine, background: lineColor }} />
      <span style={{ ...prod.kickerText, color: textColor }}>{label}</span>
      <span style={{ ...prod.kickerLine, background: lineColor }} />
    </div>
  );
}

function MetricStrip({ accent, metrics }: { accent: string; metrics: MetricItem[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <div style={prod.metricStrip} className="prod-metricStrip">
        {metrics.map((m) => (
          <div key={m.k} style={prod.metricCell}>
            <div style={{ ...prod.metricKey, color: `hsl(${accent} / 0.7)` }}>{m.k}</div>
            <div style={prod.metricVal}>{m.v}</div>
            <div style={prod.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StageStrip({ accent, stage }: { accent: string; stage: ProductPageData['stage'] }) {
  return (
    <section style={prod.section} className="prod-section">
      <div style={prod.stageWrap}>
        <div style={prod.stageHead}>
          <div style={prod.stageMeta}>
            <span style={{ ...prod.stageDot, background: `hsl(${accent})`, boxShadow: `0 0 14px hsl(${accent} / 0.6)` }} />
            <span style={prod.stageMono}>CURRENT_STAGE</span>
            <span style={prod.stageSep}>/</span>
            <span style={prod.stageMono}>last_synced · 2026.05.07</span>
          </div>
          <span style={prod.stageProg}>{stage.progress}%</span>
        </div>
        <h3 style={prod.stageHeadline}>{stage.headline}</h3>
        <p style={prod.stageBody}>{stage.summary}</p>
        <div style={prod.stageTrack}>
          <div style={{ ...prod.stageFill, width: `${stage.progress}%`, background: `linear-gradient(90deg, hsl(${accent}), hsl(${shiftHue(accent, 30)}))`, boxShadow: `0 0 22px hsl(${accent} / 0.55)` }} />
        </div>
      </div>
    </section>
  );
}

function PurposeGrid({ accent, section, items }: { accent: string; section: SectionCopy; items: PurposeItem[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <Kicker accent={accent} label="§ 02 · WHY IT EXISTS" />
      <h2 style={prod.h2} className="prod-h2">{section.title}</h2>
      <p style={prod.h2Lede}>{section.description}</p>
      <div style={prod.purposeGrid} className="prod-purposeGrid">
        {items.map((it, i) => (
          <article key={it.id} style={prod.purposeCard}>
            <div style={{ ...prod.purposeHalo, background: `radial-gradient(120% 70% at 0% 0%, hsl(${accent} / 0.18), transparent 60%)` }} />
            <span style={{ ...prod.purposeIdx, color: `hsl(${accent})` }}>0{i + 1}</span>
            <h3 style={prod.purposeTitle}>{it.title}</h3>
            <p style={prod.purposeBody}>{it.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkflowSteps({ accent, eyebrow, title, steps }: { accent: string; eyebrow: string; title: string; steps: WorkflowStep[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <Kicker accent={accent} label={`§ 03 · ${eyebrow.toUpperCase()}`} />
      <h2 style={prod.h2} className="prod-h2">{title}</h2>
      <div style={prod.steps}>
        {steps.map((s) => (
          <div key={s.id} style={prod.step} className="prod-step">
            <div style={{ ...prod.stepNum, color: `hsl(${accent})` }}>{s.label}</div>
            <div style={prod.stepLine} className="prod-stepLine" />
            <div>
              <h4 style={prod.stepTitle}>{s.title}</h4>
              <p style={prod.stepBody}>{s.description}</p>
            </div>
            <div style={{ ...prod.stepDot, background: `hsl(${accent})`, boxShadow: `0 0 14px hsl(${accent} / 0.6)` }} className="prod-stepDot" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseGrid({ accent, items }: { accent: string; items: ShowcaseItem[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <Kicker accent={accent} label="§ 04 · ARTIFACTS" />
      <h2 style={prod.h2} className="prod-h2">What it actually outputs</h2>
      <div style={prod.showcaseGrid} className="prod-showcaseGrid">
        {items.map((it) => (
          <article key={it.id} style={{ ...prod.showcaseCard, ...(it.featured ? prod.showcaseFeatured : null) }} className={it.featured ? 'prod-showcaseFeatured' : undefined}>
            <div style={{ ...prod.showcaseGlow, background: `radial-gradient(80% 60% at 50% 0%, hsl(${accent} / 0.22), transparent 65%)` }} />
            <div style={prod.showcaseTop}>
              <span style={{ ...prod.showcaseLabel, color: `hsl(${accent})` }}>{it.label}</span>
              <span style={prod.showcaseSig}>// {String(it.id).slice(0, 4)}</span>
            </div>
            <h3 style={prod.showcaseTitle}>{it.title}</h3>
            <p style={prod.showcaseDesc}>{it.description}</p>
            <div style={prod.showcasePlaceholder}>
              <div style={{ ...prod.showcasePlaceholderShine, background: `linear-gradient(135deg, hsl(${accent} / 0.18), transparent 70%)` }} />
              <span style={prod.showcasePlaceholderTag}>{it.tag}</span>
            </div>
            <div style={prod.showcaseCmd}>
              <span style={{ ...prod.showcasePrompt, color: `hsl(${accent})` }}>$</span>
              <span style={prod.showcaseCmdText}>{it.command}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComparisonRow({ accent, section, items }: { accent: string; section: SectionCopy; items: ComparisonItem[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <Kicker accent={accent} label="§ 05 · POSITIONING" />
      <h2 style={prod.h2} className="prod-h2">{section.title}</h2>
      <p style={prod.h2Lede}>{section.description}</p>
      <div style={prod.compareGrid} className="prod-compareGrid">
        {items.map((c, i) => (
          <article key={c.id} style={prod.compareCard}>
            <span style={{ ...prod.compareIdx, color: `hsl(${accent})` }}>v{i + 1}</span>
            <h3 style={prod.compareTitle}>{c.title}</h3>
            <p style={prod.compareBody}>{c.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LimitationsRow({ section, items }: { section: SectionCopy; items: LimitationItem[] }) {
  return (
    <section style={prod.section} className="prod-section">
      <Kicker accent="" label="§ 06 · CAVEATS" tone="amber" />
      <h2 style={prod.h2} className="prod-h2">{section.title}</h2>
      <p style={prod.h2Lede}>{section.description}</p>
      <div style={prod.limitsList}>
        {items.map((l, i) => (
          <div key={l.id} style={prod.limitRow} className="prod-limitRow">
            <span style={prod.limitTag}>note · 0{i + 1}</span>
            <div>
              <h4 style={prod.limitTitle}>{l.title}</h4>
              <p style={prod.limitBody}>{l.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCta({ accent, cta, title, body }: { accent: string; cta: CtaCopy; title: string; body: string }) {
  return (
    <section style={{ ...prod.section, paddingBottom: 64 }} className="prod-section">
      <div style={prod.ctaWrap} className="prod-ctaWrap">
        <div style={{ ...prod.ctaGlow, background: `radial-gradient(80% 100% at 50% 0%, hsl(${accent} / 0.32), transparent 70%)` }} />
        <div style={prod.ctaInner}>
          <p style={{ ...prod.eyebrow, color: `hsl(${accent} / 0.85)` }}>§ 07 · TAKE IT FROM HERE</p>
          <h2 style={prod.ctaH}>{title}</h2>
          <p style={prod.ctaBody}>{body}</p>
          <div style={prod.ctaRow}>
            <a
              href={cta.primaryHref ?? '#'}
              target={cta.primaryHref?.startsWith('http') ? '_blank' : undefined}
              rel={cta.primaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ ...ad.btnPrimary, background: `linear-gradient(135deg, hsl(${accent} / 0.95), hsl(${shiftHue(accent, 24)}))` }}
            >
              {cta.primary} <span>→</span>
            </a>
            <a
              href={cta.secondaryHref ?? '#'}
              target={cta.secondaryHref?.startsWith('http') ? '_blank' : undefined}
              rel={cta.secondaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={ad.btnGhost}
            >
              <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
              {cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const _unused: ReactNode = null;
void _unused;

/* ----- Product page style sheet ----- */

const prod: Record<string, CSSProperties> = {
  hero: { position: 'relative', overflow: 'hidden' },
  heroAurora: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 },
  blob: { position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', willChange: 'transform' },
  blob1: { width: 620, height: 620, top: -180, left: -120, animation: 'adDrift1 28s ease-in-out infinite alternate' },
  blob2: { width: 540, height: 540, top: -120, right: -120, animation: 'adDrift2 32s ease-in-out infinite alternate' },

  heroInner: { position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '52px 32px 72px' },
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

  heroSplit: { display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 36, alignItems: 'center', marginTop: 6 },
  badge: {
    display: 'inline-block',
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em',
    padding: '6px 12px', borderRadius: 999,
    background: 'hsl(200 30% 6% / 0.7)',
    border: '1px solid',
    marginBottom: 18,
  },
  eyebrow: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em', color: 'hsl(186 60% 78%)', margin: '0 0 12px' },
  h1: {
    fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700,
    margin: 0, color: '#fff',
    background: 'linear-gradient(180deg, #fff 30%, hsl(186 30% 80%) 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textWrap: 'balance' as CSSProperties['textWrap'],
  },
  lede: { margin: '20px 0 0', maxWidth: 580, color: 'hsl(45 22% 86%)', fontSize: 17, lineHeight: 1.55 },
  ctaRow: { display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' },
  metaRow: { marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' },
  metaCell: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: TG_DIM,
    padding: '5px 12px', borderRadius: 999,
    background: 'hsl(200 30% 6% / 0.65)',
    border: '1px solid hsl(186 40% 35% / 0.25)',
  },

  heroArt: { position: 'relative', height: 420, display: 'grid', placeItems: 'center' },
  artGlow: { position: 'absolute', inset: '-40px', filter: 'blur(40px)', pointerEvents: 'none' },
  artFrame: {
    position: 'relative',
    width: 380, height: 380,
    borderRadius: 28,
    background: 'linear-gradient(180deg, hsl(200 35% 14% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.35)',
    boxShadow: '0 30px 80px hsl(210 80% 4% / 0.55), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
    display: 'grid', placeItems: 'center',
    overflow: 'hidden',
  },
  artGrid: {
    position: 'absolute', inset: 0,
    backgroundImage:
      'linear-gradient(hsl(186 60% 60% / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(186 60% 60% / 0.07) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    maskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)',
  },
  artRing: {
    position: 'absolute', inset: 24, borderRadius: '50%',
    border: '1px dashed hsl(186 60% 60% / 0.35)',
    animation: 'adRotate 38s linear infinite',
  },
  artRing2: {
    position: 'absolute', inset: 60, borderRadius: '50%',
    border: '1px solid hsl(186 60% 60% / 0.18)',
    animation: 'adRotate 64s linear infinite reverse',
  },
  artLogo: {
    position: 'relative', zIndex: 2,
    width: 'auto', height: 'auto',
    filter: 'drop-shadow(0 22px 40px hsl(210 80% 4% / 0.7))',
  },
  artCorners: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  artCorner: { position: 'absolute', width: 14, height: 14 },
  artStamp: {
    position: 'absolute', bottom: 14, left: 14,
    fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em',
    opacity: 0.8,
  },

  section: { position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '48px 32px 0', zIndex: 1 },

  metricStrip: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
    padding: '22px 28px', borderRadius: 22,
    background: 'hsl(200 30% 8% / 0.7)',
    border: '1px solid hsl(186 60% 50% / 0.25)',
    boxShadow: '0 20px 50px hsl(210 80% 4% / 0.4)',
  },
  metricCell: {
    display: 'flex', flexDirection: 'column', gap: 6,
    paddingLeft: 18, borderLeft: '1px solid hsl(186 50% 40% / 0.18)',
  },
  metricKey: { fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em' },
  metricVal: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
  metricSub: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.06em', color: 'hsl(36 30% 70%)' },

  stageWrap: {
    padding: '24px 28px', borderRadius: 22,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.25)',
  },
  stageHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 },
  stageMeta: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em' },
  stageDot: { width: 8, height: 8, borderRadius: 999 },
  stageMono: { color: 'hsl(186 40% 65%)' },
  stageSep: { color: 'hsl(186 25% 32%)' },
  stageProg: { fontFamily: MONO, fontSize: 22, fontWeight: 700, letterSpacing: '0.04em', color: '#fff' },
  stageHeadline: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.015em', margin: '6px 0 0', color: '#fff' },
  stageBody: { color: 'hsl(45 18% 84%)', fontSize: 15.5, lineHeight: 1.6, marginTop: 10, maxWidth: 880 },
  stageTrack: {
    marginTop: 18, height: 6, borderRadius: 999,
    background: 'hsl(200 30% 14% / 0.8)', border: '1px solid hsl(186 30% 25% / 0.4)',
    overflow: 'hidden',
  },
  stageFill: { height: '100%', borderRadius: 999 },

  kicker: { display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  kickerLine: { display: 'block', width: 28, height: 1 },
  kickerText: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.32em' },
  h2: { fontSize: 44, lineHeight: 1.04, letterSpacing: '-0.02em', fontWeight: 700, margin: '0 0 14px', color: '#fff', textWrap: 'balance' as CSSProperties['textWrap'], maxWidth: 880 },
  h2Lede: { color: 'hsl(45 18% 84%)', fontSize: 16, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 760 },

  purposeGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  purposeCard: {
    position: 'relative', padding: 24, borderRadius: 20,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.25)',
    overflow: 'hidden',
  },
  purposeHalo: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  purposeIdx: { position: 'relative', fontFamily: MONO, fontSize: 12, letterSpacing: '0.24em' },
  purposeTitle: { position: 'relative', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', margin: '10px 0 0', color: '#fff' },
  purposeBody: { position: 'relative', color: 'hsl(45 18% 82%)', fontSize: 14.5, lineHeight: 1.6, marginTop: 10 },

  steps: { display: 'grid', gap: 12 },
  step: {
    display: 'grid', gridTemplateColumns: '64px 1px 1fr 32px', gap: 18, alignItems: 'center',
    padding: '20px 24px', borderRadius: 18,
    background: 'hsl(200 30% 9% / 0.75)',
    border: '1px solid hsl(186 50% 40% / 0.22)',
  },
  stepNum: { fontFamily: MONO, fontSize: 22, fontWeight: 700, letterSpacing: '0.02em' },
  stepLine: { width: 1, height: 40, background: 'hsl(186 50% 40% / 0.3)' },
  stepTitle: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  stepBody: { color: 'hsl(45 18% 82%)', fontSize: 14.5, lineHeight: 1.55, marginTop: 6 },
  stepDot: { width: 8, height: 8, borderRadius: 999, justifySelf: 'end' },

  showcaseGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
  showcaseCard: {
    position: 'relative', padding: 22, borderRadius: 20,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.25)',
    overflow: 'hidden',
  },
  showcaseFeatured: { gridColumn: 'span 2' },
  showcaseGlow: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  showcaseTop: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  showcaseLabel: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.28em', fontWeight: 600 },
  showcaseSig: { fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em', color: TG_DIM },
  showcaseTitle: { position: 'relative', fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: '12px 0 0', color: '#fff' },
  showcaseDesc: { position: 'relative', color: 'hsl(45 18% 82%)', fontSize: 14, lineHeight: 1.6, marginTop: 8, maxWidth: 720 },
  showcasePlaceholder: {
    position: 'relative', height: 220, borderRadius: 14, marginTop: 14, overflow: 'hidden',
    background: 'repeating-linear-gradient(45deg, hsl(200 30% 9%) 0 12px, hsl(200 30% 12%) 12px 24px)',
    border: '1px solid hsl(186 30% 30% / 0.3)',
    display: 'grid', placeItems: 'center',
  },
  showcasePlaceholderShine: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  showcasePlaceholderTag: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em',
    padding: '6px 12px', borderRadius: 999,
    color: 'hsl(0 0% 90%)',
    background: 'hsl(200 30% 4% / 0.75)',
    border: '1px solid hsl(186 40% 35% / 0.4)',
    backdropFilter: 'blur(2px)',
  },
  showcaseCmd: {
    position: 'relative', marginTop: 14, padding: '10px 14px', borderRadius: 10,
    background: 'hsl(200 30% 4% / 0.7)',
    border: '1px solid hsl(186 40% 35% / 0.25)',
    fontFamily: MONO, fontSize: 12, letterSpacing: '0.02em',
    color: 'hsl(45 18% 88%)',
    display: 'flex', gap: 10, alignItems: 'center', overflow: 'hidden',
  },
  showcasePrompt: { fontWeight: 700 },
  showcaseCmdText: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },

  compareGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
  compareCard: {
    padding: 22, borderRadius: 18,
    background: 'hsl(200 30% 9% / 0.6)',
    border: '1px solid hsl(186 50% 40% / 0.2)',
  },
  compareIdx: { fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em' },
  compareTitle: { fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', margin: '8px 0 0', color: '#fff' },
  compareBody: { color: 'hsl(45 18% 82%)', fontSize: 14, lineHeight: 1.6, marginTop: 8 },

  limitsList: { display: 'flex', flexDirection: 'column', gap: 10 },
  limitRow: {
    display: 'grid', gridTemplateColumns: '120px 1fr', gap: 18, alignItems: 'start',
    padding: '18px 20px', borderRadius: 14,
    background: 'hsl(36 35% 9% / 0.4)',
    border: '1px solid hsl(36 50% 40% / 0.22)',
  },
  limitTag: {
    fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', color: 'hsl(36 65% 75%)',
    padding: '4px 10px', borderRadius: 999,
    background: 'hsl(36 40% 8% / 0.7)',
    border: '1px solid hsl(36 50% 40% / 0.3)',
    alignSelf: 'start',
    width: 'fit-content',
  },
  limitTitle: { fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: '#fff' },
  limitBody: { color: 'hsl(45 18% 84%)', fontSize: 14.5, lineHeight: 1.55, marginTop: 6 },

  ctaWrap: {
    position: 'relative', padding: 44, borderRadius: 28,
    background: 'linear-gradient(180deg, hsl(200 30% 11% / 0.85), hsl(200 30% 7% / 0.95))',
    border: '1px solid hsl(186 50% 40% / 0.3)',
    overflow: 'hidden',
    boxShadow: '0 40px 80px hsl(210 80% 4% / 0.5)',
  },
  ctaGlow: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  ctaInner: { position: 'relative', maxWidth: 720 },
  ctaH: { fontSize: 40, lineHeight: 1.04, letterSpacing: '-0.02em', fontWeight: 700, margin: '8px 0 0', color: '#fff' },
  ctaBody: { color: 'hsl(45 22% 86%)', fontSize: 17, lineHeight: 1.55, marginTop: 12 },
};
