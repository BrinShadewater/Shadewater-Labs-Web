import { notes } from '@/content/notes';

export const DEFAULT_PAGE = 'home';
export const BRIN_ORIGIN = 'https://brinshadewater.com';
export const LABS_ORIGIN = 'https://shadewaterlabs.com';
export const SITE_ORIGIN = BRIN_ORIGIN;
export type SiteKey = 'brin' | 'labs';

const STATIC_PATHS: Record<string, string> = {
  home: '/',
  stream: '/stream',
  notes: '/reviews-notes',
  community: '/community',
  about: '/about',
  labs: '/labs',
  'shadewater-seo-report': '/labs/shadewater-seo-report',
  'webp-me-daddy': '/labs/webp-me-daddy',
  'inkmaster-studio': '/labs/inkmaster-studio',
  'sponsor-deck': '/sponsor-deck',
};

const LABS_STATIC_PATHS: Record<string, string> = {
  labs: '/',
  'shadewater-seo-report': '/shadewater-seo-report',
  'webp-me-daddy': '/webp-me-daddy',
  'inkmaster-studio': '/inkmaster-studio',
};

const LABS_PAGES = new Set(['labs', 'shadewater-seo-report', 'webp-me-daddy', 'inkmaster-studio']);

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

export function getNoteSlug(noteId: string) {
  const note = notes.find((entry) => entry.id === noteId);
  return note ? slugifySegment(note.title) : noteId;
}

export function findNoteIdFromSegment(segment: string) {
  const normalized = segment.trim().toLowerCase();
  const note = notes.find((entry) => entry.id === normalized || slugifySegment(entry.title) === normalized);
  return note?.id ?? '';
}

function parseLegacyHash(hash: string) {
  const trimmed = hash.replace(/^#\/?/, '').replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    return { page: DEFAULT_PAGE, noteId: '' };
  }

  const [page, detail = ''] = trimmed.split('/');
  if (page === 'post') {
    return { page: 'post', noteId: findNoteIdFromSegment(detail) || detail };
  }

  return { page, noteId: '' };
}

export function parseLocation(pathname: string, hash = '', site: SiteKey = 'brin') {
  if (hash.startsWith('#/')) {
    return parseLegacyHash(hash);
  }

  const cleaned = pathname.replace(/^\/+|\/+$/g, '');
  if (!cleaned || cleaned === 'home') {
    return { page: site === 'labs' ? 'labs' : DEFAULT_PAGE, noteId: '' };
  }

  const segments = cleaned.split('/');
  const [first, second] = segments;

  switch (first) {
    case 'stream':
      return { page: 'stream', noteId: '' };
    case 'reviews-notes':
      if (second) {
        return { page: 'post', noteId: findNoteIdFromSegment(second) };
      }
      return { page: 'notes', noteId: '' };
    case 'community':
      return { page: 'community', noteId: '' };
    case 'about':
      return { page: 'about', noteId: '' };
    case 'labs':
      if (second === 'shadewater-seo-report') {
        return { page: 'shadewater-seo-report', noteId: '' };
      }
      if (second === 'webp-me-daddy') {
        return { page: 'webp-me-daddy', noteId: '' };
      }
      if (second === 'inkmaster-studio') {
        return { page: 'inkmaster-studio', noteId: '' };
      }
      return { page: 'labs', noteId: '' };
    case 'shadewater-seo-report':
      return { page: 'shadewater-seo-report', noteId: '' };
    case 'webp-me-daddy':
      return { page: 'webp-me-daddy', noteId: '' };
    case 'inkmaster-studio':
      return { page: 'inkmaster-studio', noteId: '' };
    case 'sponsor-deck':
      return { page: 'sponsor-deck', noteId: '' };
    default:
      return { page: site === 'labs' ? 'labs' : DEFAULT_PAGE, noteId: '' };
  }
}

export function buildPath(page: string, noteId?: string, site: SiteKey = 'brin') {
  if (page === 'post') {
    const slug = noteId ? getNoteSlug(noteId) : '';
    return slug ? `/reviews-notes/${slug}` : STATIC_PATHS.notes;
  }

  if (site === 'labs' && isLabsPage(page)) {
    return LABS_STATIC_PATHS[page] ?? LABS_STATIC_PATHS.labs;
  }

  return STATIC_PATHS[page] ?? STATIC_PATHS.home;
}

export function getOwnerSite(page: string): SiteKey {
  return isLabsPage(page) ? 'labs' : 'brin';
}

export function buildRouteHref(page: string, noteId?: string, currentSite: SiteKey = 'brin') {
  const ownerSite = getOwnerSite(page);
  const path = buildPath(page, noteId, ownerSite);

  if (ownerSite !== currentSite) {
    return path === '/' ? `${getOrigin(ownerSite)}/` : `${getOrigin(ownerSite)}${path}`;
  }

  return path;
}

export function buildCanonicalUrl(page: string, noteId?: string, site: SiteKey = getOwnerSite(page)) {
  const path = buildPath(page, noteId, site);
  const origin = getOrigin(site);
  return path === '/' ? `${origin}/` : `${origin}${path}`;
}
