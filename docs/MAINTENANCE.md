# Maintenance

## Routine Checks

```shell
npm run lint
npm test
```

`npm test` builds the site and checks the prerendered pages and retired routes.

## Generated Repository Dates

The build runs `scripts/refresh-updated.mjs` before compiling. It fetches GitHub push dates and keeps the committed value when a repository lookup fails. Review changes to `src/content/generated/updated.json` before committing.

## Content Freshness

Review periodically:

- Project links and managed-site access, including redirects to password or sign-in pages
- Screenshots and thumbnails
- `public/llms.txt` and `public/llms-full.txt`
- `public/sitemap.xml`

## Visual QA

Check desktop and mobile for:

- Project card image cropping
- Long project names
- Logo/lockup contrast
- Route-level metadata
- Footer links

## Deployment Notes

The repo includes `vercel.json`. Confirm deployment settings before changing routing, assets, or generated static files.
