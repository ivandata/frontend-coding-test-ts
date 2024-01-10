import { test, expect } from '@playwright/test'

test.describe('Game Page Tests', () => {
  test('should load the dialog window with initial input', async ({ page }) => {
    await page.goto('http://localhost:5173/pexeso') // Replace with your game page URL
    const dialogWindow = await page
      .getByRole('dialog')
      .locator('div')
      .filter({ hasText: 'Welcome to the Pexeso board!' })
    await expect(dialogWindow).toBeVisible()

    await page.getByPlaceholder('Enter initials').fill('12345')
    await page.getByLabel('Save initials').click()

    const initials = await page.locator('.game').getByText('12345')
    await expect(initials).toBeVisible()
  })
})
