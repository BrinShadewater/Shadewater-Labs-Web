import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './pages/BrineSpace.css'
import App from './App.tsx'
import { pageImports } from './lib/pageImports'
import { parseLocation } from './lib/routes'

async function mount() {
  const { page } = parseLocation(window.location.pathname);
  const loadPage = pageImports[page as keyof typeof pageImports] ?? pageImports['not-found'];
  // Keep the prerendered page usable while its interactive module downloads.
  const { default: Page } = await loadPage();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App initialPage={page} InitialPage={Page} />
    </StrictMode>,
  );
}

void mount().catch(error => console.error('Unable to start Shadewater Labs', error));
