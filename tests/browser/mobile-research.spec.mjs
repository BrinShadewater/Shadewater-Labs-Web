import { expect, test } from '@playwright/test';

test('mobile Research jumps clear the header and copy the current citation', async ({ page, context }) => {
  await page.goto('/research');
  await expect(page.locator('[data-prerender-route]')).toHaveCount(0);

  const contents = page.getByRole('navigation', { name: 'On this page' });
  const header = page.getByRole('navigation', { name: 'Primary' });
  const destinations = [
    ['Start here', 'start-here'],
    ['Figure 1', 'figure-1'],
    ['Key terms', 'key-terms'],
    ['What would change our minds?', 'what-would-change-our-minds'],
    ['Source notes', 'source-notes'],
    ['Suggest a correction', 'suggest-a-correction'],
    ['Cite this paper', 'cite-this-paper'],
  ];
  await expect(contents.getByRole('link')).toHaveCount(destinations.length);

  for (const [label, id] of destinations) {
    await contents.getByRole('link', { name: label, exact: true }).press('Enter');
    await expect(page).toHaveURL(`/research#${id}`);
    const heading = page.locator(`#${id}`).getByRole('heading', { level: 2 });

    await expect.poll(async () => {
      const [nav, target] = await Promise.all([header.boundingBox(), heading.boundingBox()]);
      return Boolean(nav && target
        && target.y >= nav.y + nav.height
        && target.y + target.height <= page.viewportSize().height);
    }, { message: `${label} should land fully visible below the sticky header` }).toBe(true);
  }

  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy citation' }).press('Enter');
  await expect(page.getByRole('status')).toHaveText('Citation copied.');

  const citation = await page.evaluate(() => navigator.clipboard.readText());
  expect(citation).toContain('(November 9, 2026)');
  expect(citation).toContain('(Full integrated research edition)');
  expect(citation.trim().split(/\s+/).at(-1)).toBe('https://shadewaterlabs.com/research/physiological-state-and-executive-function-in-adhd-2026-11-09.pdf');
});
