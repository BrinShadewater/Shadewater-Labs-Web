import { createServer, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
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

/** Both development HTML and built route heads use the runtime SEO config. */
function pageHead(shell: string, page: string) {
  const cfg = getSeoConfig(page, '', 'labs')
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(cfg.title)}</title>`)
  if (page !== 'labs') html = html.replace(/<link\s+id="labs-hero-preload"[^>]*>\s*/, '')
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeAttr(cfg.canonical)}" />`,
  )
  // The hreflang alternates are self-referencing on a single-language site, so on a
  // sub-route they must name that route. Left as the shell's, every page told search
  // engines the English version of itself was the home page — the same claim the
  // canonical was making, in a second place.
  html = html.replace(
    /<link rel="alternate" hreflang="([^"]+)" href="[^"]*" \/>/g,
    (_m, lang) => `<link rel="alternate" hreflang="${lang}" href="${escapeAttr(cfg.canonical)}" />`,
  )
  const tags: Record<string, string> = {
    description: cfg.description,
    robots: cfg.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large',
    'og:title': cfg.title,
    'og:description': cfg.description,
    'og:type': cfg.type,
    'og:url': cfg.canonical,
    'og:image': cfg.image,
    'og:image:width': String(cfg.imageWidth),
    'og:image:height': String(cfg.imageHeight),
    'og:image:alt': cfg.imageAlt,
    'og:site_name': cfg.siteName,
    'twitter:title': cfg.title,
    'twitter:description': cfg.description,
    'twitter:image': cfg.image,
    'twitter:image:alt': cfg.imageAlt,
  }
  if (cfg.keywords) tags.keywords = cfg.keywords
  if (cfg.author) tags.author = cfg.author
  for (const [key, value] of Object.entries(tags)) html = setMeta(html, key, value)
  // data-seo-jsonld marks them so Seo.tsx replaces rather than duplicates them on mount.
  const jsonLd = cfg.jsonLd
    .map((entry) => `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(entry).replace(/</g, '\\u003c')}</script>`)
    .join('\n')
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo-jsonld="true">[\s\S]*?<\/script>/g, '')
  if (jsonLd) html = html.replace('</head>', `${jsonLd}\n  </head>`)
  return html
}

/** Render page components at build time; createRoot replaces them when JS runs. */
function prerenderShells(): Plugin {
  let outDir = 'dist'
  let building = false
  return {
    name: 'labs-prerender-shells',
    configResolved(config) { outDir = config.build.outDir; building = config.command === 'build' },
    transformIndexHtml(html) { return pageHead(html, 'labs') },
    async closeBundle() {
      if (!building) return
      const root = path.resolve(import.meta.dirname, outDir)
      const shell = readFileSync(path.join(root, 'index.html'), 'utf8')
      // An isolated Vite module runner transforms TSX and resolves the site's alias.
      // It never listens on a network port and always closes on render failure.
      const renderer = await createServer({
        configFile: false,
        root: import.meta.dirname,
        plugins: [react()],
        resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
        server: { middlewareMode: true, watch: null, hmr: false },
        appType: 'custom',
      })
      try {
        const { renderRoute } = await renderer.ssrLoadModule('/src/prerender.tsx')
        const targets = [{ path: '/', page: 'labs' }, ...getLabsPrerenderTargets()]
        for (const target of targets) {
          let html = pageHead(shell, target.page)
          if (!html.includes('<!--route-body-->')) throw new Error('Missing route body marker')
          html = html.replace('<!--route-body-->', () => renderRoute(target.page))
          const dir = path.join(root, target.path.replace(/^\//, ''))
          mkdirSync(dir, { recursive: true })
          writeFileSync(path.join(dir, 'index.html'), html)
        }
        this.info(`labs-prerender-shells: ${targets.length} complete route bodies and heads written`)
      } finally { await renderer.close() }
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderShells()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
})
