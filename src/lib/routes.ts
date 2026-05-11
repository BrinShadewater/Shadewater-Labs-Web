export const BRIN_ORIGIN = 'https://brinshadewater.com';
export const LABS_ORIGIN = 'https://shadewaterlabs.com';
export type SiteKey = 'brin' | 'labs';

const LABS_STATIC_PATHS: Record<string, string> = {
  labs: '/',
  projects: '/projects',
  websites: '/websites',
  'tech-news': '/tech-news',
  about: '/about',
  'shadewater-seo-report': '/shadewater-seo-report',
  'webp-me-daddy': '/webp-me-daddy',
  'inkmaster-studio': '/inkmaster-studio',
};

const LABS_PAGES = new Set([
  'labs',
  'projects',
  'websites',
  'tech-news',
  'about',
  'shadewater-seo-report',
  'webp-me-daddy',
  'inkmaster-studio',
]);

export function getSiteKey(hostname: string): SiteKey {
  return hostname.toLowerCase().replace(/^www\./, '') === 'shadewaterlabs.com' ? 'labs' : 'brin';
}

export function getOrigin(site: SiteKey) {
  return site === 'labs' ? LABS_ORIGIN : BRIN_ORIGIN;
}

export function isLabsPage(page: string) {
  return LABS_PAGES.has(page);
}

export function slugifySegment(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function parseLocation(pathname: string, _hash = '') {
  const cleaned = pathname.replace(/^\/+|\/+$/g, '');
  if (!cleaned) {
    return { page: 'labs', noteId: '' };
  }

  switch (cleaned) {
    case 'projects':
      return { page: 'projects', noteId: '' };
    case 'websites':
      return { page: 'websites', noteId: '' };
    case 'tech-news':
      return { page: 'tech-news', noteId: '' };
    case 'about':
      return { page: 'about', noteId: '' };
    case 'shadewater-seo-report':
      return { page: 'shadewater-seo-report', noteId: '' };
    case 'webp-me-daddy':
      return { page: 'webp-me-daddy', noteId: '' };
    case 'inkmaster-studio':
      return { page: 'inkmaster-studio', noteId: '' };
    default:
      return { page: 'labs', noteId: '' };
  }
}

export function buildPath(page: string, _noteId?: string, _site: SiteKey = 'labs') {
  return LABS_STATIC_PATHS[page] ?? LABS_STATIC_PATHS.labs;
}

export function getOwnerSite(_page: string): SiteKey {
  return 'labs';
}

export function buildRouteHref(page: string, noteId?: string, _currentSite: SiteKey = 'labs') {
  return buildPath(page, noteId, 'labs');
}

export function buildCanonicalUrl(page: string, _noteId?: string, _site: SiteKey = 'labs') {
  const path = buildPath(page, undefined, 'labs');
  return path === '/' ? `${LABS_ORIGIN}/` : `${LABS_ORIGIN}${path}`;
}
