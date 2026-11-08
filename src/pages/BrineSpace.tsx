import { useEffect } from 'react';
import { ADFooter, ADNav, ADTicker, ad, type AuroraNavigate } from '@/components/aurora/chrome';
import { brineSpace } from '@/content/currentProjects';
import { buildProjectHref, PAGE_HEADING_ID } from '@/lib/routes';

const expedition = [
  {
    id: 'draft',
    title: 'Draft a room',
    alt: 'Three room cards below a small station built around its central core.',
    caption: 'Every hand gives you a different set of blueprints. Compare the cost and what each room produces, then rotate your choice to match an open doorway. A room you can afford now may be more useful than the one you were waiting for.',
  },
  {
    id: 'station',
    title: 'Keep the station running',
    alt: 'An expanded underwater station with room details open and resource gauges along the top.',
    caption: 'Expansion changes the balance of power, oxygen, water, and food. Recover crew, put drones to work, and look for rooms that support each other. The Desalination Unit, for example, gives you another way to make water if you can supply the power.',
  },
  {
    id: 'archive',
    title: 'Archive the expedition',
    alt: 'The Expedition Archived report showing Archived Data rewards and a link to upgrades.',
    caption: 'End an expedition to see what you earned. Archived Data carries forward, so you can unlock blueprints, crew, and companions before you draw your next hand.',
  },
] as const;

export default function BrineSpace({ onNavigate }: { onNavigate: AuroraNavigate }) {
  useEffect(() => {
    if (window.location.hash !== '#expedition-heading') return;
    const heading = document.getElementById('expedition-heading');
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView();
  }, []);

  return (
    <div style={ad.root} className="brine-page">
      <ADTicker />
      <ADNav active="projects" onNavigate={onNavigate} />
      <header className="brine-hero">
        <div className="brine-wrap">
          <a className="brine-back" href={buildProjectHref(brineSpace.id)}>
            <span aria-hidden="true">← </span>Back to Projects
          </a>
          <div className="brine-hero-grid">
            <div>
              <p className="brine-kicker">Card-driven colony builder</p>
              <h1 id={PAGE_HEADING_ID} tabIndex={-1}>BrineSpace</h1>
              <p className="brine-intro">You’re BRINE, a damaged AI core on an underwater station. Draft room cards, connect the station one module at a time, and keep the colony alive.</p>
              <div className="brine-actions">
                <a href={brineSpace.url} data-project-click="play-brinespace" style={ad.btnPrimary}>
                  Download on itch.io <span aria-hidden="true">↗</span>
                </a>
                <a href="#expedition-heading" className="brine-text-link">See how it plays <span aria-hidden="true">↓</span></a>
              </div>
              <p className="brine-build-note">{brineSpace.previewVersion} preview · Free to download</p>
            </div>
            <figure className="brine-hero-art">
              <img
                src={brineSpace.image.src}
                srcSet={brineSpace.image.srcSet}
                sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1180px) 52vw, 600px"
                width={800}
                height={400}
                alt={brineSpace.image.alt}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption><span>Station view</span><span>Windows 0.4.0 RC1</span></figcaption>
            </figure>
          </div>
          <dl className="brine-platforms" aria-label="Preview availability">
            <div><dt>Windows</dt><dd>Signed preview available</dd></div>
            <div><dt>Mac</dt><dd>Signed and notarized preview available</dd></div>
            <div><dt>iPad</dt><dd>In testing · no public build yet</dd></div>
          </dl>
        </div>
      </header>

      <article className="brine-wrap brine-content">
        <section aria-labelledby="expedition-heading">
          <p className="brine-kicker">The gameplay loop</p>
          <h2 id="expedition-heading" tabIndex={-1}>How an expedition works</h2>
          <p className="brine-section-intro">Three moments from the Windows 0.4.0 RC1 preview, from your first room choice to the upgrades you take into the next run.</p>
          <div className="brine-expedition">
            {expedition.map(({ id, title, alt, caption }, index) => (
              <figure className="brine-step" key={id}>
                <img
                  src={`/brinespace-expedition-${id}.webp`}
                  srcSet={`/brinespace-expedition-${id}-640w.webp 640w, /brinespace-expedition-${id}.webp 1200w`}
                  sizes="auto, (max-width: 768px) calc(100vw - 40px), 65vw"
                  width={1200}
                  height={675}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span className="brine-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="brine-notes">
          <section aria-labelledby="brinespace-start-heading">
            <p className="brine-kicker">First run</p>
            <h2 id="brinespace-start-heading">Start a new loop</h2>
            <ol>
              <li>Open the <strong>Tutorial Guide</strong> in Settings for illustrated help.</li>
              <li>Choose <strong>New Loop</strong> and check the cost and door positions before placing your first room.</li>
              <li>Use <strong>Save &amp; Quit</strong> to resume later with <strong>Continue Loop</strong>. Choose <strong>End Expedition</strong> when you’re ready to see your rewards.</li>
            </ol>
          </section>
          <section aria-labelledby="brinespace-pipeline-heading">
            <p className="brine-kicker">From the lab</p>
            <h2 id="brinespace-pipeline-heading">Tools built along the way</h2>
            <p>The Shadewater Game Asset Pipeline grew out of making BrineSpace’s rooms and characters. It packages reusable tools for planning 2D assets, slicing animation strips, and checking room geometry.</p>
            <a href={buildProjectHref('game-asset-pipeline')} className="brine-text-link">
              View the open-source asset pipeline <span aria-hidden="true">→</span>
            </a>
          </section>
        </div>
      </article>
      <ADFooter />
    </div>
  );
}
