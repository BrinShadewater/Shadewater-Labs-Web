import { useEffect, useRef, useState } from 'react';
import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { webpExample } from '@/content/webpExample';
import { buildPath, buildProjectHref, LABS_ORIGIN } from '@/lib/routes';

const { title, description, source, preview, variants } = webpExample;
const srcSet = variants.map(({ src, width }) => `${src} ${width}w`).join(', ');
const snippetSrcSet = variants.map(({ src, width }) => `${LABS_ORIGIN}${src} ${width}w`).join(',\n    ');
const htmlSnippet = `<img
  src="${LABS_ORIGIN}${preview.src}"
  srcset="
    ${snippetSrcSet}"
  sizes="(max-width: 440px) calc(100vw - 40px), 400px"
  width="${preview.width}"
  height="${preview.height}"
  alt="${preview.alt}"
  style="width: min(calc(100vw - 40px), 400px); max-width: 100%; height: auto;"
>`;
const formatSize = (bytes: number) => `${(bytes / 1000).toFixed(1)} kB`;
const cellStyle = { padding: '10px 8px', borderBottom: 'var(--ad-card-border)', textAlign: 'left' } as const;
const tableStyle = { width: '100%', borderCollapse: 'collapse', color: 'var(--ad-copy)', fontSize: 14 } as const;
const fileLinkStyle = { color: 'var(--ocean-accent)', textDecoration: 'underline', textUnderlineOffset: 3 } as const;
const imageStyle = { ...pp.figureImage, aspectRatio: '16 / 9', objectFit: 'contain' } as const;

// Fresh Chromium 158 contexts at each viewport and DPR. File widths come from
// currentSrc after decoding and a successful image response. Preview widths are rounded.
const browserMeasurements = [
  { viewport: 360, previewWidth: 290, density: 1, fileWidth: 320 },
  { viewport: 360, previewWidth: 290, density: 2, fileWidth: 768 },
  { viewport: 360, previewWidth: 290, density: 3, fileWidth: 800 },
  { viewport: 390, previewWidth: 320, density: 1, fileWidth: 320 },
  { viewport: 390, previewWidth: 320, density: 2, fileWidth: 768 },
  { viewport: 640, previewWidth: 570, density: 1, fileWidth: 768 },
  { viewport: 768, previewWidth: 327, density: 1, fileWidth: 480 },
  { viewport: 768, previewWidth: 327, density: 2, fileWidth: 768 },
  { viewport: 1440, previewWidth: 408, density: 1, fileWidth: 480 },
  { viewport: 1440, previewWidth: 408, density: 2, fileWidth: 800 },
] as const;
const filePathsByWidth = new Map(variants.map(({ width, src }) => [width, src]));

function findLoadedVariant(image: HTMLImageElement) {
  if (!image.complete || !image.naturalWidth || !image.currentSrc) return undefined;
  const path = new URL(image.currentSrc).pathname;
  return variants.find(variant => variant.src === path);
}

