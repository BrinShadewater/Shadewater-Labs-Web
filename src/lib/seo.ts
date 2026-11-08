// Imports here are relative, not "@/": vite.config.ts imports this module so the prerendered
// per-route shells and the runtime <Seo> read one source of truth, and Vite's config loader
// resolves relative paths only — a "@/" specifier there reads as a bare package and the build
// fails. Same reason brinshadewater.com's seo.ts is relative.
import { brineSpace, futureproofCompanion } from '../content/currentProjects';
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
  'Games, open-source agent tools, managed websites, and creative technology prototypes from Shadewater Labs in Vancouver.';
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
        title: `Projects | ${ORGANIZATION_NAME}`,
        description:
          'Play BrineSpace and FishMail, then browse open-source tools, prototypes, and development handoffs from Shadewater Labs.',
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
        title: `BrineSpace | ${ORGANIZATION_NAME}`,
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
    case 'futureproof':
      return {
        title: `Futureproof Festival Companion & FishMail | ${ORGANIZATION_NAME}`,
        description: 'A look at the programme, personal schedule, and FishMail aquarium built for Vancouver’s 2026 Futureproof Festival.',
        canonical: buildCanonicalUrl('futureproof'),
        image: `${LABS_ORIGIN}${futureproofCompanion.image.src}`,
        imageAlt: futureproofCompanion.image.alt,
        imageWidth: 960,
        imageHeight: 540,
        siteName: ORGANIZATION_NAME,
        type: 'article',
        jsonLd: [websiteSchema(), organizationSchema()],
      };
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
            hasPart: managedWebsites.map((site) => ({
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
  return ['projects', 'brinespace', 'futureproof', 'websites', 'toolkit', 'about'].map((page) => ({
    path: buildPath(page, undefined, 'labs'),
    page,
  }));
}

export function getLabsSitemapPaths() {
  return [
    buildPath('labs', undefined, 'labs'),
    buildPath('projects', undefined, 'labs'),
    buildPath('brinespace'),
    buildPath('futureproof'),
    buildPath('websites', undefined, 'labs'),
    buildPath('toolkit', undefined, 'labs'),
    buildPath('about', undefined, 'labs'),
  ];
}
