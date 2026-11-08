import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { brineSpaceAssetCase } from '@/content/currentProjects';
import { gameAssetPipelineUrl } from '@/content/openSource';
import { buildPath } from '@/lib/routes';

const stages = [
  {
    id: 'source',
    title: 'Source art',
    copy: 'The Desalination Unit needed a wall that read as water-treatment equipment at game scale. The source art uses blue-green pipes, gauges, and filter housings. Its center stays clear so the game can draw a doorway as a separate piece.',
    image: {
      src: '/brinespace-desalination-source.webp',
      alt: 'Water-treatment wall artwork with pipes and gauges flanking a plain center panel.',
      width: 1200,
      height: 402,
    },
    caption: 'The original wall artwork, before it was prepared for the game.',
  },
  {
    id: 'checks',
    title: 'Check the room in four rotations',
    copy: 'The review board shows the authored layouts with the intake facing north, east, south, and west. The room needs a clear route through each of its three doors in every rotation. The checks covered all 12 door approaches and verified that the intake side could not be used as an entrance.',
    image: {
      src: '/brinespace-desalination-rotations.webp',
      alt: 'Four layouts show the intake pointing north, east, south, and west, with three door openings in each.',
      width: 1600,
      height: 900,
    },
    caption: 'The development review board showing the four intake directions and door positions.',
  },
  {
    id: 'in-game',
    title: 'The finished room in-game',
    copy: 'The finished room connects to the station through its doors and draws seawater from the open ocean. If a neighboring room blocks the intake, the inspector shows it and water production stops.',
    image: brineSpaceAssetCase.image,
    caption: 'The Desalination Unit in the Windows 0.4.0 RC1 preview.',
  },
];

export default function BrineSpaceAssetCase({ onNavigate }: { onNavigate: AuroraNavigate }) {
  return (
    <AuroraPage
      active="projects"
      onNavigate={onNavigate}
      sectionLabel="BrineSpace asset case study"
      eyebrow="CASE STUDY · BRINESPACE"
      title={brineSpaceAssetCase.title}
      lede={brineSpaceAssetCase.description}
    >
      <article style={{ ...pp.section, maxWidth: 960 }}>
        {stages.map(({ id, title, copy, image, caption }) => (
          <section key={id} aria-labelledby={`asset-${id}`} style={{ marginBottom: 36 }}>
            <h2 id={`asset-${id}`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff' }}>{title}</h2>
            <p style={{ ...pp.projectBlurb, maxWidth: '65ch' }}>{copy}</p>
            <figure style={{ margin: '16px 0 0' }}>
              <img {...image} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12, background: '#0a1e29' }} />
              <figcaption style={{ color: TG_MUTED, fontSize: 14, marginTop: 8 }}>{caption}</figcaption>
            </figure>
            {id === 'checks' && <a href={image.src} style={{ ...pp.projectLink, marginTop: 8, textDecoration: 'underline' }}>Open the full rotation board</a>}
          </section>
        ))}
        <p style={{ ...pp.projectBlurb, maxWidth: '65ch', marginBottom: 16 }}>
          The open-source Shadewater Game Asset Pipeline shares the room-planning, source-tracking, and geometry-review practices behind work like this.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px', alignItems: 'center' }}>
          <a href={gameAssetPipelineUrl} style={ad.btnGhost}>View on GitHub <span aria-hidden="true">↗</span></a>
          <a href={buildPath('brinespace')} style={{ ...pp.projectLink, textDecoration: 'underline' }}>Back to BrineSpace</a>
        </div>
      </article>
    </AuroraPage>
  );
}
