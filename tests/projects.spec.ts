import { test, expect } from '@playwright/test';

test('projects page loads with projects', async ({ page }) => {
    await page.goto('/projects');
  
    await expect(page).toHaveTitle(/Joseph Carothers/);
    await expect(page.getByRole('heading', { level: 1, name: /Projects/i })).toBeVisible();
  
    const links = await page.$$('.project');
  
    expect(links.length).toBeGreaterThan(3);
  });
  
  test('project links work', async ({ page }) => {
    await page.goto('/projects/bitburner-ui');
  
    await expect(page).toHaveTitle(/Joseph Carothers/);
    await expect(page.getByRole('heading', { level: 1, name: /Bitburner Custom UI/i })).toBeVisible();
  
  });
  
