import { projectStatuses } from '@/content/projects';
import ProductPage from '@/components/aurora/ProductPage';
import type { ProductPageData } from '@/components/aurora/ProductPage';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface WebpMeDaddyProps {
  onNavigate: AuroraNavigate;
}

const ACCENT = '184 85% 58%';

export default function WebpMeDaddy({ onNavigate }: WebpMeDaddyProps) {
  const project = projectStatuses['webp-me-daddy'];
  const heroLogo = project.hero.logo;

  const data: ProductPageData = {
    sectionLabel: 'Webp Me Daddy',
    accent: ACCENT,
    badge: 'FEATURED · CLI PIPELINE',
    eyebrow: '§ 01 · LABS PROJECT',
    name: project.name,
    lede:
      'A CLI-first, layout-aware image pipeline for front-end teams, agencies, and technical creators. It turns messy website images into production-ready WebP assets — with semantic recipes, strict metadata, snippets, proof sheets, and audit-driven fix plans.',
    logo: heroLogo
      ? { src: heroLogo.src, srcSet: heroLogo.srcSet, style: { maxWidth: 300, maxHeight: 220 } }
      : { src: '/webp-me-daddy-logo-lockup.webp', style: { maxWidth: 300, maxHeight: 220 } },
    meta: ['build · v0.9.4', 'recipes · 14', 'last_run · 6h', 'sites_audited · 9'],
    cta: {
      primary: 'See the workflow',
      secondary: 'Open explainer PDF',
      secondaryHref: '/webp-me-daddy-explainer.pdf',
    },
    metrics: [
      { k: 'BYTES_SAVED', v: '64%', sub: 'avg compression' },
      { k: 'RECIPES', v: '14', sub: 'placement-aware' },
      { k: 'LINT_RULES', v: '37', sub: 'meta + a11y checks' },
      { k: 'AUTOFIX_SAFE', v: '92%', sub: 'audit-to-fix coverage' },
    ],
    stage: {
      progress: 88,
      headline: 'Refining the operator loop and product surface.',
      summary:
        'The CLI-first core is strong and already production-capable. The remaining work is productization: multi-format planning (AVIF), richer orchestration, and turning the workflow into an easier public-facing experience.',
    },
    purpose: {
      section: {
        title: 'Why it exists',
        description:
          'Most teams do not have an image pipeline. They have a stack of manual fixes, inconsistent file names, weak alt text, forgotten width/height attributes, and zero proofing. Webp Me Daddy turns that chaos into a repeatable front-end workflow.',
      },
      items: [
        { id: 'semantic-recipes', title: 'Semantic Recipes', description: 'Prepare heroes, review art, blog covers, avatars, logo lockups, and cards with placement-aware defaults instead of one-off aspect ratio guesses.' },
        { id: 'metadata-with-teeth', title: 'Metadata With Teeth', description: 'Generate strict alt, title, and caption metadata with accessibility modes, usage overrides, and lint rules that catch sloppy image habits before they ship.' },
        { id: 'proof-audit-cleanup', title: 'Proof, Audit, Cleanup', description: 'Run a real operator loop with audit reports, dry-runs, proof sheets, fix plans, safe autofix, and cleanup passes instead of patching image issues one page at a time.' },
      ],
    },
    workflow: {
      eyebrow: 'Audit → Dry-Run → Proof → Fix',
      title: 'The core workflow',
      steps: [
        { id: 'audit', label: '01', title: 'Audit the project', description: 'Scan a codebase for legacy formats, missing markup attributes, shared assets, unused files, and animated assets that need a separate workflow.' },
        { id: 'dryrun', label: '02', title: 'Dry-run the prep', description: 'Preview recipes, framing, output dimensions, lint status, and action hints before a single file is written.' },
        { id: 'proof', label: '03', title: 'Proof the visuals', description: 'Review crops and transparency on dark, light, and checker surfaces so composition problems do not hide behind metadata.' },
        { id: 'ship', label: '04', title: 'Fix and ship', description: 'Use fix plans, snippets, cleanup reports, and safe autofix paths to move from issue detection to production-ready assets.' },
      ],
    },
    showcase: [
      { id: 'review-proof', label: 'SURFACE PROOF', title: 'Review-hero proof sheet', description: 'A real proof render shown on dark and light surfaces so composition and contrast issues are visible before shipping.', tag: 'webp-me-daddy/proof-review-hero.webp', command: 'wmd proof public/bugonia-review-hero.webp' },
      { id: 'logo-proof', label: 'TRANSPARENCY QA', title: 'Logo lockup surface check', description: 'Transparent assets get reviewed on dark, light, and checker backgrounds so matte halos and edge issues do not slip through.', tag: 'webp-me-daddy/proof-logo-lockup.webp', command: 'wmd proof public/brin-margot-logo-lockup.webp' },
      { id: 'batch-board', label: 'BATCH REVIEW', title: 'Batch contact sheet', description: 'A dry-run proof board that shows multiple assets together with status, issue hints, and visual QA context for faster approvals.', tag: 'webp-me-daddy/proof-batch-contact.webp', command: 'wmd batch ./assets --recipe review-hero --dry-run --proof', featured: true },
    ],
    comparison: {
      section: {
        title: "Why it's different",
        description:
          'Not trying to become another generic optimizer dashboard. The point is to give technical teams a production image workflow they can actually trust.',
      },
      items: [
        { id: 'tiny', title: 'Not just a compressor', description: 'TinyPNG-style tools shrink bytes. Webp Me Daddy also handles recipes, framing, metadata, snippets, proofing, audits, and cleanup.' },
        { id: 'cdn', title: 'Not trying to be your CDN', description: 'Cloudinary and ImageKit are delivery platforms. Webp Me Daddy is the production prep and QA workflow that happens before or alongside hosting.' },
        { id: 'manual', title: 'Replaces manual chaos', description: 'The real day-to-day competitor is inconsistent filenames, random crops, missing dimensions, weak alt text, and no audit trail.' },
      ],
    },
    limitations: {
      section: {
        title: 'Current limits',
        description:
          'The point of this page is not to pretend the project is finished. The core is strong, but there are still clear next steps before this becomes a broader product.',
      },
      items: [
        { id: 'webp', title: 'Still WebP-first', description: 'The current production path is intentionally centered on WebP. AVIF and multi-format delivery are planned, but they are not part of the shipped core yet.' },
        { id: 'apply', title: 'Apply is only partly automated', description: 'Audit can emit fix plans and safe autofix paths, but there is not yet a full orchestrated apply-fix-plan workflow that chains every approved step together.' },
        { id: 'ui', title: 'No public web operator UI yet', description: 'The workflow is strong in CLI form, and the manifest is ready to support a web app later, but the current product surface is still aimed at technical operators.' },
      ],
    },
    finalCta: {
      title: 'Want to follow the project?',
      body:
        'Webp Me Daddy is already a real Shadewater Labs project, and it is still actively evolving. The explainer is the deepest read; the sponsor deck is the fastest read.',
    },
  };

  data.cta.primaryHref = '/webp-me-daddy-explainer.pdf';

  return <ProductPage data={data} onNavigate={onNavigate} />;
}
