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
import {
  SHADEWATER_LABS_MARK_ALT,
  SHADEWATER_LABS_MARK_CROPPED_HEIGHT,
  SHADEWATER_LABS_MARK_CROPPED_SRC,
  SHADEWATER_LABS_MARK_CROPPED_WIDTH,
} from '@/lib/brandAssets';

interface ShadewaterSeoReportProps {
  onNavigate: AuroraNavigate;
}

const ACCENT = '186 90% 60%';

export default function ShadewaterSeoReport({ onNavigate }: ShadewaterSeoReportProps) {
  const project = projectStatuses['shadewater-seo-report'];
  const sampleReportHref = '/shadewater-seo-report-sample.html';
  const explainerHref = '/shadewater-seo-report-explainer.pdf';
  const dashboardPreviewHref = '/shadewater-seo-report-dashboard-preview.png';
  const phaseProgress = (id: string) => project.phases.find((phase) => phase.id === id)?.progress ?? 0;

  const metrics = [
    { k: 'OVERALL_PROGRESS', v: `${project.overallProgress}%`, sub: 'product surface maturity' },
    { k: 'AUDIT_ENGINE', v: `${phaseProgress('audit-engine')}%`, sub: 'core evidence layer' },
    { k: 'REPORTING_SURFACE', v: `${phaseProgress('reporting-surface')}%`, sub: 'dashboard + artifacts' },
    { k: 'REPO_LOCAL_MODE', v: `${phaseProgress('repo-local-mode')}%`, sub: 'patch-ready fixes' },
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
                  href={sampleReportHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...ad.btnPrimary, background: `linear-gradient(135deg, hsl(${ACCENT} / 0.95), hsl(192 80% 60%))` }}
                >
                  View sample report <span>→</span>
                </a>
                <a
                  href={explainerHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={ad.btnGhost}
                >
                  <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
                  Open explainer PDF
                </a>
              </div>

              <div style={pp.projMetaRow}>
                <span style={pp.projMetaCell}>stage · public explainer</span>
                <span style={pp.projMetaCell}>progress · {project.overallProgress}%</span>
                <span style={pp.projMetaCell}>next · repo-local mode</span>
              </div>
            </div>

            <div style={{ ...pp.projHeroArt, height: 320, justifyItems: 'center' }}>
              <img
                src={SHADEWATER_LABS_MARK_CROPPED_SRC}
                alt={SHADEWATER_LABS_MARK_ALT}
                width={SHADEWATER_LABS_MARK_CROPPED_WIDTH}
                height={SHADEWATER_LABS_MARK_CROPPED_HEIGHT}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: 'min(260px, 42vw)',
                  maxHeight: 300,
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 18px 44px hsl(192 80% 60% / 0.22))',
                }}
              />
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
          <span style={pp.kickerText2}>§ 01 · LIVE REPORT OUTPUT</span>
          <span style={pp.kickerLine2} />
        </div>
        <h2 style={pp.h2}>The actual dashboard</h2>
        <p style={{ ...pp.stepBody, maxWidth: 820, margin: '12px auto 24px', textAlign: 'center' }}>
          This preview is captured from the generated Shadewater SEO Report for shadewaterlabs.com.
          Open the full report in a new tab for the interactive filters, copy buttons, print layout, and agent handoff controls.
        </p>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18,
            background: 'hsl(210 30% 8%)',
            boxShadow: '0 18px 44px hsl(210 66% 3% / 0.28)',
          }}
        >
          <img
            src={dashboardPreviewHref}
            alt="Preview of the generated Shadewater SEO Report dashboard for shadewaterlabs.com"
            width={1440}
            height={1100}
            loading="lazy"
            decoding="async"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div style={{ ...pp.projCtas, justifyContent: 'center', marginTop: 22 }}>
          <a
            href={sampleReportHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...ad.btnPrimary, background: `linear-gradient(135deg, hsl(${ACCENT} / 0.95), hsl(192 80% 60%))` }}
          >
            Open sample report <span>→</span>
          </a>
          <a href={explainerHref} target="_blank" rel="noopener noreferrer" style={ad.btnGhost}>
            <span style={{ fontFamily: MONO, fontSize: 12, opacity: 0.7 }}>›</span>
            Open explainer PDF
          </a>
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
