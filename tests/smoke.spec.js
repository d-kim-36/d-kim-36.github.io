const { test, expect } = require('@playwright/test');

// TC-1: 60/40 split grid is two-column on desktop
test('homepage renders two-column split layout on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  const grid = page.locator('.home-split__grid');
  await expect(grid).toBeVisible();

  const templateColumns = await grid.evaluate(
    el => window.getComputedStyle(el).gridTemplateColumns
  );
  // A two-column grid produces exactly two space-separated values, e.g. "660px 440px"
  const columns = templateColumns.trim().split(/\s+/);
  expect(columns).toHaveLength(2);
});

// TC-2: Social links with stub "#" href must not appear in the DOM
test('stub social links with href="#" are not rendered', async ({ page }) => {
  await page.goto('/');
  const stubLinks = page.locator('.hero-social a[href="#"]');
  await expect(stubLinks).toHaveCount(0);
});

// TC-3: Google Scholar link is present and has a tooltip (title attribute)
test('Google Scholar link is visible and exposes a tooltip', async ({ page }) => {
  await page.goto('/');
  const scholarLink = page.locator('.hero-social a[title="Google Scholar"]');
  await expect(scholarLink).toBeVisible();
  await expect(scholarLink).toHaveAttribute('title', 'Google Scholar');
});
