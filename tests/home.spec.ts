import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://localhost:3000');

  await expect(page).toHaveTitle(/Hi, I'm Joe/);
});