import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, type ComponentType } from 'react';
import Seo from './components/Seo';
import type { AuroraNavigate } from './components/aurora/chrome';
import { MotionContext, useMotionPreference } from './lib/motion';
import { pageImports } from './lib/pageImports';
import { recordProjectClick } from './lib/projectClicks';
import { buildRouteHref, PAGE_HEADING_ID, parseLocation } from './lib/routes';
import { getSeoConfig } from './lib/seo';

const ShadewaterLabs = lazy(pageImports.labs);
const Projects = lazy(pageImports.projects);
const Futureproof = lazy(pageImports.futureproof);
const Websites = lazy(pageImports.websites);
const Toolkit = lazy(pageImports.toolkit);
const About = lazy(pageImports.about);
const NotFound = lazy(pageImports['not-found']);

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

function RouteHeadingFocus({ page }: { page: string }) {
  const previousPage = useRef(page);

  useLayoutEffect(() => {
    const pageChanged = previousPage.current !== page;
    previousPage.current = page;
    const hash = window.location.hash;
    const headingFragment = hash === `#${PAGE_HEADING_ID}`;
    if (!headingFragment && (!pageChanged || hash)) return;

    const heading = document.getElementById(PAGE_HEADING_ID);
    heading?.focus({ preventScroll: true });
    // React replaces the prerendered heading when opening a bookmarked skip link.
    if (headingFragment) heading?.scrollIntoView();
  }, [page]);

  return null;
}

function App({ initialPage, InitialPage }: {
  initialPage: string;
  InitialPage: ComponentType<{ onNavigate: AuroraNavigate }>;
}) {
  const motion = useMotionPreference();
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
    window.scrollTo({ top: 0, behavior: motion.paused ? 'auto' : 'smooth' });
  };

  const seo = getSeoConfig(currentPage, selectedNoteId, siteKey);

  const renderPage = () => {
    if (currentPage === initialPage) return <InitialPage onNavigate={handleNavigate} />;
    switch (currentPage) {
      case 'labs':
        return <ShadewaterLabs onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'futureproof':
        return <Futureproof onNavigate={handleNavigate} />;
      case 'websites':
        return <Websites onNavigate={handleNavigate} />;
      case 'toolkit':
        return <Toolkit onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col" data-motion={motion.paused ? 'paused' : 'running'}>
      <Seo {...seo} />
      <main
        className="flex-grow"
        onClick={event => recordProjectClick(event, currentPage)}
        onAuxClick={event => recordProjectClick(event, currentPage)}
      >
        <MotionContext.Provider value={motion}>
          <Suspense fallback={<DelayedPageFallback />}>
            {renderPage()}
            <RouteHeadingFocus page={currentPage} />
          </Suspense>
        </MotionContext.Provider>
      </main>
    </div>
  );
}

export default App;
