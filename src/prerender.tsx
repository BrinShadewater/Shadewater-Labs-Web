import { renderToStaticMarkup } from 'react-dom/server';
import ShadewaterLabs from './pages/ShadewaterLabs';
import Projects from './pages/Projects';
import Websites from './pages/Websites';
import Toolkit from './pages/Toolkit';
import About from './pages/About';

const pages = { labs: ShadewaterLabs, projects: Projects, websites: Websites, toolkit: Toolkit, about: About };

/** Build-only rendering of the same components used by the interactive app. */
export function renderRoute(page: string) {
  const Page = pages[page as keyof typeof pages];
  if (!Page) throw new Error(`No prerender component for ${page}`);
  return renderToStaticMarkup(
    <div data-prerender-route={page} className="relative min-h-screen flex flex-col">
      <main className="flex-grow"><Page onNavigate={() => {}} /></main>
      <noscript><style>{`
        .ad-hamburger { display: none !important; }
        @media (max-width: 768px) {
          .ad-navLinks { display: flex !important; flex-direction: column; gap: 4px !important; }
        }
      `}</style></noscript>
    </div>,
  );
}
