// Guards the per-route shells written by the labs-prerender-shells plugin in vite.config.ts.
//
// Why this exists: on 2026-09-06 an audit of canonical/og:url across 52 pages on seven sites
// found /projects, /websites, /toolkit and /about all serving the HOME page's canonical and
// og:url. This is a single-page app, so every route was served the one index.html, and only
// the runtime <Seo> corrected the tags. Googlebot runs JavaScript; GPTBot, ClaudeBot,
// PerplexityBot and every share scraper do not — so those four routes were announcing
// themselves as duplicates of "/" to exactly the clients that decide whether they get indexed
// and how a shared link looks.
//
// The failure mode this test protects against is silent: the site looks perfect in a browser,
// the pages render, nothing turns red. Only a crawler or a share card would ever show it.
//
// Asserts against dist/, not the source, so a build change that drops the plugin fails here.
// Run `npm run build` first — `npm test` does that for you.

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const ORIGIN = 'https://shadewaterlabs.com';
const ROUTES = ['projects', 'websites', 'toolkit', 'about'];

const shell = (route) => new URL(`../dist/${route}/index.html`, import.meta.url);
const homeShell = new URL('../dist/index.html', import.meta.url);

const attr = (html, pattern) => {
  const m = html.match(pattern);
  return m ? m[1] : null;
};
const canonicalOf = (html) => attr(html, /<link rel="canonical" href="([^"]+)"/);
const ogUrlOf = (html) => attr(html, /<meta property="og:url" content="([^"]+)"/);
const titleOf = (html) => attr(html, /<title>([^<]*)<\/title>/);

test('every prerendered route names itself, not the home page', async () => {
  const home = await readFile(homeShell, 'utf8');
  const homeTitle = titleOf(home);

  for (const route of ROUTES) {
    const html = await readFile(shell(route), 'utf8');
    const want = `${ORIGIN}/${route}`;

    assert.equal(canonicalOf(html), want, `${route}: canonical must be its own URL`);
    assert.equal(ogUrlOf(html), want, `${route}: og:url must be its own URL`);
    assert.notEqual(
      titleOf(html),
      homeTitle,
      `${route}: title must not be the home page's, or share cards all read the same`,
    );
    assert.match(html, /<div id="root">/, `${route}: the app must still hydrate inside the shell`);
  }
});

test('the home page keeps the origin as its canonical', async () => {
  const html = await readFile(homeShell, 'utf8');
  assert.equal(canonicalOf(html), `${ORIGIN}/`);
});

test('each route shell carries structured data the crawler can read without JavaScript', async () => {
  for (const route of ROUTES) {
    const html = await readFile(shell(route), 'utf8');
    const blocks = html.match(/<script type="application\/ld\+json" data-seo-jsonld="true">/g) ?? [];
    assert.ok(blocks.length > 0, `${route}: expected at least one JSON-LD block in the shell`);
    // data-seo-jsonld is what Seo.tsx replaces on mount; without it the runtime component
    // would append a second copy of every entry instead of swapping them.
    for (const raw of html.matchAll(
      /<script type="application\/ld\+json" data-seo-jsonld="true">([\s\S]*?)<\/script>/g,
    )) {
      assert.doesNotThrow(
        () => JSON.parse(raw[1].replace(/\\u003c/g, '<')),
        `${route}: JSON-LD must parse`,
      );
    }
  }
});
