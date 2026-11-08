import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { webpExample } from '@/content/webpExample';
import { buildProjectHref } from '@/lib/routes';

const { title, description, source, preview, variants } = webpExample;
const srcSet = variants.map(({ src, width }) => `${src} ${width}w`).join(', ');
const formatSize = (bytes: number) => `${(bytes / 1000).toFixed(1)} kB`;
const cellStyle = { padding: '10px 8px', borderBottom: 'var(--ad-card-border)', textAlign: 'left' } as const;
const imageStyle = { display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'contain', borderRadius: 10, background: '#08131d' } as const;

export default function WebpExample({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <AuroraPage active="projects" onNavigate={onNavigate} sectionLabel="Webp Me Daddy example" eyebrow="WORKED EXAMPLE · IMAGE OPTIMIZATION" title={title} lede={description}>
      <article style={{ ...pp.section, maxWidth: 960 }}>
        <h2 style={pp.sectionTitle}>Original and optimized</h2>
        <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 20 }}>
          I started with a desktop screenshot and ran Webp Me Daddy’s card thumbnail recipe. It cropped the screenshot to 16:9 and exported four widths so a small card can load a smaller file.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: 18 }}>
          <figure style={{ ...pp.projectCard, padding: 14 }}>
            <img src={source.src} alt={source.alt} width={source.width} height={source.height} loading="lazy" decoding="async" style={imageStyle} />
            <figcaption style={{ ...pp.projectBlurb, marginTop: 12 }}>Original JPEG · {source.width} × {source.height} · {formatSize(source.bytes)}</figcaption>
          </figure>
          <figure style={{ ...pp.projectCard, padding: 14 }}>
            <img {...preview} srcSet={srcSet} sizes="auto, (max-width: 717px) calc(100vw - 70px), (max-width: 768px) calc(50vw - 59px), (max-width: 960px) calc(50vw - 71px), 409px" loading="lazy" decoding="async" style={imageStyle} />
            <figcaption style={{ ...pp.projectBlurb, marginTop: 12 }}>Responsive WebP · the browser picks a width for this display</figcaption>
          </figure>
        </div>
        <section aria-labelledby="webp-example-files" style={{ marginTop: 32 }}>
          <h2 id="webp-example-files" style={pp.sectionTitle}>The exported files</h2>
          <table aria-labelledby="webp-example-files" style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--ad-copy)', fontSize: 14 }}>
            <thead>
              <tr><th scope="col" style={cellStyle}>WebP dimensions</th><th scope="col" style={cellStyle}>File size</th><th scope="col" style={cellStyle}>Example use</th></tr>
            </thead>
            <tbody>
              {variants.map(({ src, width, height, bytes, use }) => (
                <tr key={width}>
                  <th scope="row" style={cellStyle}><a href={src} style={{ color: 'hsl(186 70% 77%)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{width} × {height}</a></th>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>{formatSize(bytes)}</td>
                  <td style={cellStyle}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: TG_MUTED, fontSize: 14, marginTop: 12 }}>These are the sizes from this run. The best file for a visitor depends on the display width and pixel density.</p>
        </section>
        <a href={buildProjectHref('webp-me-daddy-skill')} style={{ ...ad.btnGhost, marginTop: 24 }}><span aria-hidden="true">←</span> Back to Webp Me Daddy</a>
      </article>
    </AuroraPage>
  );
}
