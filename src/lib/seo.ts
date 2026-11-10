// Imports here are relative, not "@/": vite.config.ts imports this module so the prerendered
// per-route shells and the runtime <Seo> read one source of truth, and Vite's config loader
// resolves relative paths only — a "@/" specifier there reads as a bare package and the build
// fails. Same reason brinshadewater.com's seo.ts is relative.
import { brineSpace, brineSpaceAssetCase, futureproofCase } from '../content/currentProjects';
import { webpExample } from '../content/webpExample';
import { seoAuditExample } from '../content/seoAuditExample';
import { researchPaper } from '../content/researchPaper';
import { tools } from '../content/tools';
import { managedWebsites } from '../content/websites';
import { openSourceReleases } from '../content/openSource';
import { SHADEWATER_LABS_MARK_ALT, SHADEWATER_LABS_MARK_HEIGHT, SHADEWATER_LABS_MARK_SRC, SHADEWATER_LABS_MARK_WIDTH } from './brandAssets';
import { BRIN_ORIGIN, CONTACT_EMAIL, LABS_ORIGIN, buildCanonicalUrl, buildPath, getOrigin, type SiteKey } from './routes';

export type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  siteName: string;
  type: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
  /** Keeps a page out of the index — set for the 404, which must not be indexed. */
  noindex?: boolean;
  jsonLd: object[];
};

const BRAND_NAME = 'Brin Shadewater';
const ORGANIZATION_NAME = 'Shadewater Labs';
const labsShareImage = {
  image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
  imageAlt: SHADEWATER_LABS_MARK_ALT,
  imageWidth: SHADEWATER_LABS_MARK_WIDTH,
  imageHeight: SHADEWATER_LABS_MARK_HEIGHT,
};
const labsShareCard = {
  image: `${LABS_ORIGIN}/shadewater-labs-share-card.jpg`,
  imageAlt: 'Shadewater Labs. Games, open-source tools, and creative tech.',
  imageWidth: 1200,
  imageHeight: 630,
};
const LABS_DESCRIPTION =
  'Shadewater Labs is a Vancouver creative tech studio. Explore BrineSpace, open-source tools for WebP images, SEO and game assets, and our ADHD research.';
const SAME_AS_LINKS = [
  'https://www.youtube.com/@brinshadewater',
  'https://x.com/brinshadewater',
  'https://www.instagram.com/brinshadewater',
  'https://www.twitch.tv/brinshadewater',
  'https://letterboxd.com/brinshadewater',
];

function organizationSchema(site: SiteKey = 'labs') {
  const origin = getOrigin(site);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}#organization`,
    name: ORGANIZATION_NAME,
    url: LABS_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: `${LABS_ORIGIN}/shadewater-labs-text-logo.webp`,
    },
    sameAs: SAME_AS_LINKS,
    founder: {
      '@id': `${BRIN_ORIGIN}#person`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business enquiries',
      email: CONTACT_EMAIL,
      url: `${LABS_ORIGIN}/about`,
    },
  };
}

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BRIN_ORIGIN}#person`,
    name: BRAND_NAME,
    url: BRIN_ORIGIN,
    sameAs: SAME_AS_LINKS,
    jobTitle: 'Streamer, reviewer, filmmaker, and creator behind Shadewater Labs',
    worksFor: {
      '@id': `${LABS_ORIGIN}#organization`,
    },
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${LABS_ORIGIN}#website`,
    name: ORGANIZATION_NAME,
    url: LABS_ORIGIN,
    description: LABS_DESCRIPTION,
    inLanguage: 'en-CA',
    publisher: {
      '@id': `${LABS_ORIGIN}#organization`,
    },
    about: {
      '@id': `${LABS_ORIGIN}#organization`,
    },
  };
}

function articleSchema(url: string, article: { title: string; description: string }, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.description,
    image,
    inLanguage: 'en-CA',
    publisher: { '@id': `${LABS_ORIGIN}#organization` },
  };
}

