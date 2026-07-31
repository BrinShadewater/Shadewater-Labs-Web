import { techNewsItems } from '@/content/techNews';
import { managedWebsites } from '@/content/websites';
import { openSourceReleases } from '@/content/openSource';
import { SHADEWATER_LABS_MARK_ALT, SHADEWATER_LABS_MARK_SRC } from '@/lib/brandAssets';
import { BRIN_ORIGIN, LABS_ORIGIN, buildCanonicalUrl, buildPath, getOrigin, type SiteKey } from '@/lib/routes';

type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  siteName: string;
  type: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
  jsonLd: object[];
};

const BRAND_NAME = 'Brin Shadewater';
const ORGANIZATION_NAME = 'Shadewater Labs';
const LABS_DESCRIPTION =
  'AI tools, coding projects, creative technology experiments, and digital product prototypes from Shadewater Labs.';
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
        title: `Shadewater Labs | AI Tools, Coding Projects & Tech Experiments`,
        description: LABS_DESCRIPTION,
        canonical: buildCanonicalUrl('labs', undefined, 'labs'),
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs, AI tools, coding projects, creative technology, Brin Shadewater',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Shadewater Labs',
            url: buildCanonicalUrl('labs', undefined, 'labs'),
            description: 'A catalog of AI tools, coding projects, and future-tech experiments by Brin Shadewater.',
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
    case 'projects':
      return {
        title: `Projects | ${ORGANIZATION_NAME}`,
        description:
          'Explore the active Shadewater Labs catalog of AI tools, coding projects, creative technology builds, and product experiments.',
        canonical: buildCanonicalUrl('projects', undefined, 'labs'),
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs projects, AI tools, coding projects, product experiments',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Shadewater Labs Projects',
            url: buildCanonicalUrl('projects', undefined, 'labs'),
            description: 'The active catalog of Shadewater Labs projects and experiments.',
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
    case 'websites':
      return {
        title: `Websites | ${ORGANIZATION_NAME}`,
        description:
          'Managed web properties from Shadewater Labs, including Brin Shadewater, Shadewater Labs, and InkMaster Studio.',
        canonical: buildCanonicalUrl('websites', undefined, 'labs'),
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
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
    case 'tech-news':
      return {
        title: `Tech News | ${ORGANIZATION_NAME}`,
        description:
          'A manually curated Shadewater Labs feed for AI-related technology signals, creative tooling, and product experiment notes.',
        canonical: buildCanonicalUrl('tech-news', undefined, 'labs'),
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'AI tech news, creative technology, AI tools, Shadewater Labs notes',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI & Creative Tech Notes',
            url: buildCanonicalUrl('tech-news', undefined, 'labs'),
            hasPart: techNewsItems.map((item) => ({
              '@type': 'Article',
              headline: item.title,
              description: item.summary,
              datePublished: item.date,
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
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
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
    default:
      return {
        title: `Shadewater Labs | AI Tools, Coding Projects & Tech Experiments`,
        description: LABS_DESCRIPTION,
        canonical: `${LABS_ORIGIN}/`,
        image: `${LABS_ORIGIN}${SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: SHADEWATER_LABS_MARK_ALT,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        keywords: 'Shadewater Labs, AI tools, coding projects, creative technology, Brin Shadewater',
        jsonLd: [websiteSchema(), organizationSchema(), personSchema()],
      };
  }
}

export function getLabsSitemapPaths() {
  return [
    buildPath('labs', undefined, 'labs'),
    buildPath('projects', undefined, 'labs'),
    buildPath('websites', undefined, 'labs'),
    buildPath('tech-news', undefined, 'labs'),
    buildPath('about', undefined, 'labs'),
  ];
}
