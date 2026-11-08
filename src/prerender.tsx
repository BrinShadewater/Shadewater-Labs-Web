import { renderToStaticMarkup } from 'react-dom/server';
import { AD_NAV_MENU_MAX_WIDTH } from './components/aurora/chrome';
import ShadewaterLabs from './pages/ShadewaterLabs';
import Projects from './pages/Projects';
import Futureproof from './pages/Futureproof';
import Websites from './pages/Websites';
import Toolkit from './pages/Toolkit';
import About from './pages/About';

const pages = { labs: ShadewaterLabs, projects: Projects, futureproof: Futureproof, websites: Websites, toolkit: Toolkit, about: About };

/** Build-only rendering of the same components used by the interactive app. */
export function renderRoute(page: string) {
  const Page = pages[page as keyof typeof pages];
  if (!Page) throw new Error(`No prerender component for ${page}`);
  return renderToStaticMarkup(
    <div data-prerender-route={page} data-motion="paused" className="relative min-h-screen flex flex-col">
      <main className="flex-grow"><Page onNavigate={() => {}} /></main>
      <noscript><style>{`
        .ad-hamburger { display: none !important; }
        @media (max-width: ${AD_NAV_MENU_MAX_WIDTH}px) {
          html { --ad-nav-height: 0px; }
          .ad-nav { position: relative; }
          .ad-navLinks { display: flex !important; flex-direction: column; gap: 4px !important; }
        }
      `}</style></noscript>
    </div>,
  );
}
