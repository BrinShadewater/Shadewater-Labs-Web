import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';

const site = new URL('https://shadewaterlabs.com');
const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };

function decodeHtml(value) {
  return value.replace(/&(amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity, name) => {
    if (name[0] !== '#') return entities[name.toLowerCase()];
    const hex = name[1].toLowerCase() === 'x';
    const codePoint = Number.parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10);
    return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
  });
}

function readPage(html) {
  const links = [];
  const targets = new Set();
  // The build emits HTML attributes. Ignore comments and raw text where apparent tags are only content.
  const markup = html.replace(/<!--[\s\S]*?-->|<(script|style|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  for (const [, tag, raw] of markup.matchAll(/<([a-z][\w:-]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi)) {
    const attributes = new Map();
    for (const [, name, double, single, unquoted] of raw.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attributes.set(name.toLowerCase(), decodeHtml(double ?? single ?? unquoted ?? ''));
    }
    if (attributes.has('id')) targets.add(attributes.get('id'));
    if (/^a$/i.test(tag) && attributes.has('name')) targets.add(attributes.get('name'));
    if (/^(a|area)$/i.test(tag) && attributes.has('href')) links.push(attributes.get('href'));
  }
  return { links, targets };
}

test('built internal links resolve to pages, section IDs, or files', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  const output = config.outputDirectory;
  const entries = await readdir(output, { recursive: true, withFileTypes: true });
  const files = new Set(entries.filter(entry => entry.isFile()).map(entry => {
    const relative = path.relative(output, path.join(entry.parentPath, entry.name));
    return '/' + relative.split(path.sep).join('/');
  }));
  const pages = new Map();
  for (const file of files) {
    if (file.endsWith('.html')) pages.set(file, readPage(await readFile(path.join(output, file.slice(1)), 'utf8')));
  }

  const rewrites = new Map(config.rewrites.map(rule => [rule.source, rule.destination]));
  const redirects = new Map(config.redirects.map(rule => [rule.source, rule.destination]));
  const sources = new Map(config.rewrites.filter(rule => rule.destination !== '/index.html').map(rule => [rule.destination, rule.source]));
  const resolveFile = (pathname, visited = new Set()) => {
    const route = pathname.replace(/\/+$/, '') || '/';
    if (visited.has(route)) return undefined;
    visited.add(route);
    if (redirects.has(route)) return resolveFile(redirects.get(route), visited);
    if (files.has(route)) return route;
    const index = route === '/' ? '/index.html' : `${route}/index.html`;
    if (files.has(index)) return index;
    const rewritten = rewrites.get(route);
    // The shared app shell would hide a missing prerendered page.
    if (rewritten && rewritten !== '/index.html') return resolveFile(rewritten, visited);
  };

  const broken = [];
  const checkLink = (source, href) => {
    const report = reason => broken.push(`${source} → ${JSON.stringify(href)} (${reason})`);
    let url;
    try {
      url = new URL(href, new URL(source, site));
    } catch {
      report('invalid URL');
      return;
    }
    if (!/^https?:$/.test(url.protocol) || url.hostname !== site.hostname) return;

    let pathname, fragment;
    try {
      pathname = decodeURIComponent(url.pathname);
      fragment = decodeURIComponent(url.hash.slice(1).split(':~:')[0]);
    } catch {
      report('invalid URL encoding');
      return;
    }
    const file = resolveFile(pathname);
    if (!file) report('missing page or file');
    else if (fragment && pages.has(file) && !pages.get(file).targets.has(fragment)) report(`missing section #${fragment}`);
  };

  for (const [file, { links }] of pages) {
    const source = file.endsWith('/index.html') ? file.slice(0, -'/index.html'.length) || '/' : sources.get(file) ?? file;
    for (const href of new Set(links)) checkLink(source, href);
  }
  const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');
  for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) checkLink('/sitemap.xml', decodeHtml(loc.trim()));
  assert.equal(broken.length, 0, `Broken internal links:\n${broken.join('\n')}`);
});
