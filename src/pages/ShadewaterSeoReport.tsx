import { type CSSProperties } from 'react';
import { projectStatuses } from '@/content/projects';
import {
  ad,
  ADFooter,
  ADNav,
  ADTicker,
  ConstellationField,
  MONO,
  pp,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface ShadewaterSeoReportProps {
  onNavigate: AuroraNavigate;
}

const ACCENT = '186 90% 60%';

export default function ShadewaterSeoReport({ onNavigate }: ShadewaterSeoReportProps) {
  const project = projectStatuses['shadewater-seo-report'];

  const metrics = [
    { k: 'AUDIT_TARGETS', v: '12', sub: 'pages scanned per run' },
    { k: 'DETERMINISTIC', v: '100%', sub: 'reproducible reports' },
    { k: 'FIX_LOOPS', v: '06', sub: 'rerunnable workflows' },
    { k: 'AVG_RUNTIME', v: '47s', sub: 'live evidence pull' },
  ];

  const steps = [
    { n: '01', t: 'Pull live evidence', d: 'Crawl + render the target pages, capture metadata, structure, and observable behaviour.' },
    { n: '02', t: 'Score against rubric', d: 'Run the audit rubric. Every check is deterministic and re-runnable from the same evidence.' },
    { n: '03', t: 'Render reports', d: 'Branded dashboard, markdown report, action plan. All exported to the project workspace.' },
    { n: '04', t: 'Fix-loop & re-run', d: 'Rerunnable fix loops let you ship a change, re-audit, and watch the score climb.' },
  ];

  return (
    <div style={ad.root}>
      <ADTicker />
      <ADNav onNavigate={onNavigate} active="projects" />

      <section style={pp.projHero}>
        <div style={pp.heroAurora} aria-hidden="true">
          <div style={{ ...pp.blob, ...pp.blob1, background: `radial-gradient(circle, hsl(${ACCENT} / 0.55), transparent 60%)` }} className="ad-meshBlob" />
          <div style={{ ...pp.blob, ...pp.blob2 }} className="ad-meshBlob" />
        </div>
        <ConstellationField />

        <div style={pp.projHeroInner}>
          <div style={pp.crumb}>
            <span style={pp.crumbDot} className="ad-pulse" />
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('labs'); }} style={{ ...pp.crumbHome, textDecoration: 'none' }}>Labs</a>
            <span style={pp.crumbSep}>/</span>
            <a href="/projects" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }} style={{ ...pp.crumbHome, textDecoration: 'none' }}>Projects</a>
            <span style={pp.crumbSep}>/</span>
            <span style={pp.crumbCur}>SEO Report</span>
          </div>

          <div style={pp.projSplit}>
            <div style={pp.projInfo}>
              <span style={{ ...pp.projBadge, color: `hsl(${ACCENT})`, borderColor: `hsl(${ACCENT} / 0.4)` }}>
                INTERNAL · OPERATOR
              </span>
              <h1 style={pp.projTitle}>{project.name}</h1>
              <p style={pp.projDesc}>
                A deterministic SEO audit skill that turns live site evidence into branded dashboards,
                markdown reports, action plans, and rerunnable fix loops. Built for Labs operators —
                run it, read it, ship the fixes.
              </p>
              <div style={pp.projCtas}>
                <a
                  href="/shadewater-seo-report-explainer.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...ad.btnPrimary, background: `linear-gradient(135deg, hsl(${ACCENT} / 0.95), hsl(192 80% 60%))` }}
                >
                  Run the audit <span>→</span>
                </a>
                <a
                  href="/shadewater-seo-report-explainer.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={ad.btnGhost}
                >
                  <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
                  Read the explainer
                </a>
              </div>

              <div style={pp.projMetaRow}>
                <span style={pp.projMetaCell}>build · v0.6.2</span>
                <span style={pp.projMetaCell}>runs · 128</span>
                <span style={pp.projMetaCell}>last_run · 4h</span>
              </div>
            </div>

            <div style={pp.projHeroArt}>
              <div style={{ ...pp.projArtGlow, background: `radial-gradient(60% 60% at 50% 50%, hsl(${ACCENT} / 0.5), transparent 70%)` }} />
              <div style={pp.projOrb}>
                <div style={pp.projOrbRing} />
                <div style={pp.projOrbRing2} />
                <div style={{ ...pp.projOrbCore, background: `radial-gradient(circle, hsl(${ACCENT}) 0%, hsl(186 60% 25%) 70%)` }}>
                  <span style={pp.projOrbGlyph}>SR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={pp.section}>
        <div style={pp.metricRow}>
          {metrics.map((m) => (
            <div key={m.k} style={pp.metric}>
              <div style={pp.metricKey}>{m.k}</div>
              <div style={pp.metricVal}>{m.v}</div>
              <div style={pp.metricSub}>{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={pp.section}>
        <div style={pp.kicker2}>
          <span style={pp.kickerLine2} />
          <span style={pp.kickerText2}>§ 02 · WORKFLOW</span>
          <span style={pp.kickerLine2} />
        </div>
        <h2 style={pp.h2}>How it runs</h2>
        <div style={pp.steps}>
          {steps.map((s) => (
            <div key={s.n} style={pp.step}>
              <div style={pp.stepNum}>{s.n}</div>
              <div>
                <h4 style={pp.stepTitle}>{s.t}</h4>
                <p style={pp.stepBody}>{s.d}</p>
              </div>
              <div style={pp.stepDot} />
            </div>
          ))}
        </div>
      </section>

      <ADFooter />
    </div>
  );
}

void ({} as CSSProperties);
