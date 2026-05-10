import { managedWebsites } from '@/content/websites';
import {
  AuroraPage,
  adTone,
  pp,
} from '@/components/aurora/chrome';
import type { AdToneKey, AuroraNavigate } from '@/components/aurora/chrome';

interface WebsitesProps {
  onNavigate: AuroraNavigate;
}

interface SiteRow {
  name: string;
  url: string;
  role: string;
  status: string;
  tone: AdToneKey;
  accent: string;
  blurb: string;
  sig: string;
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

export default function Websites({ onNavigate }: WebsitesProps) {
  const sites: SiteRow[] = managedWebsites.map((s) => ({
    name: s.name,
    url: s.url.replace(/^https?:\/\//, ''),
    role: s.role,
    status: s.status.toUpperCase(),
    tone: TONE_BY_STATUS[s.status] ?? 'cyan',
    accent: ACCENTS[s.id] ?? '186 90% 60%',
    blurb: s.description,
    sig: SIGS[s.id] ?? s.id,
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
            <article key={s.url} style={pp.siteCard}>
              <div
                style={{
                  ...pp.siteGlow,
                  background: `radial-gradient(120% 80% at 50% -30%, hsl(${s.accent} / 0.32), transparent 65%)`,
                }}
              />
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
                  href={`https://${s.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...pp.siteVisit, color: `hsl(${s.accent})` }}
                >
                  Visit <span style={{ marginLeft: 4 }}>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AuroraPage>
  );
}
