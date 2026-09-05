import generated from './generated/updated.json';

type GeneratedId = keyof typeof generated;

/**
 * Last push date (America/Vancouver, ISO) for a repo the site shows a date for. The JSON
 * is written by `scripts/refresh-updated.mjs` on every build, so the home HUD's "Last
 * updated" and the card ordering come from GitHub rather than from anyone remembering to
 * bump a string. An id that is not in the JSON is a type error, not a blank on the page.
 */
export function lastPush(id: GeneratedId): string {
  return generated[id];
}
