import { expect, test } from '@playwright/test';

test('mobile menu restores keyboard focus and marks Projects as current', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-prerender-route]')).toHaveCount(0);

  const nav = page.getByRole('navigation', { name: 'Primary' });
  const menu = nav.getByRole('button', { name: /^(Open|Close) menu$/ });
  const labs = nav.getByRole('link', { name: 'Labs', exact: true });
  const projects = nav.getByRole('link', { name: 'Projects', exact: true });

  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(projects).toBeHidden();
  await nav.getByRole('link', { name: /shadewaterlabs\.com/i }).focus();
  await page.keyboard.press('Tab');
  await expect(menu).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(labs).toHaveAttribute('aria-current', 'page');

  await page.keyboard.press('Tab');
  await expect(labs).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(projects).toBeHidden();
  await expect(menu).toBeFocused();

  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(projects).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(projects).toBeHidden();

  await menu.press('Enter');
  await expect(projects).toHaveAttribute('aria-current', 'page');
  await expect(labs).not.toHaveAttribute('aria-current', 'page');
});
