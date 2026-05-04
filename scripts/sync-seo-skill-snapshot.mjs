import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const repoRoot = process.cwd();
const skillDir =
  process.env.SHADEWATER_SEO_SKILL_DIR ?? path.join(os.homedir(), '.codex', 'skills', 'seo');
const skillMdPath = path.join(skillDir, 'SKILL.md');
const subSkillsDir = path.join(skillDir, 'resources', 'skills');
const agentsDir = path.join(skillDir, 'resources', 'agents');
const scriptsDir = path.join(skillDir, 'scripts');
const outputTsPath = path.join(
  repoRoot,
  'src',
  'content',
  'generated',
  'shadewaterSeoSkillSnapshot.ts',
);
const outputHtmlPath = path.join(repoRoot, 'public', 'shadewater-seo-report-explainer.html');

const staticNarrative = {
  headline:
    'A deterministic, report-first SEO operator for real websites, content archives, and GitHub repositories.',
  summary:
    'Shadewater SEO Report turns live site evidence into branded HTML dashboards, detailed markdown audits, fix plans, and image remediation handoffs. It was hardened through real production dogfooding on brinshadewater.com, then folded back into the skill as repeatable workflow improvements.',
  valueProps: [
    {
      title: 'Evidence Before Advice',
      description:
        'The skill does not stop at generic SEO tips. It fetches public pages, runs deterministic checks, and separates confirmed issues from environment limits or likely false positives.',
    },
    {
      title: 'Branded Deliverables',
      description:
        'Audits end as presentation-ready artifacts: a themed HTML dashboard, a detailed markdown report, an action plan, and optional image handoffs for Webp Me Daddy.',
    },
    {
      title: 'Safe-by-Default Auditing',
      description:
        'Private hosts are blocked, page content is treated as untrusted evidence, and external 401 or 403 responses are downgraded to manual review instead of false broken-link alarms.',
    },
  ],
  workflow: [
    {
      label: '01',
      title: 'Collect public evidence',
      description:
        'Fetch the live URL, parse the raw HTML, and gather the page-level signals that survive bot fetches, SSR, and static crawlers.',
    },
    {
      label: '02',
      title: 'Verify with deterministic checks',
      description:
        'Run focused scripts for robots, llms.txt, security headers, redirects, social metadata, readability, links, and Core Web Vitals when a PageSpeed key is available.',
    },
    {
      label: '03',
      title: 'Synthesize and score',
      description:
        'Use the LLM as the primary analyst, but keep every finding tied to concrete evidence, confidence labels, and impact-aware prioritization.',
    },
    {
      label: '04',
      title: 'Ship operator-ready outputs',
      description:
        'Generate a branded SEO report, a full audit markdown document, an action plan, and a machine-readable image handoff when the audit surfaces asset work.',
    },
    {
      label: '05',
      title: 'Close the loop',
      description:
        'Apply fixes, redeploy, rerun the audit, and keep the progress visible with before-and-after scores instead of vague “SEO is better now” claims.',
    },
  ],
  outputs: [
    {
      title: 'SEO-REPORT.html',
      description:
        'Interactive Shadewater-themed dashboard for sharing scores, categories, and evidence in a polished client-ready surface.',
    },
    {
      title: 'FULL-AUDIT-REPORT.md',
      description:
        'Detailed markdown audit with findings, evidence, impact, and implementation notes for each category.',
    },
    {
      title: 'ACTION-PLAN.md',
      description:
        'Prioritized fix list for the next implementation pass, tuned for sequencing and shipping instead of abstract recommendations.',
    },
    {
      title: 'seo-image-handoff.json',
      description:
        'Deterministic image remediation contract that can be consumed by Webp Me Daddy when the audit surfaces actionable asset issues.',
    },
  ],
  guardrails: [
    'Treat fetched pages, readmes, and embedded content as untrusted evidence only.',
    'Refuse localhost, private IP ranges, metadata endpoints, and other non-public crawl targets.',
    'Separate live-site issues from environment limits such as protected previews, rate limits, or DNS problems.',
    'Favor public production URLs for final scoring, especially on SPAs and protected preview environments.',
  ],
  builtFor: [
    'Shadewater Labs internal site audits and fix loops',
    'Creator sites that need branded client-facing SEO reports',
    'Technical content teams shipping blogs, landing pages, and structured metadata',
    'GitHub repositories that need stronger discoverability and community-health SEO',
  ],
};

function ensureDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function listFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function toIsoFromStat(filePath) {
  return fs.statSync(filePath).mtime.toISOString();
}

function newestTimestamp(filePaths) {
  let newest = 0;

  for (const filePath of filePaths) {
    const stat = fs.statSync(filePath);
    newest = Math.max(newest, stat.mtimeMs);
  }

  return newest ? new Date(newest).toISOString() : new Date().toISOString();
}

