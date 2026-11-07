# Retired Futureproof test installation

The temporary Futureproof companion at `/Testing` was removed on 2026-10-31.
The compiled snapshot, test API handler, server modules, and app routing are retired.
`/Testing` and its former app routes now return the host's normal 404 response.

Keep `public/Testing/sw.js` and its no-store header available so previously installed
service workers can update, clear only Futureproof/scoped Workbox caches, unregister,
and reload controlled pages. Device-local attendee saves and external databases are
not deleted. Offline installations receive retirement when they reconnect and update.

The independent Futureproof source workspace is unchanged.

## Festival-hosted 2026 edition

Verified November 7, 2026. The festival kept both routes online after the October 28–30 Vancouver event. The festival controls their availability. The Shadewater Labs project descriptions remain useful if either route is retired.

| Project | Festival URL | Shadewater Labs record |
| --- | --- | --- |
| Futureproof Festival Companion | [Open the companion](https://www.futureproof.website/app/) | [Futureproof](https://shadewaterlabs.com/projects#futureproof) |
| FishMail | [Open FishMail](https://www.futureproof.website/app/fish-mail/) | [FishMail](https://shadewaterlabs.com/projects#fishmail) |

The companion includes the searchable programme, speaker profiles, and a personal schedule. The programme is accessible while signed out. FishMail is the companion's interactive aquarium and private messaging feature. Signed-in attendees choose a fish, find another attendee, and send a note that travels across the ocean before reaching the recipient's inbox.
