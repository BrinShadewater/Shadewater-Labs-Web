// Retire the temporary /Testing/ installation without touching local attendee saves.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const scope = self.registration.scope;
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) =>
      key.startsWith('futureproof-') || (key.startsWith('workbox-') && key.includes(scope))
    ).map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    await Promise.all(clients.filter((client) => client.url.startsWith(scope))
      .map((client) => client.navigate(client.url)));
  })());
});
