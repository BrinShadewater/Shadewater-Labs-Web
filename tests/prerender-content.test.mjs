import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const routes = [
  ['', /The studio for weird-good/, /AI tools and tech experiments/],
  ['projects', /Projects from the lab\./, /Lucid Sheep/],
  ['projects/brinespace', /BrineSpace/, /Archive the expedition/],
  ['projects/brinespace/asset-pipeline', /How BrineSpace assets are made/, /The finished room in-game/],
  ['projects/futureproof', /Futureproof Festival Companion &amp; FishMail/, /Sending a note through the aquarium/],
  ['websites', /Managed web properties\./, /InkMaster Studio/],
  ['toolkit', /The toolkit\./, /Third-party tools/],
  ['about', /The person behind the lab\./, /Vancouver/],
];
const bodyText = html => html.split('<body>')[1]
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

for (const [label, destination] of [['All projects', '/projects'], ['All websites', '/websites']]) {
  test(`${label} is a real navigation link in the served homepage`, async () => {
    const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
    const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
    const matches = links.filter(([, , content]) => content.replace(/<[^>]*>/g, '').trim().startsWith(label));
    assert.equal(matches.length, 1, `expected one ${label} anchor`);
    assert.match(matches[0][1], new RegExp(`\\bhref="${destination}"`));
  });
}

for (const route of ['', 'projects/']) {
  test(`${route || 'home'} links directly to current projects before JavaScript`, async () => {
    const html = await readFile(new URL(`../dist/${route}index.html`, import.meta.url), 'utf8');
    assert.match(html, /<a\b[^>]*\bhref="#current-projects"[^>]*>[\s\S]*?<\/a>/);
    assert.equal((html.match(/\bid="current-projects"/g) || []).length, 1);
  });
}

for (const [route, heading, detail] of routes) {
  test(`${route || 'home'} serves its own actual page before JavaScript`, async () => {
    const html = await readFile(new URL(`../dist/${route ? route + '/' : ''}index.html`, import.meta.url), 'utf8');
    const text = bodyText(html);
    assert.match(text, heading);
    assert.match(text, detail);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.match(html, /data-prerender-route=/);
    assert.doesNotMatch(html, /seo-shell__hero|<!--route-body-->/);
  });
}

test('homepage description and share descriptions come from the runtime SEO config', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const source = await readFile(new URL('../src/lib/seo.ts', import.meta.url), 'utf8');
  const description = source.match(/const LABS_DESCRIPTION\s*=\s*'([^']+)'/)[1];
  for (const key of ['description', 'og:description', 'twitter:description']) {
    const tag = html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]+)"`));
    assert.equal(tag?.[1], description);
  }
});

test('prerendered share cards declare the dimensions of the image they use', async () => {
  for (const [route, image, width, height] of [
    ['', 'shadewater-labs-share-card.jpg', '1200', '630'],
    ['projects/', 'shadewater-labs-share-card.jpg', '1200', '630'],
    ['projects/brinespace/', 'brinespace-expedition-draft.webp', '1200', '675'],
    ['projects/futureproof/', 'futureproof-companion-dark.webp', '960', '540'],
    ['about/', 'shadewater-labs-logo.webp', '408', '712'],
  ]) {
    const html = await readFile(new URL(`../dist/${route}index.html`, import.meta.url), 'utf8');
    const tags = new Map([...html.matchAll(/<meta property="(og:image(?::width|:height)?)" content="([^"]+)"/g)]
      .map(([, key, value]) => [key, value]));
    assert.equal(tags.get('og:image'), `https://shadewaterlabs.com/${image}`);
    assert.ok(html.includes(`<meta name="twitter:image" content="https://shadewaterlabs.com/${image}"`));
    assert.equal(tags.get('og:image:width'), width);
    assert.equal(tags.get('og:image:height'), height);
  }
});
