import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { getLabsPrerenderTargets, getSeoConfig } from './src/lib/seo'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace one <meta name|property="key"> in the shell, or add it before </head>. */
function setMeta(html: string, key: string, content: string) {
  const attr = key.startsWith('og:') || key.startsWith('article:') ? 'property' : 'name'
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`
  // Whitespace before the attribute name, not \b: inside a template literal \b is a backspace.
  const pattern = new RegExp(`<meta[^>]*?\\s(?:name|property)="${key.replace(/[.:]/g, '\\$&')}"[^>]*?/?>`, 's')
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

/**
 * Write one HTML shell per route with that route's own <head>.
 *
 * This is a single-page app: every route served index.html, so /projects, /websites,
 * /toolkit and /about each carried the home page's canonical, og:url and title. Only the
 * runtime <Seo> corrected them, and share scrapers and the AI crawlers do not run
 * JavaScript — so those four routes announced themselves as duplicates of "/" to everything
 * that matters for indexing (found by a canonical audit across seven sites, 2026-09-06).
 *
 * Vercel serves a file that exists before it applies the SPA rewrite, so dist/projects/
 * index.html wins for that URL and the app still hydrates inside it. The tags come from the
 * same getSeoConfig() the runtime component uses, so the two cannot disagree.
 *
 * The visible shell body stays the home page's, as it does on brinshadewater.com: this fixes
 * what each page claims to BE, not yet what each page says. Route-specific shell copy is a
 * larger change and a separate one.
 */
function prerenderShells(): Plugin {
  let outDir = 'dist'
  return {
    name: 'labs-prerender-shells',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const root = path.resolve(import.meta.dirname, outDir)
      const shell = readFileSync(path.join(root, 'index.html'), 'utf8')
      let written = 0
      for (const target of getLabsPrerenderTargets()) {
        const cfg = getSeoConfig(target.page, '', 'labs')
        let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(cfg.title)}</title>`)
        html = html.replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="${escapeAttr(cfg.canonical)}" />`,
        )
        const tags: Record<string, string> = {
          description: cfg.description,
          robots: cfg.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large',
          'og:title': cfg.title,
          'og:description': cfg.description,
          'og:type': cfg.type,
          'og:url': cfg.canonical,
          'og:image': cfg.image,
          'og:image:alt': cfg.imageAlt,
          'og:site_name': cfg.siteName,
          'twitter:title': cfg.title,
          'twitter:description': cfg.description,
          'twitter:image': cfg.image,
          'twitter:image:alt': cfg.imageAlt,
        }
        if (cfg.keywords) tags.keywords = cfg.keywords
        for (const [key, value] of Object.entries(tags)) html = setMeta(html, key, value)
        // data-seo-jsonld marks them so Seo.tsx replaces rather than duplicates them on mount.
        const jsonLd = cfg.jsonLd
          .map((entry) => `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(entry).replace(/</g, '\\u003c')}</script>`)
          .join('\n')
        html = html.replace(/\s*<script type="application\/ld\+json" data-seo-jsonld="true">[\s\S]*?<\/script>/g, '')
        if (jsonLd) html = html.replace('</head>', `${jsonLd}\n  </head>`)
        const dir = path.join(root, target.path.replace(/^\//, ''))
        mkdirSync(dir, { recursive: true })
        writeFileSync(path.join(dir, 'index.html'), html)
        written += 1
      }
      this.info(`labs-prerender-shells: ${written} route shells written`)
    },
  }
}
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderShells()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
