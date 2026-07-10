import { expect, test } from '@playwright/test';

test('home renders the welcome screen', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Frontend Agent Base' })).toBeVisible();
  await expect(page.getByRole('button')).toBeVisible();
});
