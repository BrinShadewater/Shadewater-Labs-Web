import type { MouseEvent } from 'react';
import { buildPath } from './routes';

export function recordProjectClick(event: MouseEvent, page: string) {
  if (event.defaultPrevented || (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)) return;
  const link = event.target instanceof Element ? event.target.closest('a[data-project-click]') : null;
  const action = link?.getAttribute('data-project-click');
  if (!action || !import.meta.env.PROD) return;

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
