import type { MouseEvent } from 'react';
import { buildPath, isLabsPage, LABS_ORIGIN } from './routes';

export function recordProjectClick(event: MouseEvent, page: string) {
  if (event.defaultPrevented || (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)) return;
  const link = event.target instanceof Element ? event.target.closest('a[data-project-click]') : null;
  const action = link?.getAttribute('data-project-click');
  if (action) recordAnalytics(action, page);
}

export function recordChatgptVisit(page: string) {
  if (window.location.origin !== LABS_ORIGIN || !isLabsPage(page)) return;
  if (new URLSearchParams(window.location.search).get('utm_source') !== 'chatgpt.com') return;
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (navigation && navigation.type !== 'navigate') return;
  recordAnalytics('chatgpt-visit', page);
}

function recordAnalytics(action: string, page: string) {
  if (!import.meta.env.PROD) return;
  // Keep the request alive when the link navigates away from this page.
  void fetch('/api/project-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, sourcePage: buildPath(page) }),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
  }).catch(() => {});
}
