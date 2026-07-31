export interface ProjectProgressPhase {
  id: string;
  label: string;
  progress: number;
  status: 'Planned' | 'In Progress' | 'Strong' | 'Near Complete';
  summary: string;
}

export interface ProjectAction {
  id: string;
  label: string;
  variant: 'hero' | 'hero-outline';
  type: 'page' | 'href' | 'scroll';
  target: string;
  newTab?: boolean;
}

export interface ProjectBrandImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export interface ProjectHero {
  eyebrow: string;
  title: string;
  description: string;
  tagline: string;
  actions: ProjectAction[];
  logo?: ProjectBrandImage;
}

export interface ProjectCardItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectContentSection {
  title: string;
  description: string;
  items: ProjectCardItem[];
}

export interface ProjectWorkflowStep {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface ProjectWorkflowSection {
  title: string;
  eyebrow: string;
  steps: ProjectWorkflowStep[];
}

export interface ProjectCtaSection {
  title: string;
  description: string;
  actions: ProjectAction[];
}

export interface ProjectShowcaseItem {
  id: string;
  label: string;
  title: string;
  description: string;
  command: string;
  outputSummary: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  featured?: boolean;
}

export interface ProjectMetric {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface ProjectAudienceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectComparisonItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectLimitationItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectStatus {
  slug: string;
  name: string;
  author: 'Brin' | 'Teegly' | 'Krusher' | 'Crafty';
  hero: ProjectHero;
  overallProgress: number;
  currentStage: string;
  lastUpdated: string;
  summary: string;
  phases: ProjectProgressPhase[];
  recentMilestones: string[];
  nextUp: string[];
  metrics?: ProjectMetric[];
  purpose: ProjectContentSection;
  audienceSection: Omit<ProjectContentSection, 'items'>;
  showcase: ProjectShowcaseItem[];
  audiences: ProjectAudienceItem[];
  comparisonSection: Omit<ProjectContentSection, 'items'>;
  comparisons: ProjectComparisonItem[];
  limitationsSection: Omit<ProjectContentSection, 'items'>;
  limitations: ProjectLimitationItem[];
  workflow: ProjectWorkflowSection;
  cta: ProjectCtaSection;
  explainerHref?: string;
}

export const projectStatuses: Record<string, ProjectStatus> = {
  'inkmaster-studio': {
    slug: 'inkmaster-studio',
    name: 'InkMaster Studio',
    author: 'Brin',
    hero: {
      eyebrow: 'Shadewater Labs Project',
      title: 'InkMaster Studio',
      description:
        'A browser-based print-prep workflow for apparel graphics. It helps creators turn rough source art into DTG-ready assets with knockout processing, texture controls, underbase generation, mockup previews, and export tooling built around actual garment production needs.',
      tagline: 'From rough artwork to print-ready merch assets in one focused workflow.',
      logo: {
        src: '/inkmaster-studio-site-logo.webp',
        srcSet:
          '/inkmaster-studio-site-logo-320w.webp 320w, /inkmaster-studio-site-logo-640w.webp 640w, /inkmaster-studio-site-logo.webp 1200w',
        sizes: '(min-width: 1024px) 16rem, (min-width: 640px) 13rem, 38vw',
        alt: '',
        width: 1200,
        height: 900,
        className: 'h-auto w-full max-w-[11rem] drop-shadow-[0_18px_42px_hsl(219_90%_58%/0.2)] sm:max-w-[12.5rem] md:max-w-[14rem]',
      },
      actions: [
        {
          id: 'inkmaster-open-explainer',
          label: 'Open Explainer PDF',
          variant: 'hero',
          type: 'href',
          target: '/inkmaster-studio-explainer.pdf',
          newTab: true,
        },
        {
          id: 'see-inkmaster-workflow',
          label: 'See The Workflow',
          variant: 'hero-outline',
          type: 'scroll',
          target: 'inkmaster-loop',
        },
        {
          id: 'inkmaster-live-site',
          label: 'Visit Live Site',
          variant: 'hero-outline',
          type: 'href',
          target: 'https://inkmasterstudio.com',
          newTab: true,
        },
        {
          id: 'inkmaster-back-to-labs',
          label: 'Back To Shadewater Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    overallProgress: 76,
    currentStage: 'Polishing the beta and sharpening the product story',
    lastUpdated: 'March 14, 2026',
    summary:
      'The core browser workflow is real and already useful: upload art, prep it for DTG, preview it on garments, and export production assets. The biggest work left is product polish, broader SKU coverage, and deciding how far the AI-assisted path should go in a production-safe version of the tool.',
    phases: [
      {
        id: 'print-core',
        label: 'Print-Prep Core',
        progress: 88,
        status: 'Strong',
        summary:
          'The main artwork pipeline is in place with print-master normalization, knockout modes, texture controls, DPI checks, and multi-format export.',
      },
      {
        id: 'mockups-exports',
        label: 'Mockups, Underbase & Export',
        progress: 84,
        status: 'Strong',
        summary:
          'Mockup previews, underbase generation, PDF export, and production-focused output paths make the app feel like a real merch workflow instead of a simple editor.',
      },
      {
        id: 'workflow-memory',
        label: 'Batching & Workflow Memory',
        progress: 71,
        status: 'In Progress',
        summary:
          'Batch processing, presets, snapshots, undo/redo, and export history are already useful, but the operator flow still has room to become smoother and more guided.',
      },
      {
        id: 'ai-and-expansion',
        label: 'AI Tools & Product Expansion',
        progress: 28,
        status: 'Planned',
        summary:
          'The Gemini-backed editing path exists in the codebase, but it is not active in the public UI today, and broader product types are still future-facing.',
      },
      {
        id: 'public-polish',
        label: 'Public Surface & Positioning',
        progress: 52,
        status: 'In Progress',
        summary:
          'The live site is up and the product page now exists, but the marketing, onboarding, and public-facing explanation still need tightening to match the strength of the underlying workflow.',
      },
    ],
    recentMilestones: [
      'Built a 4200 x 5100 print-master workflow with garment-specific knockout processing and DPI feedback.',
      'Shipped white underbase export, PDF output, vectorization controls, and texture-focused print finishing tools.',
      'Added mockup generation, batch processing, presets, checkpoints, and session-level export history.',
    ],
    nextUp: [
      'Decide how and when to ship the AI editing path as a trustworthy production feature instead of a beta curiosity.',
      'Expand the product beyond tees into hoodie, hat, mug, and tote workflows without diluting the core print-prep experience.',
      'Tighten the onboarding and public messaging so the product is easier to understand in a few seconds.',
    ],
    purpose: {
      title: 'Why It Exists',
      description:
        'Most apparel graphics are not born print-ready. They need cleanup, resizing, texture preservation, mockups, and export prep before they can actually be sold or printed. InkMaster exists to compress those repetitive last-mile steps into one focused browser workflow.',
      items: [
        {
          id: 'print-first-cleanup',
          title: 'Print-First Cleanup',
          description:
            'Remove black or white backgrounds, preserve distress and transparency, and shape edges for garments instead of forcing generic image-editing tools to do specialized print work.',
        },
        {
          id: 'production-assets',
          title: 'Production Assets',
          description:
            'Generate print masters, underbases, PDFs, SVGs, and mockup-ready outputs from the same session instead of bouncing between multiple tools.',
        },
        {
          id: 'merch-preview-loop',
          title: 'Merch Preview Loop',
          description:
            'Preview designs on multiple garment colors, compare placements, and produce sellable mockups without leaving the app.',
        },
      ],
    },
    audienceSection: {
      title: 'Who It\'s For',
      description:
        'InkMaster is best for creators and operators who already know they want to print something, but do not want to spend their time inside heavyweight design software for repetitive prep work.',
    },
    showcase: [
      {
        id: 'inkmaster-live-surface',
        label: 'Live Product Surface',
        title: 'Public Beta Landing Page',
        description:
          'The live web surface already frames the product around batch processing, print-master sizing, knockout cleanup, and DTG-specific output instead of generic image editing.',
        command: 'https://inkmasterstudio.com',
        outputSummary: 'The public beta positions InkMaster as a browser-based print-prep tool for apparel graphics.',
        src: '/inkmaster-live-landing.webp',
        alt: 'InkMaster Studio live landing page showing the upload surface, batch processing entry point, and DTG-focused feature cards.',
        width: 1672,
        height: 1203,
      },
      {
        id: 'inkmaster-print-master',
        label: 'Generated Asset',
        title: '4200 x 5100 Print Master',
        description:
          'A processed export centered around the standardized print-master canvas that the workflow uses as its production baseline.',
        command: 'Upload artwork -> choose prep mode -> refine edges and texture -> Download Print File',
        outputSummary: 'Transparent PNG master export sized for apparel production workflows.',
        src: '/inkmaster-showcase-print-master.webp',
        alt: 'InkMaster showcase board with a print-master export displayed on a checkerboard transparency surface and key export metadata.',
        width: 1680,
        height: 1080,
      },
      {
        id: 'inkmaster-mockup-board',
        label: 'Generated Artifact',
        title: 'Multi-Color Mockup Board',
        description:
          'The same processed design staged across multiple shirt colors to validate contrast, placement, and merchandising readiness before shipping final assets.',
        command: 'Process artwork -> open mockup mode -> adjust placement -> export multiple garment colors',
        outputSummary: 'A proof-style board showing how the same design reads across multiple garment surfaces.',
        src: '/inkmaster-showcase-mockup-board.webp',
        alt: 'InkMaster mockup board showing the same design placed on black, charcoal, and royal blue shirt mockups.',
        width: 1680,
        height: 1080,
        featured: true,
      },
      {
        id: 'inkmaster-underbase',
        label: 'Generated Artifact',
        title: 'Underbase Generation Preview',
        description:
          'InkMaster can turn processed art into a white underbase layer for dark-garment DTG printing while preserving silhouette and soft alpha information.',
        command: 'Process artwork for garment printing -> Generate Underbase -> export PNG / SVG / JPG',
        outputSummary: 'A side-by-side preview of source output and the generated white underbase.',
        src: '/inkmaster-showcase-underbase.webp',
        alt: 'InkMaster underbase preview showing the processed source output next to a white underbase version for dark-garment DTG printing.',
        width: 1680,
        height: 1180,
      },
    ],
    audiences: [
      {
        id: 'merch-creators',
        title: 'Merch Creators',
        description:
          'For independent creators who want to move faster from rough artwork to something they can actually list, print, and sell.',
      },
      {
        id: 'apparel-brands',
        title: 'Apparel Brands & Print Shops',
        description:
          'For small operators who need repeatable DTG prep, mockup output, and better consistency without maintaining a bloated studio workflow.',
      },
      {
        id: 'freelance-designers',
        title: 'Freelance Designers',
        description:
          'For designers who often inherit messy source files and need a faster route to production-ready graphics for client merch work.',
      },
    ],
    comparisonSection: {
      title: 'Why It\'s Different',
      description:
        'InkMaster is strongest when treated as a specialized production tool for apparel graphics, not as a generic creative editor trying to do everything.',
    },
    comparisons: [
      {
        id: 'not-photoshop',
        title: 'Not a general creative suite',
        description:
          'The point is not to replace Photoshop. The point is to remove the repetitive merch-prep steps that most people end up doing inside Photoshop.',
      },
      {
        id: 'not-just-bg-removal',
        title: 'More than background removal',
        description:
          'Background removal matters, but the real value is the whole loop: sizing, DPI checks, texture control, underbase generation, mockups, and export packaging.',
      },
      {
        id: 'not-just-mockups',
        title: 'More than a mockup toy',
        description:
          'Mockups are part of the workflow, but the real product sits earlier in the pipeline where artwork becomes print-ready in the first place.',
      },
    ],
    limitationsSection: {
      title: 'Current Limits',
      description:
        'The beta is already useful, but it is still honest about where the edges are: a narrower SKU surface, an inactive AI path, and room for more public polish.',
    },
    limitations: [
      {
        id: 'ai-disabled',
        title: 'AI path is present but not active',
        description:
          'The Gemini integration exists in the codebase, but the public UI currently treats it as a disabled beta feature rather than a shipped workflow.',
      },
      {
        id: 'sku-scope',
        title: 'Tee-first today',
        description:
          'The product hints at hoodies, hats, mugs, and totes, but the current surface is still primarily optimized around the tee workflow.',
      },
      {
        id: 'beta-polish',
        title: 'Still a beta experience',
        description:
          'The core tools are stronger than the polish around them. Onboarding, clarity, and public messaging still need to catch up to the underlying feature depth.',
      },
    ],
    workflow: {
      title: 'The Core Workflow',
      eyebrow: 'Upload -> Prep -> Preview -> Export',
      steps: [
        {
          id: 'upload-validate',
          label: '01',
          title: 'Upload And Validate',
          description:
            'Start with raw artwork, normalize it into a 4200 x 5100 print master, and immediately surface DPI feedback so weak source files get flagged early.',
        },
        {
          id: 'prep-artwork',
          label: '02',
          title: 'Prep The Artwork',
          description:
            'Choose the right garment-prep mode, remove black or white backgrounds, refine thresholds, preserve texture, replace colors, and shape the final print feel.',
        },
        {
          id: 'preview-merch',
          label: '03',
          title: 'Preview On Real Surfaces',
          description:
            'Check the processed design on artboards and garment mockups, compare colors, test placement, and confirm the asset still reads once it leaves a neutral editor background.',
        },
        {
          id: 'export-assets',
          label: '04',
          title: 'Export Production Assets',
          description:
            'Download the final print file, create PDFs and underbases, or batch out mockup sets so the same workflow supports both production and merchandising.',
        },
      ],
    },
    cta: {
      title: 'Want To Follow InkMaster?',
      description:
        'InkMaster Studio is already live as a public beta, and it is still actively maturing. If you want to see the product surface or head back through the broader Shadewater Labs catalog, here are the best next stops.',
      actions: [
        {
          id: 'view-inkmaster-explainer',
          label: 'View Explainer PDF',
          variant: 'hero',
          type: 'href',
          target: '/inkmaster-studio-explainer.pdf',
          newTab: true,
        },
        {
          id: 'visit-inkmaster-site',
          label: 'Visit Live Site',
          variant: 'hero-outline',
          type: 'href',
          target: 'https://inkmasterstudio.com',
          newTab: true,
        },
        {
          id: 'inkmaster-cta-back-to-labs',
          label: 'Back To Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    explainerHref: '/inkmaster-studio-explainer.pdf',
  },
};
