import { Suspense, lazy, useEffect, useState } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';
import { buildRouteHref, parseLocation } from './lib/routes';
import { getSeoConfig } from './lib/seo';

const ShadewaterLabs = lazy(() => import('./pages/ShadewaterLabs'));
const Projects = lazy(() => import('./pages/Projects'));
const Websites = lazy(() => import('./pages/Websites'));
const TechNews = lazy(() => import('./pages/TechNews'));
const ShadewaterSeoReport = lazy(() => import('./pages/ShadewaterSeoReport'));
const WebpMeDaddy = lazy(() => import('./pages/WebpMeDaddy'));
const InkMasterStudio = lazy(() => import('./pages/InkMasterStudio'));

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
  const [showBackgroundParticles, setShowBackgroundParticles] = useState(false);

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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (window.matchMedia('(max-width: 767px)').matches) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowBackgroundParticles(true);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
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

  // The Aurora Drift redesign owns its own ticker, navbar, and footer so the
  // futurized chrome stays consistent across every page in the bundle.
  // Suppress the legacy shared chrome on every route the redesign covers.
  const AURORA_ROUTES = new Set([
    'labs',
    'projects',
    'websites',
    'tech-news',
    'shadewater-seo-report',
    'webp-me-daddy',
    'inkmaster-studio',
  ]);
  const useAuroraChrome = AURORA_ROUTES.has(currentPage);

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
      case 'shadewater-seo-report':
        return <ShadewaterSeoReport onNavigate={handleNavigate} />;
      case 'webp-me-daddy':
        return <WebpMeDaddy onNavigate={handleNavigate} />;
      case 'inkmaster-studio':
        return <InkMasterStudio onNavigate={handleNavigate} />;
      default:
        return <ShadewaterLabs onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <Seo {...seo} />
      {showBackgroundParticles && !useAuroraChrome ? (
        <BackgroundParticles key={`${currentPage}:${selectedNoteId || 'root'}`} />
      ) : null}
      <div className="relative z-10 flex min-h-screen flex-col">
        {useAuroraChrome ? null : <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
                <div className="rounded-[1.75rem] border border-white/10 bg-[hsl(220_20%_13%/0.86)] px-6 py-5 text-sm uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/80 shadow-[0_12px_30px_hsl(210_66%_3%/0.24)]">
                  Loading page
                </div>
              </div>
            }
          >
            {renderPage()}
          </Suspense>
        </main>
        {useAuroraChrome ? null : <Footer />}
      </div>
    </div>
  );
}

export default App;
