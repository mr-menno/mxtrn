import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Assuming the app runs on port 3000

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Riverside/);
});
