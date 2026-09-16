import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

// vercel.json is the entire deploy contract for this site — the security header stack and the
// cache policy — and nothing referenced it. `git grep vercel.json` found only prose — a README, AGENTS.md, MAINTENANCE.md and a NotFound page:
// not one of them is a check. The file could be deleted outright and `npm test`,
// `npm run lint` and `npm run build` would all stay green, because every one of them enumerates
// from src/ and dist/ and never asks whether the deploy config is still there.
//
// Found by probing what each check structurally cannot see. The headers below are asserted by
// role, not by exact value, so tightening a CSP or lengthening HSTS does not fail the build —
// only losing one does.

const rules = () => {
  assert.ok(existsSync('vercel.json'), 'vercel.json is missing — the deploy contract is gone');
  const parsed = JSON.parse(readFileSync('vercel.json', 'utf8'));
  assert.ok(Array.isArray(parsed.headers), 'vercel.json has no headers array');
  return parsed.headers;
};

const ruleFor = (source) => rules().find((r) => r.source === source);

const valueOf = (rule, key) =>
  rule?.headers.find((h) => h.key.toLowerCase() === key.toLowerCase())?.value;

test('vercel.json still carries the security header stack', () => {
  const catchAll = ruleFor('/(.*)');
  assert.ok(catchAll, 'no catch-all /(.*)  header rule');

  for (const key of [
    'X-Content-Type-Options',
    'Strict-Transport-Security',
    'X-Frame-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Content-Security-Policy',
  ]) {
    assert.ok(valueOf(catchAll, key), `catch-all rule lost ${key}`);
  }

  // The two whose *value* carries the guarantee, not just their presence.
  assert.match(valueOf(catchAll, 'X-Content-Type-Options'), /nosniff/);
  assert.match(valueOf(catchAll, 'Strict-Transport-Security'), /max-age=\d+/);
});

test('content-hashed assets are still served immutable', () => {
  // Added in #61. Vite content-hashes everything under /assets/, so a changed file gets a
  // changed name and `immutable` is exactly the guarantee the build already provides. Without
  // this rule Vercel falls back to max-age=0, must-revalidate and every repeat visit
  // re-checks every chunk — which is the state this repo was in until it was measured.
  const assets = ruleFor('/assets/(.*)');
  assert.ok(assets, 'the /assets/(.*) cache rule is gone — bundles fall back to revalidating');

  const cacheControl = valueOf(assets, 'Cache-Control');
  assert.ok(cacheControl, '/assets/ rule carries no Cache-Control');
  assert.match(cacheControl, /immutable/);
  assert.match(cacheControl, /max-age=(\d+)/);
  assert.ok(
    Number(cacheControl.match(/max-age=(\d+)/)[1]) >= 2592000,
    'max-age dropped below 30 days; hashed assets should be cached for a year',
  );
});

test('the security rule is ordered so the specific cache rule cannot displace it', () => {
  // Vercel merges matching header rules rather than picking one — proven on a live deployment
  // before this shape was adopted. Order still matters for readability and for any future
  // duplicate key, so the catch-all stays first.
  const sources = rules().map((r) => r.source);
  assert.equal(sources[0], '/(.*)', 'the catch-all must remain the first header rule');
  assert.ok(sources.includes('/assets/(.*)'));
});
