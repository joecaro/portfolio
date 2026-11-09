import { test, expect } from '@playwright/test';

test('case study leads with a visual and keeps optional sections independent', async ({ page }) => {
  await page.goto('/projects/fortune-100-voice-ai');
  const visual = page.locator('[data-case-visual]');
  await expect(visual).toBeVisible();
  expect((await visual.boundingBox())!.y).toBeLessThan(page.viewportSize()!.height);
  const walkthrough = page.locator('details#product-demo');
  const notes = page.locator('details#case-study');
  await expect(walkthrough).not.toHaveAttribute('open', '');
  await expect(notes).not.toHaveAttribute('open', '');
  await expect(page.getByRole('button', { name: 'Play call', exact: true })).toHaveCount(0);

  await walkthrough.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Play call', exact: true })).toBeVisible();
  await notes.locator('summary').focus();
  await page.keyboard.press('Space');
  await expect(notes).toHaveAttribute('open', '');
  await expect(walkthrough).toHaveAttribute('open', '');
  await expect(page.getByRole('heading', { name: 'The integration', exact: true })).toBeVisible();

  await walkthrough.locator('summary').click();
  await expect(page.getByRole('button', { name: 'Play call', exact: true })).toHaveCount(0);
  await expect(notes).toHaveAttribute('open', '');
  await walkthrough.locator('summary').click();
  await expect(page.getByRole('button', { name: 'Play call', exact: true })).toBeVisible();
});

test('technical heading deep links reveal the notes', async ({ page }) => {
  await page.goto('/projects/fortune-100-voice-ai#making-a-timeout-reproducible');
  await expect(page.locator('details#case-study')).toHaveAttribute('open', '');
  await expect(page.getByRole('heading', { name: 'Making a timeout reproducible', exact: true })).toBeInViewport();
  await expect(page.locator('details#product-demo')).not.toHaveAttribute('open', '');
});

test('phone opening shows the visual without a horizontally scrolling dashboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/projects/voice-ai-platform');
  const visual = page.locator('[data-case-visual]');
  expect((await visual.boundingBox())!.y).toBeLessThan(844);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(visual.getByRole('link')).toHaveCount(4);
  await expect(page.locator('details#product-demo')).not.toHaveAttribute('open', '');
});

test('bank walkthrough shows the call and keeps the agent unavailable until the ready event', async ({ page }) => {
  await page.goto('/projects/fortune-100-voice-ai');
  await page.locator('details#product-demo > summary').click();
  const console = page.getByRole('region', { name: 'Fictional live agents console' });
  const next = console.getByRole('button', { name: 'Next event' });

  await next.click();
  await expect(console.getByRole('button', { name: 'Agent 01 On call' })).toBeVisible();
  await expect(console.getByText('Hi. Is now a good time to talk about your account?')).toBeVisible();
  await console.getByRole('button', { name: 'Agent 02 Ready' }).click();
  await expect(console.getByRole('heading', { name: 'Agent 02 details' })).toBeVisible();
  await console.getByRole('button', { name: 'Agent 01 On call' }).click();

  for (let i = 0; i < 5; i++) await next.click();
  await expect(console.getByRole('button', { name: 'Agent 01 Wrap-up' })).toBeVisible();
  await next.click();
  await expect(console.getByRole('button', { name: 'Agent 01 Ready' })).toBeVisible();
  await expect(console.getByText('Matching ready event received. Agent can take another call.')).toBeVisible();
});