export function getSeoConfig(page: string, _noteId = '', _site: SiteKey = 'labs'): SeoConfig {

  switch (page) {
    case 'labs':
      return {
        title: `Shadewater Labs | AI Tools, Web Apps & Tech Experiments`,
        description: LABS_DESCRIPTION,
        canonical: buildCanonicalUrl('labs', undefined, 'labs'),
        ...labsShareCard,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs, AI tools, coding projects, creative technology, Brin Shadewater',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Shadewater Labs',
            url: buildCanonicalUrl('labs', undefined, 'labs'),
            description: LABS_DESCRIPTION,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [brineSpace, ...openSourceReleases].map((release, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: release.url,
              name: release.name,
            })),
          },
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'projects':
      return {
        title: `Games & Open-Source Tools | ${ORGANIZATION_NAME}`,
        description:
          'Play BrineSpace and FishMail, find open-source tools for WebP conversion, game assets and SEO audits, and read how the projects were built.',
        canonical: buildCanonicalUrl('projects', undefined, 'labs'),
        ...labsShareCard,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs projects, AI tools, coding projects, product experiments',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Shadewater Labs Projects',
            url: buildCanonicalUrl('projects', undefined, 'labs'),
            description: 'Playable demos, open-source releases, prototypes, and development handoffs from Shadewater Labs.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: openSourceReleases.map((release, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: release.url,
              name: release.name,
            })),
          },
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'brinespace':
      return {
        title: `BrineSpace: Underwater Colony Builder | ${ORGANIZATION_NAME}`,
        description: 'Explore BrineSpace, a card-driven underwater colony builder. See how expeditions work and find the Windows and Mac preview on itch.io.',
        canonical: buildCanonicalUrl('brinespace'),
        image: `${LABS_ORIGIN}/brinespace-expedition-draft.webp`,
        imageAlt: 'A BrineSpace station with three room cards ready to draft.',
        imageWidth: 1200,
        imageHeight: 675,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        jsonLd: [websiteSchema(), organizationSchema()],
      };
    case 'brinespace-asset-case': {
      const canonical = buildCanonicalUrl(page);
      const image = `${LABS_ORIGIN}${brineSpaceAssetCase.image.src}`;
      return {
        title: `${brineSpaceAssetCase.title} | ${ORGANIZATION_NAME}`,
        description: brineSpaceAssetCase.description,
        canonical,
        image,
        imageAlt: brineSpaceAssetCase.image.alt,
        imageWidth: brineSpaceAssetCase.image.width,
        imageHeight: brineSpaceAssetCase.image.height,
        siteName: ORGANIZATION_NAME,
        type: 'article',
        jsonLd: [articleSchema(canonical, brineSpaceAssetCase, image), websiteSchema(), organizationSchema()],
      };
    }
    case 'webp-example': {
      const canonical = buildCanonicalUrl(page);
      const image = `${LABS_ORIGIN}${webpExample.preview.src}`;
      return {
        title: `Webp Me Daddy: Responsive WebP Example | ${ORGANIZATION_NAME}`,
        description: webpExample.description,
        canonical,
        image,
        imageAlt: webpExample.preview.alt,
        imageWidth: webpExample.preview.width,
        imageHeight: webpExample.preview.height,
        siteName: ORGANIZATION_NAME,
        type: 'article',
        jsonLd: [articleSchema(canonical, webpExample, image), websiteSchema(), organizationSchema()],
      };
    }
    case 'seo-audit-example': {
      const canonical = buildCanonicalUrl(page);
      const image = `${LABS_ORIGIN}${seoAuditExample.image.src}`;
      return {
        title: `SEO Audit Example: OAI-SearchBot | ${ORGANIZATION_NAME}`,
        description: seoAuditExample.description,
        canonical,
        image,
        imageAlt: seoAuditExample.image.alt,
        imageWidth: seoAuditExample.image.width,
        imageHeight: seoAuditExample.image.height,
        siteName: ORGANIZATION_NAME,
        type: 'article',
        jsonLd: [articleSchema(canonical, seoAuditExample, image), websiteSchema(), organizationSchema()],
      };
    }
    case 'futureproof': {
      const canonical = buildCanonicalUrl(page);
      const image = `${LABS_ORIGIN}${futureproofCase.image.src}`;
      return {
        title: `${futureproofCase.title} | ${ORGANIZATION_NAME}`,
        description: 'A look at the programme, personal schedule, and FishMail aquarium built for Vancouver’s 2026 Futureproof Festival.',
        canonical,
        image,
        imageAlt: futureproofCase.image.alt,
        imageWidth: futureproofCase.image.width,
        imageHeight: futureproofCase.image.height,
        siteName: ORGANIZATION_NAME,
        type: 'article',
        jsonLd: [articleSchema(canonical, futureproofCase, image), websiteSchema(), organizationSchema()],
      };
    }
    case 'websites':
      return {
        title: `Websites | ${ORGANIZATION_NAME}`,
        description:
          'Websites designed and maintained through Shadewater Labs, including Data Goblin, InkMaster Studio, and the official Strange Harvest film site.',
        canonical: buildCanonicalUrl('websites', undefined, 'labs'),
        ...labsShareImage,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs websites, managed websites, Brin Shadewater, InkMaster Studio',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Managed Web Properties',
            url: buildCanonicalUrl('websites', undefined, 'labs'),
            hasPart: managedWebsites.filter(site => site.status !== 'Unavailable').map((site) => ({
              '@type': 'WebSite',
              name: site.name,
              url: site.url,
              description: site.description,
            })),
          },
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'toolkit':
      return {
        title: `Toolkit | ${ORGANIZATION_NAME}`,
        description:
          'Third-party tools actually used at Shadewater Labs, what each one is reached for, and where it falls short.',
        canonical: buildCanonicalUrl('toolkit', undefined, 'labs'),
        ...labsShareImage,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'creative tech tools, AI video tools, agent tooling, Shadewater Labs toolkit',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Toolkit | ${ORGANIZATION_NAME}`,
            url: buildCanonicalUrl('toolkit', undefined, 'labs'),
            description: 'Third-party tools used on real work at Shadewater Labs.',
            hasPart: tools.map((t) => ({
              '@type': 'SoftwareApplication',
              name: t.name,
              url: t.url,
              applicationCategory: t.category,
              description: t.use,
            })),
          },
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'research': {
      const title = `ADHD Research on Sleep & Executive Function | ${ORGANIZATION_NAME}`;
      const description = 'Read Alex Yesilcimen’s November 2026 paper on physiological state and executive function in ADHD, with an illustrated guide and proposed adult sleep study.';
      const canonical = buildCanonicalUrl('research');
      const paperId = `${canonical}#adhd`;
      return {
        title,
        description,
        canonical,
        ...labsShareCard,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        author: researchPaper.author,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': canonical,
            name: title,
            url: canonical,
            description,
            mainEntity: { '@id': paperId },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ScholarlyArticle',
            '@id': paperId,
            headline: researchPaper.citationTitle,
            description: 'A research perspective on attention, effort, and daily functioning in ADHD, with a proposed adult sleep study.',
            author: { '@type': 'Person', name: researchPaper.author },
            datePublished: researchPaper.datePublished,
            version: researchPaper.edition,
            mainEntityOfPage: canonical,
            publisher: { '@id': `${LABS_ORIGIN}#organization` },
            encoding: {
              '@type': 'MediaObject',
              encodingFormat: 'application/pdf',
              contentUrl: researchPaper.url,
            },
          },
          websiteSchema(),
          organizationSchema(),
        ],
      };
    }
    case 'about':
      return {
        title: `About | ${ORGANIZATION_NAME}`,
        description:
          'Shadewater Labs is run by Brin Shadewater, a Vancouver-based filmmaker and creative technologist working across film production, AI tooling, and interactive media.',
        canonical: buildCanonicalUrl('about', undefined, 'labs'),
        ...labsShareImage,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Brin Shadewater, Shadewater Labs, Vancouver, filmmaker, creative technologist, Directors Guild of Canada',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About ${ORGANIZATION_NAME}`,
            url: buildCanonicalUrl('about', undefined, 'labs'),
            description:
              'Background on Shadewater Labs and the person who runs it.',
          },
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'not-found':
      return {
        title: `Page not found | ${ORGANIZATION_NAME}`,
        description: 'That address does not match anything on shadewaterlabs.com.',
        canonical: `${LABS_ORIGIN}/`,
        ...labsShareImage,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        noindex: true,
        keywords: '',
        jsonLd: [websiteSchema(), organizationSchema()],
      };
    default:
      return {
        title: `Shadewater Labs | AI Tools, Web Apps & Tech Experiments`,
        description: LABS_DESCRIPTION,
        canonical: `${LABS_ORIGIN}/`,
        ...labsShareImage,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs, AI tools, coding projects, creative technology, Brin Shadewater',
        jsonLd: [websiteSchema(), organizationSchema(), personSchema()],
      };
  }
}

/**
 * The routes that get their own prerendered shell at build time. The home page is
 * index.html itself, so it is not listed here; everything else in LABS_PAGES is.
 */
export function getLabsPrerenderTargets(): { path: string; page: string }[] {
  return ['projects', 'brinespace', 'brinespace-asset-case', 'webp-example', 'seo-audit-example', 'futureproof', 'websites', 'toolkit', 'research', 'about'].map((page) => ({
    path: buildPath(page, undefined, 'labs'),
    page,
  }));
}

export function getLabsSitemapPaths() {
  return [
    buildPath('labs', undefined, 'labs'),
    buildPath('projects', undefined, 'labs'),
    buildPath('brinespace'),
    buildPath('brinespace-asset-case'),
    buildPath('webp-example'),
    buildPath('seo-audit-example'),
    buildPath('futureproof'),
    buildPath('websites', undefined, 'labs'),
    buildPath('toolkit', undefined, 'labs'),
    buildPath('research'),
    buildPath('about', undefined, 'labs'),
  ];
}
