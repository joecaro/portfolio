import { test, expect } from '@playwright/test';

test('projects page loads with projects', async ({ page }) => {
    await page.goto('https://localhost:3000/projects');
  
    await expect(page).toHaveTitle(/Projects/);
  
    const links = await page.$$('.project');
  
    expect(links.length).toBeGreaterThan(3);
  });
  
  test('project links work', async ({ page }) => {
    await page.goto('https://localhost:3000/projects/bitburner-ui');
  
    await expect(page).toHaveTitle(/Bitburner Custom UI/);
  
  });
  