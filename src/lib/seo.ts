import { notes } from '@/content/notes';
import { projectStatuses } from '@/content/projects';
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

const DEFAULT_IMAGE = `${BRIN_ORIGIN}/hero-illustration.webp`;
const DEFAULT_IMAGE_ALT = 'Illustration of Brin Shadewater and Margot gaming together';
const BRAND_NAME = 'Brin Shadewater';
const ORGANIZATION_NAME = 'Shadewater Labs';
const DEFAULT_DESCRIPTION =
  'Brin Shadewater shares late-night Twitch streams, sharp game and movie reviews, community updates, and Shadewater Labs experiments in one cozy home base.';
const SAME_AS_LINKS = [
  'https://www.youtube.com/@brinshadewater',
  'https://x.com/brinshadewater',
  'https://www.instagram.com/brinshadewater',
  'https://www.twitch.tv/brinshadewater',
  'https://letterboxd.com/brinshadewater',
];

function normalizeDate(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
}

function organizationSchema(site: SiteKey = 'brin') {
  const origin = getOrigin(site);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}#organization`,
    name: ORGANIZATION_NAME,
    url: site === 'labs' ? LABS_ORIGIN : BRIN_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/shadewater-labs-logo-mark.webp`,
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
    image: DEFAULT_IMAGE,
    sameAs: SAME_AS_LINKS,
    jobTitle: 'Streamer, reviewer, filmmaker, and creator behind Shadewater Labs',
    worksFor: {
      '@id': `${LABS_ORIGIN}#organization`,
    },
    description: DEFAULT_DESCRIPTION,
    knowsAbout: [
      'Twitch streaming',
      'video game reviews',
      'movie reviews',
      'filmmaking',
      'creative technology',
      'web development',
      'AI tooling',
    ],
  };
}

function websiteSchema(site: SiteKey = 'brin') {
  const origin = getOrigin(site);
  const isLabs = site === 'labs';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}#website`,
    name: isLabs ? ORGANIZATION_NAME : BRAND_NAME,
    url: origin,
    description: isLabs
      ? 'AI tools, coding projects, creative technology experiments, and product prototypes from Shadewater Labs.'
      : DEFAULT_DESCRIPTION,
    inLanguage: 'en-CA',
    publisher: {
      '@id': `${origin}#organization`,
    },
    about: {
      '@id': isLabs ? `${origin}#organization` : `${BRIN_ORIGIN}#person`,
    },
  };
}

