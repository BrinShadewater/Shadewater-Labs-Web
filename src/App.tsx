import { Suspense, lazy, useEffect, useState } from 'react';
import Seo from './components/Seo';
import { buildRouteHref, parseLocation } from './lib/routes';
import { getSeoConfig } from './lib/seo';

// Keep the import factories so the same chunks can be both lazy-rendered and
// prefetched on idle. Warming these after first paint means page switches
// resolve synchronously, so the Suspense fallback almost never appears.
const pageImports = {
  labs: () => import('./pages/ShadewaterLabs'),
  projects: () => import('./pages/Projects'),
  websites: () => import('./pages/Websites'),
  techNews: () => import('./pages/TechNews'),
  about: () => import('./pages/About'),
};

const ShadewaterLabs = lazy(pageImports.labs);
const Projects = lazy(pageImports.projects);
const Websites = lazy(pageImports.websites);
const TechNews = lazy(pageImports.techNews);
const About = lazy(pageImports.about);

// Subtle, on-theme fallback that only appears if a chunk genuinely takes a
// moment to load — avoids flashing a loader on fast navigations.
function DelayedPageFallback() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[hsl(220_20%_13%/0.72)] px-5 py-3 text-xs uppercase tracking-[0.3em] text-[hsl(186_38%_72%)] shadow-[0_12px_30px_hsl(210_66%_3%/0.24)]">
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[hsl(186_40%_60%/0.3)] border-t-[hsl(186_60%_70%)]"
        />
        Loading
      </div>
    </div>
  );
}

function getRouteState() {
  const { page, noteId } = parseLocation(window.location.pathname, window.location.hash);
  return {
    currentPage: page,
    selectedNoteId: noteId,
  };
}

function App() {
  const siteKey = 'labs';
  const [{ currentPage, selectedNoteId }, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const syncFromLocation = () => {
      const nextState = getRouteState();
      const canonicalPath = buildRouteHref(nextState.currentPage, nextState.selectedNoteId, siteKey);
      const canonicalUrl = new URL(canonicalPath, window.location.origin);

      if (window.location.hash.startsWith('#/')) {
        if (canonicalUrl.origin === window.location.origin) {
          window.history.replaceState({}, '', canonicalUrl.pathname);
        } else {
          window.location.replace(canonicalUrl.href);
          return;
        }
      }

      setRouteState(nextState);
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, [siteKey]);

  // Warm the other page chunks once the browser is idle so switching pages
  // resolves without suspending (no "Loading" flash on navigation).
  useEffect(() => {
    const warm = () => {
      for (const load of Object.values(pageImports)) {
        load().catch(() => {
          /* prefetch is best-effort; ignore network/chunk errors */
        });
      }
    };

    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const handle = win.requestIdleCallback(warm, { timeout: 2500 });
      return () => win.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNavigate = (page: string, noteId?: string) => {
    const nextHref = buildRouteHref(page, noteId, siteKey);
    const nextUrl = new URL(nextHref, window.location.origin);

    if (nextUrl.origin !== window.location.origin) {
      window.location.href = nextUrl.href;
      return;
    }

    setRouteState({
      currentPage: page,
      selectedNoteId: noteId ?? '',
    });
    if (`${window.location.pathname}${window.location.search}` !== nextUrl.pathname) {
      window.history.pushState({}, '', nextUrl.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seo = getSeoConfig(currentPage, selectedNoteId, siteKey);

  const renderPage = () => {
    switch (currentPage) {
      case 'labs':
        return <ShadewaterLabs onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'websites':
        return <Websites onNavigate={handleNavigate} />;
      case 'tech-news':
        return <TechNews onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return <ShadewaterLabs onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Seo {...seo} />
      <main className="flex-grow">
        <Suspense fallback={<DelayedPageFallback />}>
          {renderPage()}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