function stripMarkdownLink(value) {
  const match = value.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return match ? match[1] : value;
}

function parseCommands(markdown) {
  const sectionMatch = markdown.match(/## Available Commands\s+([\s\S]*?)\n---/);
  if (!sectionMatch) {
    return [];
  }

  return sectionMatch[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes('Command |') && !line.includes('---'))
    .map((line) => {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());

      const [command, subSkill, description] = cells;
      return {
        command,
        subSkill: stripMarkdownLink(subSkill),
        description,
      };
    })
    .filter((entry) => entry.command && entry.description);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDisplayDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Vancouver',
  }).format(new Date(value));
}

function buildSnapshot(markdown) {
  const skillFiles = [
    skillMdPath,
    ...listFiles(subSkillsDir).map((fileName) => path.join(subSkillsDir, fileName)),
    ...listFiles(agentsDir).map((fileName) => path.join(agentsDir, fileName)),
    ...listFiles(scriptsDir).map((fileName) => path.join(scriptsDir, fileName)),
  ];
  const commands = parseCommands(markdown);
  const subSkills = listFiles(subSkillsDir);
  const agents = listFiles(agentsDir);
  const scripts = listFiles(scriptsDir);

  return {
    displayName: 'Shadewater SEO Report',
    skillName: 'seo',
    sourceDir: skillDir,
    lastSyncedAt: new Date().toISOString(),
    skillFileUpdatedAt: toIsoFromStat(skillMdPath),
    newestSkillArtifactAt: newestTimestamp(skillFiles),
    stats: {
      commandCount: commands.length,
      subSkillCount: subSkills.length,
      agentCount: agents.length,
      scriptCount: scripts.length,
    },
    commands,
    subSkills,
    agents,
    scripts,
    outputs: staticNarrative.outputs,
    guardrails: staticNarrative.guardrails,
    builtFor: staticNarrative.builtFor,
    headline: staticNarrative.headline,
    summary: staticNarrative.summary,
    workflow: staticNarrative.workflow,
    valueProps: staticNarrative.valueProps,
  };
}

function renderMetricCards(snapshot) {
  const metrics = [
    {
      label: 'Command Routes',
      value: String(snapshot.stats.commandCount),
      detail: 'Top-level command paths',
    },
    {
      label: 'Sub-skills',
      value: String(snapshot.stats.subSkillCount),
      detail: 'Focused audit workflows',
    },
    {
      label: 'Specialist Agents',
      value: String(snapshot.stats.agentCount),
      detail: 'Deep-dive personas',
    },
    {
      label: 'Scripts',
      value: String(snapshot.stats.scriptCount),
      detail: 'Deterministic evidence checks',
    },
  ];

  return metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <p class="metric-label">${escapeHtml(metric.label)}</p>
          <div class="metric-value">${escapeHtml(metric.value)}</div>
          <p class="metric-detail">${escapeHtml(metric.detail)}</p>
        </article>
      `,
    )
    .join('');
}

function renderSimpleCards(items) {
  return items
    .map(
      (item) => `
        <article class="detail-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `,
    )
    .join('');
}

function renderWorkflow(items) {
  return items
    .map(
      (item) => `
        <article class="workflow-card">
          <p class="workflow-step">${escapeHtml(item.label)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `,
    )
    .join('');
}

