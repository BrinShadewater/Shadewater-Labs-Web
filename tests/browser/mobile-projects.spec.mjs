import { expect, test } from '@playwright/test';

test('mobile keyboard shortcut opens the tools and restores the Games filter', async ({ page }) => {
  await page.route('**/api/project-click', route => route.fulfill({ status: 204 }));
  await page.goto('/');
  await expect(page.locator('[data-prerender-route]')).toHaveCount(0);

  const shortcut = page.getByRole('link', { name: /Browse open-source tools/ });
  await page.getByRole('link', { name: 'Play BrineSpace', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(shortcut).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects#open-source-tools');

  const tools = page.getByRole('region', { name: 'Open-source tools' });
  const filters = tools.getByRole('group', { name: 'Filter open-source tools' });
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(tools).toBeFocused();
  await expect.poll(async () => {
    const header = await nav.boundingBox();
    const group = await filters.boundingBox();
    return Boolean(header && group
      && group.y >= header.y + header.height
      && group.y + group.height <= page.viewportSize().height);
  }, { message: 'Filters should land fully visible below the sticky header' }).toBe(true);

  const games = filters.getByRole('button', { name: 'games', exact: true });
  const seo = filters.getByRole('button', { name: 'seo', exact: true });
  const gameCard = tools.getByRole('heading', { name: 'Shadewater Game Asset Pipeline' });
  const seoCard = tools.getByRole('heading', { name: 'Shadewater SEO Skill' });
  const expectGames = async () => {
    await expect(page).toHaveURL('/projects?category=games#open-source-tools');
    await expect(games).toHaveAttribute('aria-pressed', 'true');
    await expect(gameCard).toBeVisible();
    await expect(seoCard).toHaveCount(0);
  };

  await games.press('Enter');
  await expectGames();
  await page.reload();
  await expectGames();

  await seo.press('Enter');
  await expect(page).toHaveURL('/projects?category=seo#open-source-tools');
  await expect(seo).toHaveAttribute('aria-pressed', 'true');
  await page.goBack();
  await expectGames();
});
