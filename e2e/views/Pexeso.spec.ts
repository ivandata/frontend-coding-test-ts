import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const baseUrl = process.env.HOSTNAME as string

test.describe('Game Page Tests', () => {
  test('should load the dialog window with initial input', async ({ page }) => {
    await page.goto(`${baseUrl}/pexeso`)
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

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/pexeso`)

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.game')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