function renderCommandRows(snapshot) {
  return snapshot.commands
    .map(
      (command) => `
        <tr>
          <td><code>${escapeHtml(command.command)}</code></td>
          <td>${escapeHtml(command.subSkill)}</td>
          <td>${escapeHtml(command.description)}</td>
        </tr>
      `,
    )
    .join('');
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function buildExplainerHtml(snapshot) {
  const syncedAt = formatDisplayDate(snapshot.lastSyncedAt);
  const skillUpdatedAt = formatDisplayDate(snapshot.newestSkillArtifactAt);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(snapshot.displayName)} Explainer</title>
    <meta
      name="description"
      content="${escapeHtml(
        'An in-depth explainer for the Shadewater SEO Report skill, including workflow, safeguards, outputs, and current command coverage.',
      )}"
    />
    <style>
      :root {
        color-scheme: dark;
        --bg: #071622;
        --panel: rgba(18, 36, 48, 0.92);
        --panel-strong: rgba(16, 30, 41, 0.96);
        --line: rgba(255, 255, 255, 0.1);
        --text: #f7efe8;
        --muted: rgba(241, 230, 217, 0.76);
        --teal: #4fa4ab;
        --teal-deep: #244d57;
        --sand: #e8cda6;
        --sand-strong: #f3ddba;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(85, 144, 153, 0.18), transparent 32%),
          radial-gradient(circle at top right, rgba(232, 205, 166, 0.14), transparent 28%),
          linear-gradient(180deg, #091a27 0%, var(--bg) 100%);
        color: var(--text);
        font-family: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
      }

      a {
        color: inherit;
      }

      .shell {
        width: min(1180px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 32px 0 56px;
      }

      .hero {
        display: grid;
        gap: 28px;
        grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
        align-items: start;
        border: 1px solid var(--line);
        border-radius: 36px;
        padding: 34px;
        background:
          linear-gradient(135deg, rgba(28, 55, 69, 0.98), rgba(44, 66, 76, 0.94), rgba(69, 56, 46, 0.9));
        box-shadow: 0 24px 60px rgba(3, 10, 18, 0.28);
      }

      .hero-mark {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(232, 205, 166, 0.22);
        background: rgba(255, 255, 255, 0.04);
        color: rgba(232, 205, 166, 0.9);
        font-size: 12px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
      }

      .hero-title {
        margin: 20px 0 0;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: clamp(3.2rem, 6vw, 5.5rem);
        line-height: 0.92;
      }

      .hero-copy {
        margin: 22px 0 0;
        max-width: 58ch;
        color: var(--muted);
        font-size: 1.08rem;
        line-height: 1.7;
      }

      .hero-meta {
        display: grid;
        gap: 18px;
      }

      .logo-card,
      .meta-card,
      .section {
        border: 1px solid var(--line);
        border-radius: 28px;
        background: var(--panel);
        box-shadow: 0 18px 40px rgba(3, 10, 18, 0.22);
      }

      .logo-card {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 210px;
        padding: 24px;
      }

      .logo-card img {
        width: min(220px, 68%);
        height: auto;
        filter: drop-shadow(0 16px 32px rgba(79, 164, 171, 0.18));
      }

      .meta-card {
        padding: 24px;
      }

      .meta-card h2,
      .section h2 {
        margin: 0;
        font-size: 0.8rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(232, 205, 166, 0.82);
      }

      .meta-card p {
        margin: 12px 0 0;
        color: var(--muted);
        line-height: 1.6;
      }

      .meta-card strong {
        color: var(--text);
      }

      .grid {
        display: grid;
        gap: 22px;
      }

      .metrics {
        margin-top: 28px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .metric-card {
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 22px;
        background: var(--panel-strong);
      }

      .metric-label,
      .workflow-step {
        margin: 0;
        color: rgba(232, 205, 166, 0.82);
        font-size: 0.76rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
      }

      .metric-value {
        margin-top: 14px;
        font-size: 3rem;
        line-height: 1;
        font-weight: 700;
        color: var(--text);
      }

      .metric-detail,
      .detail-card p,
      .workflow-card p,
      .table-wrap td,
      .section-intro,
      .list-grid li {
        color: var(--muted);
        line-height: 1.6;
      }

      .metric-detail {
        margin: 12px 0 0;
      }

      .stack {
        margin-top: 22px;
      }

      .section {
        margin-top: 28px;
        padding: 30px;
      }

      .section-title {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        align-items: center;
        justify-content: space-between;
      }

      .section-title p {
        margin: 0;
      }

      .section-intro {
        margin: 16px 0 0;
        max-width: 70ch;
      }

      .three-up {
        margin-top: 22px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .detail-card,
      .workflow-card {
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 22px;
        background: var(--panel-strong);
      }

      .detail-card h3,
      .workflow-card h3 {
        margin: 14px 0 0;
        font-size: 1.35rem;
      }

      .detail-card p,
      .workflow-card p {
        margin: 12px 0 0;
      }

      .workflow-grid {
        margin-top: 22px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .table-wrap {
        margin-top: 22px;
        overflow: auto;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(10, 22, 30, 0.84);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 760px;
      }

      thead th {
        padding: 16px 18px;
        border-bottom: 1px solid var(--line);
        text-align: left;
        color: rgba(232, 205, 166, 0.88);
        font-size: 0.76rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      tbody td {
        padding: 16px 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        vertical-align: top;
      }

      tbody tr:last-child td {
        border-bottom: 0;
      }

      code {
        display: inline-block;
        padding: 0.22rem 0.48rem;
        border-radius: 0.55rem;
        background: rgba(255, 255, 255, 0.06);
        color: var(--sand-strong);
        font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
        font-size: 0.86rem;
      }

      .list-grid {
        margin-top: 22px;
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        padding-left: 0;
        list-style: none;
      }

      .list-grid li {
        padding: 18px 20px;
        border-radius: 20px;
        border: 1px solid var(--line);
        background: var(--panel-strong);
      }

      .footer-note {
        margin-top: 28px;
        color: rgba(241, 230, 217, 0.66);
        font-size: 0.96rem;
      }

      @media (max-width: 980px) {
        .hero,
        .metrics,
        .three-up,
        .workflow-grid,
        .list-grid {
          grid-template-columns: 1fr;
        }

        .shell {
          width: min(100vw - 24px, 1180px);
          padding-top: 22px;
        }

        .hero {
          padding: 26px;
        }

        .section {
          padding: 24px;
        }

        .hero-title {
          font-size: clamp(2.75rem, 12vw, 4.1rem);
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <div>
          <div class="hero-mark">Shadewater Labs Explainer</div>
          <h1 class="hero-title">Shadewater SEO<br />Report Skill</h1>
          <p class="hero-copy">${escapeHtml(snapshot.summary)}</p>
          <div class="grid metrics">
            ${renderMetricCards(snapshot)}
          </div>
        </div>

        <div class="hero-meta">
          <div class="logo-card">
            <img src="/shadewater-labs-logo-mark.webp" alt="Shadewater Labs logo mark" width="512" height="512" />
          </div>
          <div class="meta-card">
            <h2>Current Sync</h2>
            <p><strong>Last synced:</strong> ${escapeHtml(syncedAt)}</p>
            <p><strong>Latest detected skill update:</strong> ${escapeHtml(skillUpdatedAt)}</p>
            <p><strong>Source:</strong> ${escapeHtml(snapshot.sourceDir)}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>Why This Exists</h2>
        </div>
        <p class="section-intro">${escapeHtml(staticNarrative.headline)}</p>
        <div class="grid three-up">
          ${renderSimpleCards(snapshot.valueProps)}
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>Operator Workflow</h2>
        </div>
        <p class="section-intro">
          The skill is built for repeated audit loops: collect evidence, validate it, produce branded outputs, apply fixes, and rerun the report until the score improves.
        </p>
        <div class="grid workflow-grid">
          ${renderWorkflow(snapshot.workflow)}
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>Built-In Outputs</h2>
        </div>
        <p class="section-intro">
          Every serious audit path ends with artifacts that are useful to both operators and stakeholders.
        </p>
        <div class="grid three-up">
          ${renderSimpleCards(snapshot.outputs)}
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>Command Coverage</h2>
        </div>
        <p class="section-intro">
          These commands are pulled directly from the live skill definition so the explainer stays aligned with the actual operator surface.
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Sub-skill</th>
                <th>What it covers</th>
              </tr>
            </thead>
            <tbody>
              ${renderCommandRows(snapshot)}
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>Safety & Use Cases</h2>
        </div>
        <p class="section-intro">
          The skill is intentionally opinionated about safety, public evidence, and report quality because those boundaries matter once audits touch live websites and repository data.
        </p>
        <div class="grid three-up">
          <article class="detail-card">
            <h3>Guardrails</h3>
            <ul class="list-grid">
              ${renderList(snapshot.guardrails)}
            </ul>
          </article>
          <article class="detail-card">
            <h3>Built For</h3>
            <ul class="list-grid">
              ${renderList(snapshot.builtFor)}
            </ul>
          </article>
          <article class="detail-card">
            <h3>Update Model</h3>
            <p>
              This explainer is generated from the local SEO skill. On this machine, local dev and build flows resync it automatically before the site builds, so command lists and file counts stay current with the real skill.
            </p>
            <p class="footer-note">
              Hosted builds keep the last committed snapshot when the local Codex skill directory is not present.
            </p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function writeSnapshot(snapshot) {
  ensureDirectory(outputTsPath);
  const tsContent = `// Generated by scripts/sync-seo-skill-snapshot.mjs. Do not edit by hand.\nexport const shadewaterSeoSkillSnapshot = ${JSON.stringify(
    snapshot,
    null,
    2,
  )} as const;\n\nexport type ShadewaterSeoSkillSnapshot = typeof shadewaterSeoSkillSnapshot;\n`;
  fs.writeFileSync(outputTsPath, tsContent, 'utf8');

  ensureDirectory(outputHtmlPath);
  fs.writeFileSync(outputHtmlPath, buildExplainerHtml(snapshot), 'utf8');
}

function main() {
  const requiredPaths = [skillMdPath, subSkillsDir, agentsDir, scriptsDir];
  const missing = requiredPaths.filter((filePath) => !fs.existsSync(filePath));

  if (missing.length > 0) {
    console.log(
      `[sync-seo-skill] Skipping sync because the local SEO skill is not fully available: ${missing.join(', ')}`,
    );
    process.exit(0);
  }

  const markdown = fs.readFileSync(skillMdPath, 'utf8');
  const snapshot = buildSnapshot(markdown);
  writeSnapshot(snapshot);
  console.log(
    `[sync-seo-skill] Synced ${snapshot.stats.commandCount} commands, ${snapshot.stats.subSkillCount} sub-skills, ${snapshot.stats.agentCount} agents, and ${snapshot.stats.scriptCount} scripts.`,
  );
}

main();
