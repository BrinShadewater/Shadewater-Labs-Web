# Maintenance

## Routine Checks

```shell
npm run lint
npm run build
```

The build runs the SEO-skill and explainer sync scripts before compiling. Review generated files before committing them.

## Generated Assets

Important scripts:

```shell
npm run sync:seo-skill
npm run sync:explainers
```

Use them when project explainers or SEO skill material changes. Do not treat generated diffs as noise; they are part of the public proof surface.

## Content Freshness

Review periodically:

- Project page links
- Screenshots and thumbnails
- Explainer PDFs
- SEO report examples
- `public/llms.txt` and `public/llms-full.txt`
- `public/sitemap.xml`
- Tech-news items

## Visual QA

Check desktop and mobile for:

- Project card image cropping
- Long project names
- Logo/lockup contrast
- Route-level metadata
- Footer links

## Deployment Notes

The repo includes `vercel.json`. Confirm deployment settings before changing routing, assets, or generated static files.
