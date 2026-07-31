export const BRIN_ORIGIN = 'https://brinshadewater.com';
export const LABS_ORIGIN = 'https://shadewaterlabs.com';
/** Public contact address. Already listed on the GitHub profile. */
export const CONTACT_EMAIL = 'brinshadewater@gmail.com';
export type SiteKey = 'brin' | 'labs';

const LABS_STATIC_PATHS: Record<string, string> = {
  labs: '/',
  projects: '/projects',
  websites: '/websites',
  toolkit: '/toolkit',
  about: '/about',
};

const LABS_PAGES = new Set([
  'labs',
  'projects',
  'websites',
  'toolkit',
  'about',
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
    case 'toolkit':
      return { page: 'toolkit', noteId: '' };
    case 'about':
      return { page: 'about', noteId: '' };
    default:
      // Unknown path. Previously this returned the homepage, so a bad URL looked
      // like a working one and every wrong address served duplicate content.
      return { page: 'not-found', noteId: '' };
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
