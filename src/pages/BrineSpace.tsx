import { AuroraPage, MONO, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { brineSpace } from '@/content/currentProjects';
import { buildProjectHref } from '@/lib/routes';

const expedition = [
  {
    id: 'draft',
    title: 'Draft a room',
    alt: 'Three room cards below a small station built around its central core.',
    caption: 'Choose a room from your hand. Rotate it to line up the doors and decide whether you can afford to build it now.',
  },
  {
    id: 'station',
    title: 'Keep the station running',
    alt: 'An expanded underwater station with room details open and resource gauges along the top.',
    caption: 'Each room changes what the station makes and consumes. Watch power, oxygen, and water as you expand and recover crew.',
  },
  {
    id: 'archive',
    title: 'Archive the expedition',
    alt: 'The Expedition Archived report showing Archived Data rewards and a link to upgrades.',
    caption: 'The expedition report shows what you earned. Spend Archived Data on upgrades and unlocks before taking another hand into the depths.',
  },
] as const;

export default function BrineSpace({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <AuroraPage
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="BrineSpace"
      eyebrow="CARD-DRIVEN COLONY BUILDER"
      title="BrineSpace"
      lede="You’re BRINE, a damaged AI core on an underwater station. Draft room cards, connect the station one module at a time, and keep the colony alive."
    >
      <article style={{ ...pp.section, maxWidth: 960 }}>
        <section aria-labelledby="brinespace-download-heading" style={{ marginBottom: 40 }}>
          <h2 id="brinespace-download-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff' }}>
            Play the preview
          </h2>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 16 }}>{brineSpace.detail}</p>
          <a href={brineSpace.url} data-project-click="play-brinespace" style={ad.btnPrimary}>
            Download on itch.io <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section aria-labelledby="expedition-heading">
          <h2 id="expedition-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff' }}>
            How an expedition works
          </h2>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>Three moments from the Windows 0.4.0 RC1 preview.</p>
          {expedition.map(({ id, title, alt, caption }, index) => (
            <figure key={id} style={{ margin: '24px 0 36px' }}>
              <img
                src={`/brinespace-expedition-${id}.webp`}
                srcSet={`/brinespace-expedition-${id}-640w.webp 640w, /brinespace-expedition-${id}.webp 1200w`}
                sizes="auto, (max-width: 768px) calc(100vw - 40px), (max-width: 960px) calc(100vw - 64px), 896px"
                width={1200}
                height={675}
                alt={alt}
                loading="lazy"
                decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12 }}
              />
              <figcaption style={{ marginTop: 10 }}>
                <span aria-hidden="true" style={{ fontFamily: MONO, color: TG_MUTED, marginRight: 8 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong style={{ color: '#fff' }}>{title}</strong>
                <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>{caption}</p>
              </figcaption>
            </figure>
          ))}
        </section>

        <section aria-labelledby="brinespace-pipeline-heading" style={{ marginBottom: 24 }}>
          <h2 id="brinespace-pipeline-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff' }}>
            Tools built along the way
          </h2>
          <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 16 }}>
            The Shadewater Game Asset Pipeline grew out of making BrineSpace’s rooms and characters. It packages the tools for planning, slicing, and checking 2D game art.
          </p>
          <a href={buildProjectHref('game-asset-pipeline')} style={ad.btnGhost}>
            View the open-source asset pipeline <span aria-hidden="true">→</span>
          </a>
        </section>
        <a href={buildProjectHref(brineSpace.id)} style={{ color: TG_MUTED, textUnderlineOffset: 3 }}>
          <span aria-hidden="true">← </span>Back to Projects
        </a>
      </article>
    </AuroraPage>
  );
}
