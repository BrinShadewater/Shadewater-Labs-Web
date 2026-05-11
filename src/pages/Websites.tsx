import { type CSSProperties } from 'react';
import { managedWebsites } from '@/content/websites';
import {
  AuroraPage,
  MONO,
  TG_DIM,
  adTone,
  pp,
} from '@/components/aurora/chrome';
import type { AdToneKey, AuroraNavigate } from '@/components/aurora/chrome';

interface WebsitesProps {
  onNavigate: AuroraNavigate;
}

interface SiteRow {
  id: string;
  name: string;
  url: string;
  fullUrl: string;
  role: string;
  status: string;
  tone: AdToneKey;
  accent: string;
  blurb: string;
  sig: string;
  thumbnail: string;
}

const TONE_BY_STATUS: Record<string, AdToneKey> = {
  Live: 'green',
  Beta: 'amber',
};

const ACCENTS: Record<string, string> = {
  brinshadewater: '186 85% 60%',
  shadewaterlabs: '186 90% 60%',
  inkmasterstudio: '219 85% 65%',
  strangeharvestmovie: '210 85% 65%',
};

const SIGS: Record<string, string> = {
  brinshadewater: 'main',
  shadewaterlabs: 'labs',
  inkmasterstudio: 'product',
  strangeharvestmovie: 'film',
};

const thumbUrl = (url: string) =>
  'https://image.thum.io/get/width/800/crop/450/noanimate/' + url;

interface BrowserFrameProps {
  url: string;
  accent: string;
  thumbnail: string;
  fullUrl: string;
}

function BrowserFrame({ url, accent, thumbnail, fullUrl }: BrowserFrameProps) {
  const dot: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: 999,
    display: 'inline-block',
    flexShrink: 0,
  };
  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', textDecoration: 'none' }}
      aria-label={'Visit ' + url}
    >
      <div
        style={{
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          border: '1px solid hsl(' + accent + ' / 0.22)',
          borderBottom: 'none',
          background: 'hsl(200 30% 6% / 0.9)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            background: 'hsl(200 30% 8% / 0.95)',
            borderBottom: '1px solid hsl(' + accent + ' / 0.15)',
          }}
        >
          <span style={{ ...dot, background: 'hsl(0 65% 58%)' }} />
          <span style={{ ...dot, background: 'hsl(40 75% 55%)' }} />
          <span style={{ ...dot, background: 'hsl(130 55% 48%)' }} />
          <div
            style={{
              flex: 1,
              marginLeft: 8,
              background: 'hsl(200 30% 12% / 0.8)',
              border: '1px solid hsl(' + accent + ' / 0.15)',
              borderRadius: 6,
              padding: '3px 10px',
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.04em',
              color: TG_DIM,
              overflow: 'hidden',
              whiteSpace: 'nowrap' as CSSProperties['whiteSpace'],
              textOverflow: 'ellipsis',
            }}
          >
            {url}
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            height: 180,
            background: 'hsl(200 30% 9%)',
            overflow: 'hidden',
          }}
        >
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />
        </div>
      </div>
    </a>
  );
}

export default function Websites({ onNavigate }: WebsitesProps) {
  const sites: SiteRow[] = managedWebsites.map((s) => ({
    id: s.id,
    name: s.name,
    url: s.url.replace(/^https?:\/\//, ''),
    fullUrl: s.url,
    role: s.role,
    status: s.status.toUpperCase(),
    tone: TONE_BY_STATUS[s.status] ?? 'cyan',
    accent: ACCENTS[s.id] ?? '186 90% 60%',
    blurb: s.description,
    sig: SIGS[s.id] ?? s.id,
    thumbnail: thumbUrl(s.url),
  }));

  return (
    <AuroraPage
      active="websites"
      onNavigate={onNavigate}
      sectionLabel="Websites"
      eyebrow="§ 02 · MANAGED WEB"
      title="Managed web properties."
      lede="The public web surfaces currently designed, productized, and maintained through Shadewater Labs."
    >
      <section style={pp.section}>
        <div style={pp.sitesGrid}>
          {sites.map((s) => (
            <article
              key={s.url}
              style={{ ...pp.siteCard, padding: 0, overflow: 'hidden' }}
            >
              <div
                style={{
                  ...pp.siteGlow,
                  background: 'radial-gradient(120% 80% at 50% -30%, hsl(' + s.accent + ' / 0.32), transparent 65%)',
                }}
              />

              <BrowserFrame
                url={s.url}
                accent={s.accent}
                thumbnail={s.thumbnail}
                fullUrl={s.fullUrl}
              />

              <div style={{ padding: '20px 24px 22px', position: 'relative' }}>
                <div style={pp.siteTop}>
                  <span style={pp.siteRole}>{s.role}</span>
                  <span style={pp.statusPill}>
                    <span style={{ ...pp.statusDot, background: adTone[s.tone] }} />
                    <span style={{ color: adTone[s.tone] }}>{s.status}</span>
                  </span>
                </div>

                <div style={pp.siteUrlRow}>
                  <span style={pp.siteUrlPrefix}>https://</span>
                  <span style={pp.siteUrl}>{s.url}</span>
                </div>

                <h3 style={pp.siteName}>{s.name}</h3>
                <p style={pp.siteBlurb}>{s.blurb}</p>

                <div style={pp.siteFoot}>
                  <span style={pp.siteSig}>// {s.sig}</span>
                  <a
                    href={s.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...pp.siteVisit, color: 'hsl(' + s.accent + ')' }}
                  >
                    Visit <span style={{ marginLeft: 4 }}>&#8599;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AuroraPage>
  );
}

void ({} as CSSProperties);
