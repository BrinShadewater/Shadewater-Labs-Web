import { type CSSProperties } from 'react';
import {
  AuroraPage,
  MONO,
  TG_DIM,
  pp,
  ad,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface AboutProps {
  onNavigate: AuroraNavigate;
}

export default function About({ onNavigate }: AboutProps) {
  void onNavigate;

  const ACCENT = '186 90% 60%';

  const photoWrap: CSSProperties = {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow:
      '0 24px 60px hsl(' + ACCENT + ' / 0.22), 0 0 0 1px hsl(' + ACCENT + ' / 0.18)',
    maxWidth: 480,
    width: '100%',
  };

  const photoImg: CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  };

  const photoGlow: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 60%, hsl(' + ACCENT + ' / 0.12) 100%)',
    pointerEvents: 'none',
  };

  const credRow: CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as CSSProperties['flexDirection'],
    gap: 10,
    marginTop: 20,
  };

  const credCard: CSSProperties = {
    padding: '12px 16px',
    borderRadius: 12,
    background: 'hsl(200 30% 8% / 0.7)',
    border: '1px solid hsl(' + ACCENT + ' / 0.14)',
  };

  const credLabel: CSSProperties = {
    fontFamily: MONO,
    fontSize: 9,
    letterSpacing: '0.26em',
    color: 'hsl(' + ACCENT + ')',
    display: 'block',
    marginBottom: 3,
  };

  const credValue: CSSProperties = {
    fontSize: 13,
    color: 'hsl(45 20% 90%)',
    lineHeight: 1.4,
    fontWeight: 500,
  };

  const split: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.5fr)',
    gap: 56,
    alignItems: 'start',
  };

  const nameLine: CSSProperties = {
    fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    margin: '0 0 6px',
    lineHeight: 1,
    color: '#fff',
  };

  const handle: CSSProperties = {
    fontFamily: MONO,
    fontSize: 11,
    letterSpacing: '0.26em',
    color: 'hsl(' + ACCENT + ')',
    marginBottom: 28,
    display: 'block',
  };

  const paraStyle: CSSProperties = {
    color: 'hsl(45 18% 84%)',
    fontSize: 15.5,
    lineHeight: 1.72,
    margin: '0 0 18px',
  };

  const divider: CSSProperties = {
    width: 48,
    height: 2,
    background: 'linear-gradient(90deg, hsl(' + ACCENT + '), transparent)',
    borderRadius: 999,
    margin: '26px 0',
  };

  const exploreHead: CSSProperties = {
    fontFamily: MONO,
    fontSize: 10,
    letterSpacing: '0.28em',
    color: 'hsl(36 50% 72%)',
    marginBottom: 14,
    display: 'block',
  };

  const exploreGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px 14px',
    marginBottom: 26,
  };

  const exploreItem: CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    fontSize: 14,
    color: 'hsl(45 16% 80%)',
    lineHeight: 1.5,
  };

  const exploreDot: CSSProperties = {
    width: 5,
    height: 5,
    borderRadius: 999,
    background: 'hsl(' + ACCENT + ')',
    flexShrink: 0,
    marginTop: 2,
  };

  const linkStyle: CSSProperties = {
    color: 'hsl(' + ACCENT + ')',
    textDecoration: 'none',
    borderBottom: '1px solid hsl(' + ACCENT + ' / 0.3)',
  };

  const ctaRow: CSSProperties = {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap' as CSSProperties['flexWrap'],
    marginTop: 28,
  };

  const explores = [
    'AI-assisted creative workflows',
    'Modern web design and development',
    'Automation and digital infrastructure',
    'Interactive storytelling and immersive media',
    'Creator-focused technology systems',
    'Speculative interface and experience design',
    'Emerging tools for filmmakers and digital creators',
  ];

  return (
    <AuroraPage
      active="about"
      onNavigate={onNavigate}
      sectionLabel="About"
      eyebrow="§ 05 · ABOUT"
      title="The person behind the lab."
      lede="Vancouver-based filmmaker, creative technologist, and digital creator working at the intersection of storytelling, emerging technology, and interactive media."
    >
      <section style={pp.section}>
        <div style={split}>
          <div>
            <div style={photoWrap}>
              <img
                src="/Alexbiopic.png"
                alt="Alex Yesilcimen"
                style={photoImg}
                loading="eager"
                decoding="async"
              />
              <div style={photoGlow} />
            </div>
            <div style={credRow}>
              <div style={credCard}>
                <span style={credLabel}>ROLE</span>
                <span style={credValue}>Producer · 1st Assistant Director</span>
              </div>
              <div style={credCard}>
                <span style={credLabel}>GUILD</span>
                <span style={credValue}>Directors Guild of Canada · DGC AI Working Group</span>
              </div>
              <div style={credCard}>
                <span style={credLabel}>LOCATION</span>
                <span style={credValue}>Vancouver, BC · Canada</span>
              </div>
              <div style={credCard}>
                <span style={credLabel}>COMMUNITY</span>
                <span style={credValue}>
                  <a href="https://vancouver.bc-ai.net/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vancouver AI</a>
                  {' · '}
                  <a href="https://bc-ai.ca/" target="_blank" rel="noopener noreferrer" style={linkStyle}>BC + AI Ecosystem</a>
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 style={nameLine}>Alex Yesilcimen</h2>
            <span style={handle}>// Brin Shadewater online</span>

            <p style={paraStyle}>
              Alex Yesilcimen is a Vancouver-based filmmaker, creative technologist, and digital creator working at the intersection of storytelling, emerging technology, and interactive media.
            </p>
            <p style={paraStyle}>
              With a background spanning both film production and computer science, Alex develops projects that combine cinematic worldbuilding with modern digital tools, exploring how emerging technologies can support the future of independent creative work.
            </p>
            <p style={paraStyle}>
              As a Producer and 1st Assistant Director, Alex has worked across a variety of independent productions including the theatrical horror feature <em>Strange Harvest</em>. Alongside his film work, he founded Shadewater Labs — an evolving creative studio focused on AI-assisted workflows, web development, automation systems, interactive experiences, and experimental media design.
            </p>
            <p style={paraStyle}>
              Alex is a member of the Directors Guild of Canada and a founding member of the DGC AI Working Group, which focuses on navigating the ethical integration of artificial intelligence and emerging technologies within the Canadian media industry. The group explores policy development, responsible adoption strategies, and approaches aimed at supporting workers and mitigating job displacement as the industry evolves.
            </p>
            <p style={{ ...paraStyle, marginBottom: 0 }}>
              He is also a member of{' '}
              <a href="https://vancouver.bc-ai.net/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vancouver AI</a>
              {' '}and the broader{' '}
              <a href="https://bc-ai.ca/" target="_blank" rel="noopener noreferrer" style={linkStyle}>BC + AI Ecosystem</a>
              {' '}— a grassroots community centred around ethical, human-focused, and cross-disciplinary approaches to artificial intelligence, creativity, and emerging technology.
            </p>

            <div style={divider} />

            <span style={exploreHead}>THROUGH SHADEWATER LABS, ALEX EXPLORES</span>
            <div style={exploreGrid}>
              {explores.map((item) => (
                <div key={item} style={exploreItem}>
                  <span style={exploreDot} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p style={paraStyle}>
              Alex is currently developing an experimental feature project that explores a hybrid production approach combining traditional practical filmmaking techniques with emerging AI video generation tools. The project focuses on finding ways to integrate new technologies into the filmmaking process while preserving the collaborative, human-driven foundations of cinematic storytelling.
            </p>
            <p style={{ ...paraStyle, color: 'hsl(45 14% 68%)', fontSize: 14.5 }}>
              His work combines technical problem solving with cinematic thinking, with a focus on building thoughtful, future-facing systems that bridge technology, storytelling, and human creativity. Shadewater Labs serves as both a production studio and experimental sandbox — a space for developing new ideas across film, software, design, and emerging media.
            </p>

            <div style={ctaRow}>
              <a
                href="https://brinshadewater.com"
                target="_blank"
                rel="noopener noreferrer"
                style={ad.btnPrimary}
              >
                Visit brinshadewater.com <span style={{ marginLeft: 6 }}>{'↗'}</span>
              </a>
              <a
                href="https://www.twitch.tv/brinshadewater"
                target="_blank"
                rel="noopener noreferrer"
                style={ad.btnGhost}
              >
                Watch on Twitch
              </a>
            </div>
          </div>
        </div>
      </section>
    </AuroraPage>
  );
}

void ({} as CSSProperties);
void (TG_DIM);
