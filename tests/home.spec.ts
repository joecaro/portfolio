import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Joseph Carothers/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/production AI systems/i);
});
