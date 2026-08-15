// Guards the pre-render shell in index.html.
//
// This site was never broken — it is the repo the fix pattern was COPIED FROM. On
// 2026-08-13 an audit of every Shadewater site found brinshadewater.com serving 56
// characters of visible text with JavaScript off and inkmasterstudio.com serving 44,
// while this one served 1,475 because it already had `.seo-shell`. Both of those were
// fixed by copying this file's approach.
//
// So this test is not a repair. It is insurance on the one that was already right, and
// the reason it is needed is the same everywhere: GPTBot, ClaudeBot and PerplexityBot do
// not execute JavaScript, Googlebot DOES, so if the shell were ever deleted the site would
// go invisible to AI crawlers while Search Console and every visual check stayed green.
// The shell looks like dead markup inside #root and React replaces it on mount, so nothing
// a human would notice breaks when it goes.
//
// Asserts against dist/, not the source, so a build step that strips or rewrites the markup
// fails too. Run `npm run build` first — `npm test` does that for you.

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const distIndex = new URL('../dist/index.html', import.meta.url);

/** Visible text a non-JS crawler would read: drop script/style/comments, then tags. */
function crawlerVisibleText(html) {
  const withoutInert = html
    .replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  return withoutInert
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('the built page is readable by crawlers that do not run JavaScript', async () => {
  const html = await readFile(distIndex, 'utf8');
  const text = crawlerVisibleText(html);

  // Measured 1,475 chars on 2026-08-15. 800 leaves room for ordinary copy edits while
  // still failing hard if the shell is removed — an empty root div yields well under 100.
  assert.ok(
    text.length > 800,
    `expected >800 chars of crawler-visible text, got ${text.length}. ` +
      'The pre-render shell in index.html has probably been removed — see the note at the ' +
      'top of this file.',
  );
});

test('the built page exposes a heading and body copy to crawlers', async () => {
  const html = await readFile(distIndex, 'utf8');
  const body = html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');

  assert.match(body, /<h1[\s>]/i, 'expected an <h1> in the served HTML');
  assert.match(body, /<h2[\s>]/i, 'expected at least one <h2> in the served HTML');
});

test('the built page names the site in the body, not just the head', async () => {
  const html = await readFile(distIndex, 'utf8');

  // Scoped to <body> deliberately. The equivalent assertion on brinshadewater.com was
  // originally written against the whole document and PASSED with the shell deleted,
  // because <title> still carried the site name — it asserted metadata, not readable
  // content. Caught by mutation-testing that guard; fixed here from the start.
  const body = html.slice(html.indexOf('<body'));
  const text = crawlerVisibleText(body);

  assert.match(
    text,
    /Shadewater Labs/i,
    'expected the site name in crawler-visible BODY text, not only in <title>',
  );
});

test('the shell sits inside the React root so it is replaced on mount', async () => {
  const html = await readFile(distIndex, 'utf8');

  // Anything outside #root would persist after hydration and double up with the real UI.
  const rootStart = html.indexOf('<div id="root">');
  assert.ok(rootStart !== -1, 'expected a <div id="root"> in the built HTML');
  assert.ok(
    html.indexOf('seo-shell', rootStart) > rootStart,
    'expected the shell markup inside #root, not before it',
  );
});
