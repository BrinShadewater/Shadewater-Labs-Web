import { AuroraPage, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { seoAuditExample } from '@/content/seoAuditExample';
import { buildProjectHref } from '@/lib/routes';

const robotsRule = 'User-agent: OAI-SearchBot\nAllow: /';
const bodyStyle = { ...pp.projectBlurb, maxWidth: '65ch' };

export default function SeoAuditExample({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <AuroraPage
      layout="article"
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="SEO audit example"
      eyebrow="WORKED EXAMPLE · CRAWLER ACCESS"
      title={seoAuditExample.title}
      lede={seoAuditExample.description}
    >
      <article style={pp.section}>
        <section aria-labelledby="seo-audit-finding">
          <h2 id="seo-audit-finding" style={pp.sectionTitle}>What we found</h2>
          <p style={bodyStyle}>
            The public robots.txt already allowed crawlers through its wildcard rule. It named GPTBot and ChatGPT-User individually, but had no separate entry for OAI-SearchBot, the crawler OpenAI uses for ChatGPT Search. This was a policy clarity improvement. The audit found no robots.txt block to lift.
          </p>
          <p style={bodyStyle}>
            <a href="https://developers.openai.com/api/docs/bots" className="underline underline-offset-4">Read OpenAI’s crawler documentation</a>
          </p>
        </section>
        <section aria-labelledby="seo-audit-change" style={{ marginTop: 32 }}>
          <h2 id="seo-audit-change" style={pp.sectionTitle}>What we changed</h2>
          <p style={bodyStyle}>We added a named rule that makes the site’s search crawler policy explicit.</p>
          <pre style={{ ...pp.projectCard, display: 'block', padding: 16, marginTop: 12, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}><code>{robotsRule}</code></pre>
          <p style={bodyStyle}>
            <a href="/robots.txt" className="underline underline-offset-4">Inspect the live robots.txt</a>
            {' · '}
            <a href="https://github.com/BrinShadewater/Shadewater-Labs-Web/commit/fe4f101" className="underline underline-offset-4">View the published change on GitHub</a>
          </p>
        </section>
        <section aria-labelledby="seo-audit-verification" style={{ marginTop: 32 }}>
          <h2 id="seo-audit-verification" style={pp.sectionTitle}>How we verified it</h2>
          <ol style={{ ...bodyStyle, listStyle: 'decimal', paddingLeft: 22, display: 'grid', gap: 10 }}>
            <li><strong>Read the live rules.</strong> The site’s robots.txt returned HTTP 200 and contained the named allow rule. The sitemap also returned HTTP 200.</li>
            <li><strong>Tested a public page.</strong> Requests to robots.txt and the WebP example with the OAI-SearchBot user agent returned HTTP 200.</li>
            <li><strong>Checked the hosting path.</strong> Cloudflare’s OAI-SearchBot block switch was off, and the domain’s DNS record pointed directly to Vercel without proxying web traffic through Cloudflare.</li>
          </ol>
          <p style={bodyStyle}>
            These checks verified the published policy and the response to a test request. An actual OpenAI crawl, indexing, and a ChatGPT citation are separate outcomes that require separate evidence.
          </p>
        </section>
        <a href={buildProjectHref('shadewater-seo-skill')} style={{ ...ad.btnGhost, marginTop: 24 }}>
          <span aria-hidden="true">←</span> Back to Shadewater SEO Skill
        </a>
      </article>
    </AuroraPage>
  );
}
