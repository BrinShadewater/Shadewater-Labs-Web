import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import vm from 'node:vm';

test('retired Testing app has no serving routes or bundled files', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  for (const rule of [...config.redirects, ...config.rewrites]) {
    assert.doesNotMatch(rule.source, /^\/(?:api\/)?(?:testing|futureproof)/i);
  }
  assert.deepEqual(await readdir('public/Testing'), ['sw.js']);
});

test('retirement clears only app caches and reloads controlled app windows', async () => {
  const events = {};
  const deleted = [];
  const navigated = [];
  const scope = 'https://shadewaterlabs.com/Testing/';
  let unregistered = false;
  const keys = ['futureproof-public-art-v1', `workbox-precache-v2-${scope}`, 'other-app-cache'];
  const self = {
    addEventListener: (name, handler) => { events[name] = handler; },
    skipWaiting() {},
    registration: { scope, unregister: async () => { unregistered = true; } },
    clients: { matchAll: async () => [scope + 'program', 'https://shadewaterlabs.com/about']
      .map((url) => ({ url, navigate: async () => { navigated.push(url); } })) },
  };
  vm.runInNewContext(await readFile('public/Testing/sw.js', 'utf8'), {
    self,
    caches: { keys: async () => keys, delete: async (key) => { deleted.push(key); } },
  });
  let finished;
  events.activate({ waitUntil: (promise) => { finished = promise; } });
  await finished;
  assert.deepEqual(deleted, keys.slice(0, 2));
  assert.equal(unregistered, true);
  assert.deepEqual(navigated, [scope + 'program']);
});
