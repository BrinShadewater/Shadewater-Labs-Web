# Retired Futureproof test installation

The temporary Futureproof companion at `/Testing` was removed on 2026-10-31.
The compiled snapshot, test API handler, server modules, and app routing are retired.
`/Testing` and its former app routes now return the host's normal 404 response.

Keep `public/Testing/sw.js` and its no-store header available so previously installed
service workers can update, clear only Futureproof/scoped Workbox caches, unregister,
and reload controlled pages. Device-local attendee saves and external databases are
not deleted. Offline installations receive retirement when they reconnect and update.

The independent Futureproof source workspace is unchanged.
