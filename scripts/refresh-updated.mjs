/**
 * refresh-updated — writes src/content/generated/updated.json, the "last push" date for
 * every repo the site shows a date for (open-source releases and managed websites).
 *
 * The home HUD says "Last updated" and the site's own comment says nothing on it is
 * hand-entered. Until 2026-09-05 those dates WERE hand-typed in the content files and
 * had drifted by up to five months. This script makes the claim true.
 *
 * Runs on `prebuild`. Reads GitHub's public API, one request per repo, unauthenticated
 * (60/hour per IP is plenty for eight repos) or with GITHUB_TOKEN when present, which is
 * what lets the two private repos resolve on a developer machine:
 *
 *   GITHUB_TOKEN=$(gh auth token) npm run refresh:updated
 *
 * When a lookup fails (rate limit, private repo without a token, offline) the committed
 * value for that repo is kept, so a Vercel build never invents a date and never fails
 * for want of the network. A repo with no committed value and no answer fails the build,
 * because a missing date would otherwise render as "undefined" on the home page.
 *
 * Dates are the push date in America/Vancouver, matching the rest of the site.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

async function main() {
  const ROOT = process.cwd();
  const OUT = path.join(ROOT, "src", "content", "generated", "updated.json");

  // id -> GitHub repo. Keep in step with openSource.ts and websites.ts; the build fails
  // loudly when an id here has no date, and the content files fail to type-check when an
  // id there is missing here.
  const REPOS = {
    // Open-source releases
    "lucid-sheep": "BrinShadewater/Lucid-Sheep-Skill",
    "webp-me-daddy-skill": "BrinShadewater/Webp-Me-Daddy-Skill",
    "shadewater-seo-skill": "BrinShadewater/Shadewater-SEO-Skill",
    "agent-memory-starter": "BrinShadewater/Agent-Memory-Starter",
    "transparent-gif-loop-skill": "BrinShadewater/Transparent-Gif-Loop-Skill",
    // Managed websites (two are private: kept current with a token, else the committed value)
    brinshadewater: "BrinShadewater/Brin-Shadewater-Web",
    shadewaterlabs: "BrinShadewater/Shadewater-Labs-Web",
    datagoblin: "BrinShadewater/Data-Goblin-Web",
    inkmasterstudio: "BrinShadewater/Ink-Master-Studio-Web",
    strangeharvestmovie: "BrinShadewater/Strange-Harvest-Web",
    strangeharvestmerch: "BrinShadewater/Strange-Harvest-Shopify-Store",
    losthills: "BrinShadewater/Lost-Hills-Web",
  };

  const vancouverDate = (iso) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Vancouver",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(iso)); // en-CA formats as YYYY-MM-DD

  const previous = await fs
    .readFile(OUT, "utf8")
    .then((text) => JSON.parse(text))
    .catch(() => ({}));

  const headers = { Accept: "application/vnd.github+json", "User-Agent": "shadewaterlabs.com build" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const next = {};
  const kept = [];
  const missing = [];
  for (const [id, repo] of Object.entries(REPOS)) {
    let date = null;
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`, { headers, signal: AbortSignal.timeout(8000) });
      if (response.ok) {
        const { pushed_at } = await response.json();
        if (pushed_at) date = vancouverDate(pushed_at);
      }
    } catch {
      // Offline or timed out: fall through to the committed value.
    }
    if (date) {
      next[id] = date;
    } else if (previous[id]) {
      next[id] = previous[id];
      kept.push(id);
    } else {
      missing.push(id);
    }
  }

  if (missing.length) {
    console.error(`refresh-updated: no date and no committed value for: ${missing.join(", ")}`);
    process.exit(1);
  }

  const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  console.log(
    `refresh-updated: ${Object.keys(sorted).length} repos` +
      (kept.length ? `; kept committed value for ${kept.join(", ")}` : ""),
  );

}

main().catch((error) => {
  console.error(`refresh-updated: ${error.message}`);
  process.exit(1);
});
