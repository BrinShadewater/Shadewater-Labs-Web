import { projectStatuses } from '@/content/projects';
import { techNewsItems } from '@/content/techNews';
import { managedWebsites } from '@/content/websites';
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

function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getSeoConfig(page: string, _noteId = '', _site: SiteKey = 'labs'): SeoConfig {
  const seoReport = projectStatuses['shadewater-seo-report'];
  const webp = projectStatuses['webp-me-daddy'];
  const inkmaster = projectStatuses['inkmaster-studio'];

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
            itemListElement: [seoReport, webp, inkmaster].map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: buildCanonicalUrl(project.slug, undefined, 'labs'),
              name: project.name,
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
            itemListElement: Object.values(projectStatuses).map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: buildCanonicalUrl(project.slug, undefined, 'labs'),
              name: project.name,
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
    case 'shadewater-seo-report':
      return {
        title: `${seoReport.name} | ${ORGANIZATION_NAME}`,
        description: seoReport.summary,
        canonical: buildCanonicalUrl('shadewater-seo-report', undefined, 'labs'),
        image: `${LABS_ORIGIN}${seoReport.hero.logo?.src ?? SHADEWATER_LABS_MARK_SRC}`,
        imageAlt: seoReport.name,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        author: seoReport.author,
        keywords:
          'Shadewater SEO Report, SEO audit skill, technical SEO reports, branded SEO dashboard, Shadewater Labs',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: seoReport.name,
            description: seoReport.summary,
            applicationCategory: 'DeveloperApplication',
            creator: { '@type': 'Person', name: seoReport.author },
            url: buildCanonicalUrl('shadewater-seo-report', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: seoReport.name, url: buildCanonicalUrl('shadewater-seo-report', undefined, 'labs') },
          ]),
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'webp-me-daddy':
      return {
        title: `${webp.name} | ${ORGANIZATION_NAME}`,
        description: webp.summary,
        canonical: buildCanonicalUrl('webp-me-daddy', undefined, 'labs'),
        image: `${LABS_ORIGIN}${webp.hero.logo?.src ?? '/webp-me-daddy-logo-lockup.webp'}`,
        imageAlt: webp.name,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        author: webp.author,
        keywords: 'Webp Me Daddy, image optimization, WebP pipeline, frontend image workflow, Brin Shadewater',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: webp.name,
            description: webp.summary,
            applicationCategory: 'DeveloperApplication',
            creator: { '@type': 'Person', name: webp.author },
            url: buildCanonicalUrl('webp-me-daddy', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: webp.name, url: buildCanonicalUrl('webp-me-daddy', undefined, 'labs') },
          ]),
          websiteSchema(),
          organizationSchema(),
          personSchema(),
        ],
      };
    case 'inkmaster-studio':
      return {
        title: `${inkmaster.name} | ${ORGANIZATION_NAME}`,
        description: inkmaster.summary,
        canonical: buildCanonicalUrl('inkmaster-studio', undefined, 'labs'),
        image: `${LABS_ORIGIN}${inkmaster.hero.logo?.src ?? '/inkmaster-studio-site-logo.webp'}`,
        imageAlt: inkmaster.name,
        siteName: ORGANIZATION_NAME,
        type: 'website',
        author: inkmaster.author,
        keywords: 'InkMaster Studio, DTG print prep, merch design workflow, apparel graphics, Brin Shadewater',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: inkmaster.name,
            description: inkmaster.summary,
            applicationCategory: 'BusinessApplication',
            creator: { '@type': 'Person', name: inkmaster.author },
            url: buildCanonicalUrl('inkmaster-studio', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: inkmaster.name, url: buildCanonicalUrl('inkmaster-studio', undefined, 'labs') },
          ]),
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
    buildPath('shadewater-seo-report', undefined, 'labs'),
    buildPath('webp-me-daddy', undefined, 'labs'),
    buildPath('inkmaster-studio', undefined, 'labs'),
  ];
}
