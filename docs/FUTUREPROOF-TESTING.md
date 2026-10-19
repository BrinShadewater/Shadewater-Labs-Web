# Temporary Futureproof companion

The reviewed public companion is hosted at https://shadewaterlabs.com/Testing (redirects to /Testing/program so the landing page stays inside its /Testing/ service-worker scope under this site's slash normalization).

`public/Testing` is a compiled static snapshot, not an independently editable app source. Source lives in Alex's Futureproof App workspace. Build there with COMPANION_BASE=/Testing/ and COMPANION_PREVIEW=1 using `npm run build -- --outDir dist-testing`, then copy the output into public/Testing, excluding Cloudflare-only _headers. Keep old fingerprinted assets when updating so existing tabs can recover. Test program refresh and PWA activation before deploying.

The temporary pages are noindex and deliberately omitted from the public sitemap and navigation. This is a test installation, not the final festival origin. Device-local saves do not transfer from localhost or to a different origin. No private attendee data is included. The service worker and manifest are scoped to /Testing/.

To retire: remove the Testing redirect/rewrites/headers and static snapshot, and deploy a service-worker retirement response first for existing installations. Do not remove unrelated host routes or change the site's security policy.
