import { useEffect, useState } from 'react';
import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { seoAuditExample } from '@/content/seoAuditExample';
import { buildPath, buildProjectHref, LABS_ORIGIN } from '@/lib/routes';

const robotsRule = 'User-agent: OAI-SearchBot\nAllow: /';
const checkHeadingId = 'run-this-check';
const robotsCommand = `curl -sS -L -i "${LABS_ORIGIN}/robots.txt"`;
const pageCommand = `curl -sS -L -o /dev/null -w "%{http_code} %{content_type} %{url_effective}\\n" -A "OAI-SearchBot/1.4" "${LABS_ORIGIN}/projects/webp-example"`;
const bodyStyle = { ...pp.projectBlurb, maxWidth: '65ch' };
const codeStyle = { ...pp.projectCard, display: 'block', padding: 16, marginTop: 12, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } as const;

function CopyableCommand({ command, label }: { command: string; label: string }) {
  const [status, setStatus] = useState('');

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('Command copied.');
    } catch {
      setStatus('Select the command below and copy it manually.');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 14px', marginTop: 12 }}>
        <button type="button" className="seo-copy-command" onClick={() => void copyCommand()} style={ad.btnGhost}>{label}</button>
        <span role="status" style={{ color: TG_MUTED, fontSize: 14 }}>{status}</span>
      </div>
      <pre style={codeStyle}><code>{command}</code></pre>
    </>
  );
}

export default function SeoAuditExample({ onNavigate }: { onNavigate: AuroraNavigate }) {
  useEffect(() => {
    if (window.location.hash !== `#${checkHeadingId}`) return;
    const heading = document.getElementById(checkHeadingId);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView();
  }, []);

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
        <a href={`#${checkHeadingId}`} style={{ ...ad.btnGhost, marginBottom: 20 }}>
          Jump to the commands <span aria-hidden="true">↓</span>
        </a>
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
          <pre style={codeStyle}><code>{robotsRule}</code></pre>
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
            <li><strong>Tested a public page.</strong> Requests to robots.txt and the <a href={buildPath('webp-example')} className="underline underline-offset-4">WebP example</a> with the OAI-SearchBot user agent returned HTTP 200.</li>
            <li><strong>Checked the hosting path.</strong> Cloudflare’s OAI-SearchBot block switch was off, and the domain’s DNS record pointed directly to Vercel without proxying web traffic through Cloudflare.</li>
          </ol>
          <p style={bodyStyle}>
            These checks verified the published policy and the response to a test request. An actual OpenAI crawl, indexing, and a ChatGPT citation are separate outcomes that require separate evidence.
          </p>
        </section>
        <section aria-labelledby={checkHeadingId} style={{ marginTop: 32 }}>
          <h2 id={checkHeadingId} tabIndex={-1} style={pp.sectionTitle}>Run this check on your site</h2>
          <p style={bodyStyle}>
            Run these in a terminal with curl. Use the Labs URLs to reproduce the example, then substitute your site’s domain and a public page you want crawled. In Windows PowerShell, use <code>curl.exe</code> and replace <code>/dev/null</code> with <code>NUL</code> in the second command.
          </p>
          <style>{'[data-prerender-route] .seo-copy-command { display: none; }'}</style>
          <p style={bodyStyle}><strong>1. Read the published robots.txt.</strong> The command prints response headers and the file. Look for an <code>OAI-SearchBot</code> group, or the <code>*</code> group if there’s no named match. Check whether the rules in that group allow your page’s path. Labs returns <code>200</code> and explicitly allows the path we tested.</p>
          <CopyableCommand command={robotsCommand} label="Copy robots.txt command" />
          <p style={bodyStyle}><strong>2. Test the public page.</strong> This sends a GET request with the crawler’s user-agent name and prints the final HTTP status, content type, and URL after redirects.</p>
          <CopyableCommand command={pageCommand} label="Copy OAI-SearchBot command" />
          <p style={bodyStyle}>
            For an HTML page, expect <code>200</code>, <code>text/html</code>, and the intended URL. A <code>403</code> or <code>429</code> is a reason to check access controls, firewall rules, or rate limits. A <code>200</code> can still be a challenge page, so remove <code>-o /dev/null</code> (or <code>-o NUL</code>) to inspect the body if needed. This measures how your site responds to a request bearing that user agent from your connection. Confirm a real OpenAI crawl separately using server logs and <a href="https://developers.openai.com/api/docs/bots" className="underline underline-offset-4">OpenAI’s published crawler IP ranges</a>.
          </p>
        </section>
        <a href={buildProjectHref('shadewater-seo-skill')} style={{ ...ad.btnGhost, marginTop: 24 }}>
          <span aria-hidden="true">←</span> Back to Shadewater SEO Skill
        </a>
      </article>
    </AuroraPage>
  );
}
