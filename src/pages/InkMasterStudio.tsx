import { projectStatuses } from '@/content/projects';
import ProductPage from '@/components/aurora/ProductPage';
import type { ProductPageData } from '@/components/aurora/ProductPage';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface InkMasterStudioProps {
  onNavigate: AuroraNavigate;
}

const ACCENT = '219 85% 65%';

export default function InkMasterStudio({ onNavigate }: InkMasterStudioProps) {
  const project = projectStatuses['inkmaster-studio'];
  const heroLogo = project.hero.logo;

  const data: ProductPageData = {
    sectionLabel: 'InkMaster Studio',
    accent: ACCENT,
    badge: 'BETA · BROWSER PRODUCT',
    eyebrow: '§ 01 · LABS PROJECT',
    name: project.name,
    lede:
      'A browser-based print-prep workflow for apparel graphics. It helps creators turn rough source art into DTG-ready assets with knockout processing, texture controls, underbase generation, mockup previews, and export tooling built around real garment production needs.',
    logo: heroLogo
      ? { src: heroLogo.src, srcSet: heroLogo.srcSet, style: { maxWidth: 240, maxHeight: 200 } }
      : { src: '/inkmaster-studio-site-logo.webp', style: { maxWidth: 240, maxHeight: 200 } },
    meta: ['build · v0.8 beta', 'master · 4200×5100', 'last_run · 12h', 'inkmasterstudio.com'],
    cta: {
      primary: 'Visit live site',
      primaryHref: 'https://inkmasterstudio.com',
      secondary: 'Open explainer PDF',
      secondaryHref: '/inkmaster-studio-explainer.pdf',
    },
    metrics: [
      { k: 'PRINT_MASTER', v: '4200×5100', sub: 'baseline canvas' },
      { k: 'KNOCKOUT_MODES', v: '06', sub: 'garment-aware cleanup' },
      { k: 'EXPORT_FORMATS', v: '04', sub: 'PNG · SVG · PDF · JPG' },
      { k: 'MOCKUP_GARMENTS', v: '12', sub: 'colors + placements' },
    ],
    stage: {
      progress: 76,
      headline: 'Polishing the beta and sharpening the product story.',
      summary:
        'The core browser workflow is real and already useful: upload art, prep it for DTG, preview it on garments, export production assets. Remaining work is product polish, broader SKU coverage, and deciding how far the AI-assisted path goes in a production-safe version.',
    },
    purpose: {
      section: {
        title: 'Why it exists',
        description:
          'Most apparel graphics are not born print-ready. They need cleanup, resizing, texture preservation, mockups, and export prep before they can be sold or printed. InkMaster compresses those repetitive last-mile steps into one focused browser workflow.',
      },
      items: [
        { id: 'print-first', title: 'Print-First Cleanup', description: 'Remove black or white backgrounds, preserve distress and transparency, and shape edges for garments instead of forcing generic image-editing tools to do specialized print work.' },
        { id: 'production-assets', title: 'Production Assets', description: 'Generate print masters, underbases, PDFs, SVGs, and mockup-ready outputs from the same session instead of bouncing between multiple tools.' },
        { id: 'merch-preview', title: 'Merch Preview Loop', description: 'Preview designs on multiple garment colors, compare placements, and produce sellable mockups without leaving the app.' },
      ],
    },
    workflow: {
      eyebrow: 'Upload → Prep → Preview → Export',
      title: 'The core workflow',
      steps: [
        { id: 'upload', label: '01', title: 'Upload and validate', description: 'Start with raw artwork, normalize it into a 4200×5100 print master, and immediately surface DPI feedback so weak source files get flagged early.' },
        { id: 'prep', label: '02', title: 'Prep the artwork', description: 'Choose the garment-prep mode, remove black or white backgrounds, refine thresholds, preserve texture, replace colors, and shape the final print feel.' },
        { id: 'preview', label: '03', title: 'Preview on real surfaces', description: 'Check the processed design on artboards and garment mockups, compare colors, test placement, and confirm the asset still reads off a neutral editor background.' },
        { id: 'export', label: '04', title: 'Export for production', description: 'Generate the print master, white underbase, PDF, and mockup boards in a single session with consistent naming and metadata.' },
      ],
    },
    showcase: [
      { id: 'live-surface', label: 'LIVE SURFACE', title: 'Public beta landing', description: 'The live web surface frames the product around batch processing, print-master sizing, knockout cleanup, and DTG-specific output instead of generic image editing.', tag: 'inkmasterstudio.com', command: 'open https://inkmasterstudio.com' },
      { id: 'print-master', label: 'GENERATED ASSET', title: '4200 × 5100 print master', description: 'A processed export centered around the standardized print-master canvas that the workflow uses as its production baseline.', tag: 'inkmaster/print-master.png', command: 'upload → prep → download print file', featured: true },
      { id: 'mockup-board', label: 'GENERATED ARTIFACT', title: 'Multi-color mockup board', description: 'The same processed design staged across multiple shirt colors to validate contrast, placement, and merchandising readiness before shipping final assets.', tag: 'inkmaster/mockup-board.png', command: 'process → mockup mode → export 4 colors' },
      { id: 'underbase', label: 'GENERATED ARTIFACT', title: 'Underbase generation', description: 'Turn processed art into a white underbase layer for dark-garment DTG printing while preserving silhouette and soft alpha information.', tag: 'inkmaster/underbase.png', command: 'process → generate underbase → export PNG' },
    ],
    comparison: {
      section: {
        title: "Why it's different",
        description:
          'InkMaster is strongest when treated as a specialized production tool for apparel graphics, not as a generic creative editor trying to do everything.',
      },
      items: [
        { id: 'photoshop', title: 'Not a general creative suite', description: 'The point is not to replace Photoshop. The point is to remove the repetitive merch-prep steps that most people end up doing inside Photoshop.' },
        { id: 'bg-removal', title: 'More than background removal', description: 'Background removal matters, but the real value is the whole loop: sizing, DPI checks, texture control, underbase, mockups, and export packaging.' },
        { id: 'mockup-toy', title: 'More than a mockup toy', description: 'Mockups are part of the workflow, but the real product sits earlier in the pipeline where artwork becomes print-ready in the first place.' },
      ],
    },
    limitations: {
      section: {
        title: 'Current limits',
        description:
          'The beta is already useful, but it is still honest about where the edges are: a narrower SKU surface, an inactive AI path, and room for more public polish.',
      },
      items: [
        { id: 'ai', title: 'AI path is present but not active', description: 'The Gemini integration exists in the codebase, but the public UI currently treats it as a disabled beta feature rather than a shipped workflow.' },
        { id: 'sku', title: 'Tee-first today', description: 'The product hints at hoodies, hats, mugs, and totes, but the current surface is still primarily optimized around the tee workflow.' },
        { id: 'polish', title: 'Still a beta experience', description: 'The core tools are stronger than the polish around them. Onboarding, clarity, and public messaging still need to catch up to feature depth.' },
      ],
    },
    finalCta: {
      title: 'Want to try the beta?',
      body:
        'The live site is open. Upload a piece of art, run it through the print-prep loop, and see the production assets come out the other side.',
    },
  };

  return <ProductPage data={data} onNavigate={onNavigate} />;
}