function profilePageSchema(url: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      '@id': `${BRIN_ORIGIN}#website`,
    },
    mainEntity: {
      '@id': `${BRIN_ORIGIN}#person`,
    },
    about: {
      '@id': `${BRIN_ORIGIN}#organization`,
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

export function getSeoConfig(page: string, noteId = '', site: SiteKey = 'brin'): SeoConfig {
  const note = page === 'post' ? notes.find((entry) => entry.id === noteId) : undefined;
  const seoReport = projectStatuses['shadewater-seo-report'];
  const webp = projectStatuses['webp-me-daddy'];
  const inkmaster = projectStatuses['inkmaster-studio'];
  const currentSite = site;

  if (note) {
    return {
      title: `${note.title} | ${BRAND_NAME}`,
      description: note.excerpt,
      canonical: buildCanonicalUrl('post', note.id, 'brin'),
      image: `${BRIN_ORIGIN}${note.heroImage?.src ?? '/bugonia-review-hero.webp'}`,
      imageAlt: note.heroImage?.alt ?? note.title,
      siteName: BRAND_NAME,
      type: 'article',
      author: note.author,
      publishedTime: normalizeDate(note.date),
      modifiedTime: normalizeDate(note.date),
      keywords: `${note.category}, ${note.type}, ${note.author}, Brin Shadewater`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
            '@id': `${buildCanonicalUrl('post', note.id, 'brin')}#article`,
          headline: note.title,
          description: note.excerpt,
          author: {
            '@type': 'Person',
            name: note.author,
          },
          publisher: {
            '@id': `${BRIN_ORIGIN}#organization`,
          },
          datePublished: normalizeDate(note.date),
          dateModified: normalizeDate(note.date),
          image: note.heroImage ? [`${BRIN_ORIGIN}${note.heroImage.src}`] : [DEFAULT_IMAGE],
          mainEntityOfPage: buildCanonicalUrl('post', note.id, 'brin'),
          url: buildCanonicalUrl('post', note.id, 'brin'),
          articleSection: note.category,
        },
        breadcrumbSchema([
          { name: 'Home', url: buildCanonicalUrl('home', undefined, 'brin') },
          { name: 'Reviews & Notes', url: buildCanonicalUrl('notes', undefined, 'brin') },
          { name: note.title, url: buildCanonicalUrl('post', note.id, 'brin') },
        ]),
        websiteSchema('brin'),
        organizationSchema('brin'),
        personSchema(),
      ],
    };
  }

  switch (page) {
    case 'stream':
      return {
        title: `Stream | ${BRAND_NAME}`,
        description:
          'Watch Brin Shadewater live, explore the weekly stream schedule, and catch late-night gaming, film talk, and tech rabbit holes.',
        canonical: buildCanonicalUrl('stream', undefined, 'brin'),
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'Brin Shadewater stream, Twitch stream schedule, late night gaming stream, film discussion stream',
        jsonLd: [websiteSchema('brin'), organizationSchema('brin'), personSchema()],
      };
    case 'notes':
      return {
        title: `Reviews & Notes | ${BRAND_NAME}`,
        description:
          'Game reviews, movie notes, tech essays, and honest impressions from Brin Shadewater and friends.',
        canonical: buildCanonicalUrl('notes', undefined, 'brin'),
        image: `${BRIN_ORIGIN}/bugonia-review-hero.webp`,
        imageAlt: 'Bugonia review hero art centered on the poster face beneath dripping red liquid.',
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'Brin Shadewater reviews, game reviews, movie reviews, tech notes, essays',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Reviews & Notes',
            url: buildCanonicalUrl('notes', undefined, 'brin'),
            description:
              'A growing archive of reviews, notes, and essays covering games, movies, TV, tech, and creative projects.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: notes.map((note, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: buildCanonicalUrl('post', note.id, 'brin'),
              name: note.title,
            })),
          },
          websiteSchema('brin'),
          organizationSchema('brin'),
          personSchema(),
        ],
      };
    case 'community':
      return {
        title: `Community | ${BRAND_NAME}`,
        description:
          'Meet the Chaos Pals, explore The Canopy stream team, and join Brin Shadewater’s late-night community orbit.',
        canonical: buildCanonicalUrl('community', undefined, 'brin'),
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'Brin Shadewater community, Chaos Pals, The Canopy, Discord community',
        jsonLd: [websiteSchema('brin'), organizationSchema('brin'), personSchema()],
      };
    case 'about':
      return {
        title: `About | ${BRAND_NAME}`,
        description:
          'Learn more about Brin Shadewater, the stream, the reviews, the projects, and Margot’s ongoing supervision.',
        canonical: buildCanonicalUrl('about', undefined, 'brin'),
        image: `${BRIN_ORIGIN}/brin-margot-logo-lockup.webp`,
        imageAlt: 'Brin Shadewater and Margot logo lockup',
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'About Brin Shadewater, streamer bio, filmmaker, Shadewater Labs',
        jsonLd: [websiteSchema('brin'), organizationSchema('brin'), personSchema()],
      };
    case 'labs':
      return {
        title: `Shadewater Labs | ${BRAND_NAME}`,
        description:
          'AI tools, coding projects, and new tech experiments from Shadewater Labs.',
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
          websiteSchema('labs'),
          organizationSchema('labs'),
          personSchema(),
        ],
      };
    case 'shadewater-seo-report':
      return {
        title: `${seoReport.name} | ${BRAND_NAME}`,
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
            creator: {
              '@type': 'Person',
              name: seoReport.author,
            },
            url: buildCanonicalUrl('shadewater-seo-report', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: seoReport.name, url: buildCanonicalUrl('shadewater-seo-report', undefined, 'labs') },
          ]),
          websiteSchema('labs'),
          organizationSchema('labs'),
          personSchema(),
        ],
      };
    case 'webp-me-daddy':
      return {
        title: `${webp.name} | ${BRAND_NAME}`,
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
            creator: {
              '@type': 'Person',
              name: webp.author,
            },
            url: buildCanonicalUrl('webp-me-daddy', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: webp.name, url: buildCanonicalUrl('webp-me-daddy', undefined, 'labs') },
          ]),
          websiteSchema('labs'),
          organizationSchema('labs'),
          personSchema(),
        ],
      };
    case 'inkmaster-studio':
      return {
        title: `${inkmaster.name} | ${BRAND_NAME}`,
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
            creator: {
              '@type': 'Person',
              name: inkmaster.author,
            },
            url: buildCanonicalUrl('inkmaster-studio', undefined, 'labs'),
          },
          breadcrumbSchema([
            { name: 'Shadewater Labs', url: buildCanonicalUrl('labs', undefined, 'labs') },
            { name: inkmaster.name, url: buildCanonicalUrl('inkmaster-studio', undefined, 'labs') },
          ]),
          websiteSchema('labs'),
          organizationSchema('labs'),
          personSchema(),
        ],
      };
    case 'sponsor-deck':
      return {
        title: `Sponsor Deck | ${BRAND_NAME}`,
        description:
          'Work with Brin Shadewater on streams, reviews, creator programs, and Shadewater Labs.',
        canonical: buildCanonicalUrl('sponsor-deck', undefined, 'brin'),
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'Brin Shadewater sponsor deck, sponsorship opportunities, creator partnerships, Twitch sponsorships',
        jsonLd: [websiteSchema('brin'), organizationSchema('brin'), personSchema()],
      };
    case 'home':
    default:
      return {
        title: `${BRAND_NAME} | Late-Night Streams & Shadewater Labs`,
        description: DEFAULT_DESCRIPTION,
        canonical: buildCanonicalUrl(currentSite === 'labs' ? 'labs' : 'home', undefined, currentSite === 'labs' ? 'labs' : 'brin'),
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        siteName: BRAND_NAME,
        type: 'website',
        keywords: 'Brin Shadewater, Twitch streamer, game reviews, movie reviews, Shadewater Labs',
        jsonLd: [
          websiteSchema('brin'),
          organizationSchema('brin'),
          personSchema(),
          profilePageSchema(buildCanonicalUrl('home', undefined, 'brin'), BRAND_NAME, DEFAULT_DESCRIPTION),
        ],
      };
  }
}

export function getSitemapPaths() {
  return [
    buildPath('home', undefined, 'brin'),
    buildPath('stream', undefined, 'brin'),
    buildPath('notes', undefined, 'brin'),
    ...notes.map((note) => buildPath('post', note.id, 'brin')),
    buildPath('community', undefined, 'brin'),
    buildPath('about', undefined, 'brin'),
    buildPath('sponsor-deck', undefined, 'brin'),
  ];
}

export function getLabsSitemapPaths() {
  return [
    buildPath('labs', undefined, 'labs'),
    buildPath('shadewater-seo-report', undefined, 'labs'),
    buildPath('webp-me-daddy', undefined, 'labs'),
    buildPath('inkmaster-studio', undefined, 'labs'),
  ];
}
