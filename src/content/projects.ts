import { shadewaterSeoSkillSnapshot } from '@/content/generated/shadewaterSeoSkillSnapshot';
import {
  SHADEWATER_LABS_MARK_HEIGHT,
  SHADEWATER_LABS_MARK_SIZES,
  SHADEWATER_LABS_MARK_SRC,
  SHADEWATER_LABS_MARK_SRCSET,
  SHADEWATER_LABS_MARK_WIDTH,
} from '@/lib/brandAssets';

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

const seoSkillSyncDate = new Intl.DateTimeFormat('en-CA', {
  dateStyle: 'long',
  timeZone: 'America/Vancouver',
}).format(new Date(shadewaterSeoSkillSnapshot.lastSyncedAt));

const seoSkillWorkflowSteps = shadewaterSeoSkillSnapshot.workflow.map((step) => ({
  id: step.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''),
  label: step.label,
  title: step.title,
  description: step.description,
}));

export const projectStatuses: Record<string, ProjectStatus> = {
  'shadewater-seo-report': {
    slug: 'shadewater-seo-report',
    name: 'Shadewater SEO Report',
    author: 'Brin',
    hero: {
      eyebrow: 'Shadewater Labs Project',
      title: 'Shadewater SEO Report',
      description: `A deterministic SEO operator for real websites, content archives, and repositories. The current build spans ${shadewaterSeoSkillSnapshot.stats.commandCount} command routes, ${shadewaterSeoSkillSnapshot.stats.subSkillCount} focused sub-skills, ${shadewaterSeoSkillSnapshot.stats.agentCount} specialist agents, and ${shadewaterSeoSkillSnapshot.stats.scriptCount} scripts, all tuned to turn raw evidence into branded reports and ship-ready fixes.`,
      tagline: 'Evidence first. Branded reports second. Better rankings after the rerun.',
      logo: {
        src: SHADEWATER_LABS_MARK_SRC,
        srcSet: SHADEWATER_LABS_MARK_SRCSET,
        sizes: SHADEWATER_LABS_MARK_SIZES,
        alt: '',
        width: SHADEWATER_LABS_MARK_WIDTH,
        height: SHADEWATER_LABS_MARK_HEIGHT,
        className: 'h-auto w-full max-w-[10.5rem] drop-shadow-[0_20px_50px_hsl(192_70%_60%/0.18)] sm:max-w-[11.5rem] md:max-w-[12.75rem]',
      },
      actions: [
        {
          id: 'read-seo-explainer',
          label: 'Open Explainer PDF',
          variant: 'hero',
          type: 'href',
          target: '/shadewater-seo-report-explainer.pdf',
          newTab: true,
        },
        {
          id: 'see-seo-workflow',
          label: 'See The Operator Loop',
          variant: 'hero-outline',
          type: 'scroll',
          target: 'webp-loop',
        },
        {
          id: 'seo-back-to-labs',
          label: 'Back To Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    overallProgress: 91,
    currentStage: 'Shipping the public explainer surface around a proven audit engine',
    lastUpdated: seoSkillSyncDate,
    summary:
      'The audit engine is already proven on the live Brin Shadewater site. The current work is about productization: keeping the documentation in sync with the real skill, tightening repo-aware fix loops, and making the reporting surface easier to trust, share, and rerun.',
    phases: [
      {
        id: 'audit-engine',
        label: 'Audit Engine & Evidence Layer',
        progress: 97,
        status: 'Near Complete',
        summary:
          'The core audit path is already mature: LLM-first analysis backed by deterministic checks for metadata, links, schema, security, llms.txt, and Core Web Vitals.',
      },
      {
        id: 'reporting-surface',
        label: 'Branded Reporting & Fix Artifacts',
        progress: 95,
        status: 'Near Complete',
        summary:
          'The HTML report, markdown outputs, PDF-friendly styling, and image remediation handoffs are already usable on real audits and stakeholder review loops.',
      },
      {
        id: 'public-surface',
        label: 'Explainer, Labs Page & Status Surface',
        progress: 84,
        status: 'Strong',
        summary:
          'The public-facing story is now catching up to the operator tooling, with a themed explainer, a Labs project page, and a progress tracker tied to the live skill snapshot.',
      },
      {
        id: 'repo-local-mode',
        label: 'Repo-Local Patch Mode',
        progress: 44,
        status: 'In Progress',
        summary:
          'The next meaningful layer is repo-aware auditing that inspects src and public directly and proposes patch-ready fixes, not just URL-level findings.',
      },
      {
        id: 'hosted-product',
        label: 'Hosted Product & Automation Layer',
        progress: 18,
        status: 'Planned',
        summary:
          'A future surface could wrap the current operator flow in a hosted UI, richer historical tracking, and more automatic evidence capture.',
      },
    ],
    recentMilestones: [
      'Hardened the skill against prompt injection, unsafe crawl targets, and broken-link false positives from blocked external profiles.',
      'Shipped the Shadewater-branded report theme, PDF export polish, and automated markdown artifact generation.',
      'Dogfooded the skill on brinshadewater.com and pushed the live score from 64 to 93 through real fix-and-rerun cycles.',
      'Connected image findings to Webp Me Daddy with a deterministic handoff contract for downstream asset work.',
    ],
    nextUp: [
      'Add repo-local auditing that inspects src and public directly and outputs implementation-ready fixes.',
      'Generate richer visual evidence automatically so future explainers and reports can show more first-party screenshots.',
      'Keep folding real site audits back into the skill so scoring, caveats, and heuristics improve through dogfooding rather than theory.',
    ],
    metrics: [
      {
        id: 'seo-command-count',
        label: 'Command Routes',
        value: String(shadewaterSeoSkillSnapshot.stats.commandCount),
        description: 'Top-level operator commands exposed by the current skill snapshot.',
      },
      {
        id: 'seo-subskill-count',
        label: 'Sub-skills',
        value: String(shadewaterSeoSkillSnapshot.stats.subSkillCount),
        description: 'Focused workflows for audits, schema, GEO, hreflang, articles, GitHub SEO, and more.',
      },
      {
        id: 'seo-agent-count',
        label: 'Specialist Agents',
        value: String(shadewaterSeoSkillSnapshot.stats.agentCount),
        description: 'Role-based deep dives for technical SEO, performance, schema, sitemap, verification, and visual analysis.',
      },
      {
        id: 'seo-script-count',
        label: 'Deterministic Scripts',
        value: String(shadewaterSeoSkillSnapshot.stats.scriptCount),
        description: 'Verification and evidence helpers that keep the audit grounded in actual checks instead of pure vibes.',
      },
    ],
    purpose: {
      title: 'Why It Exists',
      description:
        'The goal is not to become another generic SEO checklist. Shadewater SEO Report exists to turn real site evidence into outputs a creator, operator, or client can actually use, trust, and rerun after fixes land.',
      items: [
        {
          id: 'deterministic-evidence',
          title: 'Deterministic Evidence',
          description:
            'Use live fetches and focused scripts to prove what is actually happening on the site before the LLM starts recommending changes.',
        },
        {
          id: 'report-ready-output',
          title: 'Report-Ready Output',
          description:
            'Package the findings as a branded HTML dashboard, a full markdown report, and a prioritized action plan that feels ready for review instead of stuck in a scratchpad.',
        },
        {
          id: 'closed-loop-remediation',
          title: 'Closed-Loop Remediation',
          description:
            'Treat the audit as one pass in a loop: find issues, ship fixes, rerun the report, and keep score deltas visible instead of hoping the site improved.',
        },
      ],
    },
    audienceSection: {
      title: 'Who It Is For',
      description:
        'This is built for people who want more than “your meta description is too long.” It is for operators who want evidence, judgment, and outputs that support real implementation work.',
    },
    showcase: [],
    audiences: [
      {
        id: 'internal-ops',
        title: 'Shadewater Labs Internal Ops',
        description:
          'For tightening real properties like brinshadewater.com, documenting the fix history, and turning SEO work into a repeatable production loop instead of a sporadic cleanup sprint.',
      },
      {
        id: 'creators-and-founders',
        title: 'Creators & Founder-Led Sites',
        description:
          'For people shipping personal brands, content archives, and landing pages who need better than enterprise dashboards and vague SEO advice.',
      },
      {
        id: 'developers-and-agencies',
        title: 'Developers & Agencies',
        description:
          'For technical teams who want deterministic evidence, markdown artifacts, and safe guardrails they can build into a real website workflow.',
      },
    ],
    comparisonSection: {
      title: 'Why It Is Different',
      description:
        'The skill sits in a more useful middle ground: smarter than a basic extension, more explainable than a black-box suite, and more grounded than a one-shot AI critique.',
    },
    comparisons: [
      {
        id: 'not-a-browser-extension',
        title: 'Not just a browser extension',
        description:
          'Extensions can highlight obvious issues, but they rarely produce multi-artifact reports, environment caveats, or rerunnable fix loops that survive a production workflow.',
      },
      {
        id: 'not-a-black-box-suite',
        title: 'Not a black-box enterprise suite',
        description:
          'The commands, scripts, and output artifacts are visible and inspectable. The operator can see why a score exists and which evidence produced it.',
      },
      {
        id: 'not-a-one-shot-ai-pass',
        title: 'Not just an AI opinion dump',
        description:
          'The LLM drives the reasoning, but deterministic checks and guardrails keep the result anchored to public evidence instead of prompt theater.',
      },
    ],
    limitationsSection: {
      title: 'What Still Needs Care',
      description:
        'The skill is strong, but there are still real-world edges where operator judgment matters and future product work would make the experience cleaner.',
    },
    limitations: [
      {
        id: 'preview-limitations',
        title: 'Protected previews distort results',
        description:
          'Preview hosts that return 401 on robots.txt, llms.txt, or secondary fetches can look broken even when production is fine, so final scoring still prefers public live URLs.',
      },
      {
        id: 'spa-shell-caveats',
        title: 'SPAs still need a crawlable shell',
        description:
          'Client-rendered sites can fool static fetches unless the raw HTML carries a real H1, useful copy, internal links, canonical tags, and JSON-LD.',
      },
      {
        id: 'external-identity-factors',
        title: 'Some signals live outside the site',
        description:
          'Entity scores, profile verification, and certain performance or ecosystem signals still depend on third-party identity assets and public web conditions, not just site code.',
      },
    ],
    workflow: {
      title: 'How The Skill Works',
      eyebrow: 'LLM reasoning with deterministic evidence and branded outputs',
      steps: seoSkillWorkflowSteps,
    },
    cta: {
      title: 'Want The Full Breakdown?',
      description:
        'The new explainer stays synced with the underlying skill, and this Labs page tracks the product surface around it. If you want the deeper narrative or the rest of the Labs catalog, those are the best next stops.',
      actions: [
        {
          id: 'seo-view-explainer',
          label: 'Open Explainer PDF',
          variant: 'hero',
          type: 'href',
          target: '/shadewater-seo-report-explainer.pdf',
          newTab: true,
        },
        {
          id: 'seo-cta-back-to-labs',
          label: 'Back To Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    explainerHref: '/shadewater-seo-report-explainer.pdf',
  },
  'webp-me-daddy': {
    slug: 'webp-me-daddy',
    name: 'Webp Me Daddy',
    author: 'Brin',
    hero: {
      eyebrow: 'Shadewater Labs Project',
      title: 'Webp Me Daddy',
      description:
        'A CLI-first, layout-aware image pipeline for front-end teams, agencies, and technical creators who want more than compression. It turns messy website images into production-ready assets with semantic recipes, strict SEO and accessibility metadata, snippets, proof sheets, audits, and cleanup workflows.',
      tagline: 'Shave bytes. Keep vibes. Give website images a real production loop.',
      logo: {
        src: '/webp-me-daddy-logo-lockup.webp',
        srcSet:
          '/webp-me-daddy-logo-lockup-320w.webp 320w, /webp-me-daddy-logo-lockup-640w.webp 640w, /webp-me-daddy-logo-lockup-900w.webp 900w, /webp-me-daddy-logo-lockup.webp 1200w',
        sizes: '(min-width: 1024px) 19rem, (min-width: 640px) 17rem, 58vw',
        alt: '',
        width: 1200,
        height: 900,
        className: 'h-auto w-full max-w-[16rem] drop-shadow-[0_20px_50px_hsl(184_85%_58%/0.16)] sm:max-w-[18rem] md:max-w-[19.5rem]',
      },
      actions: [
        {
          id: 'see-workflow',
          label: 'See The Workflow',
          variant: 'hero',
          type: 'scroll',
          target: 'webp-loop',
        },
        {
          id: 'back-to-labs',
          label: 'Back To Shadewater Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    overallProgress: 88,
    currentStage: 'Refining the operator loop and product surface',
    lastUpdated: 'March 14, 2026',
    summary:
      'The CLI-first core is strong and already production-capable. The biggest work left is productization: multi-format planning, richer orchestration, and turning the workflow into an easier public-facing experience.',
    phases: [
      {
        id: 'cli-core',
        label: 'CLI Pipeline Foundation',
        progress: 96,
        status: 'Near Complete',
        summary: 'Semantic recipes, framing, responsive output, metadata generation, and snippet targets are all in place.',
      },
      {
        id: 'audit-proof',
        label: 'Audit, Proof & Fix Plans',
        progress: 91,
        status: 'Strong',
        summary: 'Audit, lint, proof sheets, safe autofix, cleanup, and fix-plan generation are working and already useful on real projects.',
      },
      {
        id: 'positioning',
        label: 'Product Messaging & Docs',
        progress: 78,
        status: 'In Progress',
        summary: 'The product story, public project page, explainer, and official messaging are taking shape but still need polishing and simplification.',
      },
      {
        id: 'multi-format',
        label: 'AVIF & Multi-Format Strategy',
        progress: 18,
        status: 'Planned',
        summary: 'This is the clearest technical next step, but it is still in planning rather than implementation.',
      },
      {
        id: 'web-surface',
        label: 'Web App / Hosted Operator UI',
        progress: 8,
        status: 'Planned',
        summary: 'The schema and workflow are shaping up for a future web UI, but that is still a later phase rather than the current focus.',
      },
    ],
    recentMilestones: [
      'Built a semantic recipe system for heroes, review art, posters, logos, and cards.',
      'Added strict lint, proof sheets, batch proof boards, and audit-driven fix plans.',
      'Shipped usage-level overrides, snippets across frameworks, cleanup mode, and a project page inside Shadewater Labs.',
    ],
    nextUp: [
      'Design AVIF-ready manifest and snippet support without breaking the current workflow.',
      'Strengthen the fix-plan experience so audit output feels closer to an operator checklist.',
      'Keep dogfooding the tool on real site assets and tighten the product-facing messaging.',
    ],
    purpose: {
      title: 'Why It Exists',
      description:
        'Most teams do not have an image pipeline. They have a stack of manual fixes, inconsistent file names, weak alt text, forgotten width and height attributes, and zero proofing. Webp Me Daddy turns that chaos into a repeatable front-end workflow.',
      items: [
        {
          id: 'semantic-recipes',
          title: 'Semantic Recipes',
          description:
            'Prepare heroes, review art, blog covers, avatars, logo lockups, and cards with placement-aware defaults instead of one-off aspect ratio guesses.',
        },
        {
          id: 'metadata-with-teeth',
          title: 'Metadata With Teeth',
          description:
            'Generate strict alt, title, and caption metadata with accessibility modes, usage overrides, and lint rules that catch sloppy image habits before they ship.',
        },
        {
          id: 'proof-audit-cleanup',
          title: 'Proof, Audit, Cleanup',
          description:
            'Run a real operator loop with audit reports, dry-runs, proof sheets, fix plans, safe autofix, and cleanup passes instead of patching image issues one page at a time.',
        },
      ],
    },
    audienceSection: {
      title: 'Who It\'s For',
      description:
        'This is not trying to be a one-click consumer compressor. It is for technical operators who want image work to become part of a real website workflow.',
    },
    showcase: [
      {
        id: 'review-proof',
        label: 'Surface Proof',
        title: 'Review-Hero Proof Sheet',
        description:
          'A real proof render for review art, shown on multiple surfaces so composition and contrast issues are visible before shipping.',
        command:
          'python path/to/webp-me-daddy/scripts/webp_me_daddy.py proof path/to/project/public/bugonia-review-hero.webp --output path/to/project/public/webp-me-daddy-proof-review-hero.png',
        outputSummary: 'Dark/light proof sheet for a landscape review hero.',
        src: '/webp-me-daddy-proof-review-hero.webp',
        alt: 'Webp Me Daddy proof sheet showing the Bugonia review hero on dark and light surfaces with metadata and recipe details.',
        width: 1680,
        height: 1102,
      },
      {
        id: 'logo-proof',
        label: 'Transparency QA',
        title: 'Logo Lockup Surface Check',
        description:
          'Transparent assets get reviewed on dark, light, and checker backgrounds so matte halos and edge issues do not slip through.',
        command:
          'python path/to/webp-me-daddy/scripts/webp_me_daddy.py proof path/to/project/public/brin-margot-logo-lockup.webp --output path/to/project/public/webp-me-daddy-proof-logo-lockup.png',
        outputSummary: 'Dark/light/checker proof sheet for a transparent logo lockup.',
        src: '/webp-me-daddy-proof-logo-lockup.webp',
        alt: 'Webp Me Daddy proof sheet showing a transparent logo lockup on dark, light, and checkerboard surfaces.',
        width: 1680,
        height: 1102,
      },
      {
        id: 'batch-board',
        label: 'Batch Review',
        title: 'Batch Contact Sheet',
        description:
          'A dry-run proof board that shows multiple assets together with status, issue hints, and visual QA context for faster approvals.',
        command:
          'python path/to/webp-me-daddy/scripts/webp_me_daddy.py batch path/to/assets/ --recipe review-hero --dry-run --proof-contact-sheet path/to/project/public/webp-me-daddy-proof-batch-contact-sheet.png --overwrite',
        outputSummary: 'Batch proof board with lint status, action hints, and multiple review-hero assets.',
        src: '/webp-me-daddy-proof-batch-contact-sheet.webp',
        alt: 'Webp Me Daddy batch proof contact sheet showing multiple review hero assets with lint status and suggested actions.',
        width: 1676,
        height: 1356,
        featured: true,
      },
    ],
    audiences: [
      {
        id: 'frontend-teams',
        title: 'Front-End Teams',
        description:
          'For teams who want website images to be treated like production code: repeatable, lintable, proofed, and easier to maintain across real projects.',
      },
      {
        id: 'agencies',
        title: 'Agencies & Studios',
        description:
          'For multi-site operators who keep inheriting messy public folders, inconsistent snippets, random PNGs, and image QA debt that slows launches down.',
      },
      {
        id: 'technical-creators',
        title: 'Technical Creators',
        description:
          'For creators who run their site like a product and want a real image workflow instead of bouncing between compressors, manual crops, and guesswork.',
      },
    ],
    comparisonSection: {
      title: 'Why It\'s Different',
      description:
        'This is not trying to become another generic optimizer dashboard. The point is to give technical teams a production image workflow they can actually trust.',
    },
    comparisons: [
      {
        id: 'tiny-png',
        title: 'Not just a compressor',
        description:
          'TinyPNG-style tools shrink bytes. Webp Me Daddy also handles recipes, framing, metadata, snippets, proofing, audits, and cleanup.',
      },
      {
        id: 'cloudinary',
        title: 'Not trying to be your CDN',
        description:
          'Cloudinary and ImageKit are delivery platforms. Webp Me Daddy is the production prep and QA workflow that happens before or alongside hosting.',
      },
      {
        id: 'manual-chaos',
        title: 'Built to replace manual image chaos',
        description:
          'The real day-to-day competitor is inconsistent filenames, random crops, missing width and height, weak alt text, and no audit trail. This tool turns that into a repeatable loop.',
      },
    ],
    limitationsSection: {
      title: 'Current Limits',
      description:
        'The point of this page is not to pretend the project is finished. The core is strong, but there are still clear next steps before this becomes a broader product.',
    },
    limitations: [
      {
        id: 'webp-first',
        title: 'Still WebP-first',
        description:
          'The current production path is intentionally centered on WebP. AVIF and multi-format delivery are planned, but they are not part of the shipped core yet.',
      },
      {
        id: 'apply-step',
        title: 'Apply is only partly automated',
        description:
          'Audit can emit fix plans and safe autofix paths, but there is not yet a full orchestrated apply-fix-plan workflow that chains every approved step together.',
      },
      {
        id: 'web-ui',
        title: 'No public web operator UI yet',
        description:
          'The workflow is strong in CLI form, and the manifest is ready to support a web app later, but the current product surface is still aimed at technical operators.',
      },
    ],
    workflow: {
      title: 'The Core Workflow',
      eyebrow: 'Audit → Dry-Run → Proof → Fix',
      steps: [
        {
          id: 'audit-project',
          label: '01',
          title: 'Audit The Project',
          description:
            'Scan a codebase for legacy image formats, missing markup attributes, shared assets, unused files, and animated assets that need a separate workflow.',
        },
        {
          id: 'dry-run-prep',
          label: '02',
          title: 'Dry-Run The Prep',
          description:
            'Preview recipes, framing, output dimensions, lint status, and action hints before a single file is written.',
        },
        {
          id: 'proof-visuals',
          label: '03',
          title: 'Proof The Visuals',
          description:
            'Review crops and transparency on dark, light, and checker surfaces so composition problems do not hide behind “good enough” metadata.',
        },
        {
          id: 'fix-and-ship',
          label: '04',
          title: 'Fix And Ship',
          description:
            'Use fix plans, snippets, cleanup reports, and safe autofix paths to move from issue detection to production-ready assets.',
        },
      ],
    },
    cta: {
      title: 'Want To Follow The Project?',
      description:
        'Webp Me Daddy is already a real Shadewater Labs project, and it is still actively evolving. If you want the full breakdown, the broader context, or a way to talk about the workflow, here are the best next stops.',
      actions: [
        {
          id: 'view-sponsor-deck',
          label: 'View Sponsor Deck',
          variant: 'hero-outline',
          type: 'page',
          target: 'sponsor-deck',
        },
        {
          id: 'view-explainer',
          label: 'View Explainer PDF',
          variant: 'hero',
          type: 'href',
          target: '/webp-me-daddy-explainer.pdf',
          newTab: true,
        },
        {
          id: 'cta-back-to-labs',
          label: 'Back To Labs',
          variant: 'hero-outline',
          type: 'page',
          target: 'labs',
        },
      ],
    },
    explainerHref: '/webp-me-daddy-explainer.pdf',
  },
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