export default function WebpExample({ onNavigate }: { onNavigate: AuroraNavigate }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [loadedVariant, setLoadedVariant] = useState<(typeof variants)[number]>();
  const previewImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A cached image can finish before React attaches its load handler.
    const image = previewImage.current;
    if (image) setLoadedVariant(findLoadedVariant(image));
  }, []);

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlSnippet);
      setCopyStatus('HTML copied.');
    } catch {
      setCopyStatus('Select the HTML below and copy it manually.');
    }
  };

  return (
    <AuroraPage theme="ocean" layout="article" active="projects" onNavigate={onNavigate} sectionLabel="Webp Me Daddy example" eyebrow="WORKED EXAMPLE · IMAGE OPTIMIZATION" title={title} lede={description}>
      <article style={pp.section}>
        <h2 style={pp.sectionTitle}>Original and optimized</h2>
        <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 20 }}>
          Webp Me Daddy exported four widths from one Shadewater Labs homepage screenshot. Compare the original JPEG with the WebP your browser chooses below.
        </p>
        <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 20 }}>
          In the preview below, <code>srcset</code> lists those four WebP files and their pixel widths. <code>sizes</code> tells the browser how wide the image will appear in the layout. The browser uses that width and the screen’s pixel density to choose a file.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: 'var(--ad-grid-gap)' }}>
          <figure style={{ ...pp.projectCard, padding: 14 }}>
            <img src={source.src} alt={source.alt} width={source.width} height={source.height} loading="lazy" decoding="async" style={imageStyle} />
            <figcaption style={{ ...pp.projectBlurb, marginTop: 12 }}>Original JPEG · {source.width} × {source.height} · {formatSize(source.bytes)}</figcaption>
          </figure>
          <figure style={{ ...pp.projectCard, padding: 14 }}>
            <img
              {...preview}
              ref={previewImage}
              srcSet={srcSet}
              sizes="auto, (max-width: 717px) calc(100vw - 70px), (max-width: 768px) calc(50vw - 59px), (max-width: 960px) calc(50vw - 71px), 409px"
              loading="lazy"
              decoding="async"
              onLoad={(event) => setLoadedVariant(findLoadedVariant(event.currentTarget))}
              style={imageStyle}
            />
            <figcaption style={{ ...pp.projectBlurb, marginTop: 12 }}>
              {loadedVariant
                ? <>WebP loaded · {loadedVariant.width} × {loadedVariant.height} · {formatSize(loadedVariant.bytes)}</>
                : 'Responsive WebP · browser-selected width'}
            </figcaption>
          </figure>
        </div>
        <section aria-labelledby="webp-example-files" style={{ marginTop: 32 }}>
          <h2 id="webp-example-files" style={pp.sectionTitle}>The exported files</h2>
          <table aria-labelledby="webp-example-files" style={tableStyle}>
            <thead>
              <tr><th scope="col" style={cellStyle}>WebP dimensions</th><th scope="col" style={cellStyle}>File size</th><th scope="col" style={cellStyle}>Example use</th></tr>
            </thead>
            <tbody>
              {variants.map(({ src, width, height, bytes, use }) => (
                <tr key={width}>
                  <th scope="row" style={cellStyle}><a href={src} style={fileLinkStyle}>{width} × {height}</a></th>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>{formatSize(bytes)}</td>
                  <td style={cellStyle}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: TG_MUTED, fontSize: 14, marginTop: 12 }}>These are the sizes from this run. The best file for a visitor depends on the display width and pixel density.</p>
        </section>
        <section aria-labelledby="webp-example-browser-selection" style={{ marginTop: 32 }}>
          <h2 id="webp-example-browser-selection" style={pp.sectionTitle}>Which WebP did the browser load?</h2>
          <p id="webp-example-browser-method" style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 12 }}>
            We loaded the on-page preview in a fresh Chromium 158 session for each viewport width and device pixel ratio (DPR), then checked the image URL the browser actually loaded. Viewport and preview widths are in CSS pixels.
          </p>
          <table aria-labelledby="webp-example-browser-selection" aria-describedby="webp-example-browser-method" style={tableStyle}>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>Viewport</th>
                <th scope="col" style={cellStyle}>Preview</th>
                <th scope="col" style={cellStyle}>DPR</th>
                <th scope="col" style={cellStyle}>WebP loaded</th>
              </tr>
            </thead>
            <tbody>
              {browserMeasurements.map(({ viewport, previewWidth, density, fileWidth }) => (
                <tr key={`${viewport}-${density}`}>
                  <th scope="row" style={cellStyle}>{viewport} px</th>
                  <td style={cellStyle}>{previewWidth} px</td>
                  <td style={cellStyle}>{density}×</td>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}><a href={filePathsByWidth.get(fileWidth)} style={fileLinkStyle}>{fileWidth}w WebP</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: TG_MUTED, fontSize: 14, marginTop: 12 }}>
            At 640 px the preview fills one column. At 768 px the two images sit side by side, so the preview gets narrower and Chromium loads a smaller file at 1×. Your browser may choose differently or reuse a cached file. Check the <strong>WebP loaded</strong> caption above for your result.
          </p>
        </section>
        <section aria-labelledby="webp-example-html" style={{ marginTop: 32 }}>
          <h2 id="webp-example-html" style={pp.sectionTitle}>Use responsive WebP images with <code>srcset</code> and <code>sizes</code></h2>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>
            This example uses a card up to 400 pixels wide, with 20 pixels of space on each side on narrow screens. If you host the files yourself, replace the image URLs and adjust <code>sizes</code> to match your layout.
          </p>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>
            At a 360 px viewport, the copied snippet gives the image 320 CSS pixels of space. At 2× pixel density, that calls for about 640 image pixels. The on-page preview uses its own layout, so use the measurements above for that preview.
          </p>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>
            The ZIP includes the original JPEG, all four WebPs, and a standalone demo. Unzip it and open <code>index.html</code> to try the example offline.
          </p>
          <style>{'[data-prerender-route] .webp-copy-html { display: none; }'}</style>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 14px', marginTop: 16 }}>
            <a href="/webp-example/webp-me-daddy-example.zip" download style={ad.btnGhost}>Download example files <span aria-hidden="true">↓</span></a>
            <button type="button" className="webp-copy-html" onClick={() => void copyHtml()} style={ad.btnGhost}>Copy HTML</button>
            <span role="status" style={{ color: TG_MUTED, fontSize: 14 }}>{copyStatus}</span>
          </div>
          <pre style={{ ...pp.projectCard, display: 'block', padding: 16, marginTop: 12, color: 'var(--ad-copy)', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}><code>{htmlSnippet}</code></pre>
        </section>
        <p style={{ ...pp.projectBlurb, marginTop: 24 }}>
          See how we used this page to <a href={buildPath('seo-audit-example')} className="underline underline-offset-4">test crawler access in the SEO audit</a>.
        </p>
        <a href={buildProjectHref('webp-me-daddy-skill')} style={{ ...ad.btnGhost, marginTop: 24 }}><span aria-hidden="true">←</span> Back to Webp Me Daddy</a>
      </article>
    </AuroraPage>
  );
}
