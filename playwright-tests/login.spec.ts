import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test'
import { generateToken } from 'authenticator'

test.describe('Labra platform flows', async () => {
  let browser: Browser
  let context: BrowserContext
  let page: Page

  test.beforeAll(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
  })

  test('login to labra', async () => {
    const headingPostLogin = 'Product listings'
    try {
      await page.goto('https://app.labra.io')
      await page.waitForSelector('input[type="email"]', { timeout: 90000 })
      await page.type('input[type="email"]', process.env.USERNAME as string, { timeout: 90000 })
      await page.waitForSelector('input#signinpassword', { timeout: 90000 })
      await page.type('input#signinpassword', process.env.PASSWORD as string, { timeout: 90000 })
      await page.waitForSelector('#signin', { timeout: 90000 })
      await page.click('#signin')
      const otp = await generateToken(process.env.SECRET_KEY as string)
      await page.waitForSelector('#code', { timeout: 90000 })
      await page.type('#code', otp, { delay: 50 })
      await page.waitForSelector('button[data-action-button-primary="true"]', { timeout: 90000 })
      await page.click('button[data-action-button-primary="true"]')
      await page.waitForSelector('[data-testid="heading"]', { timeout: 120000 })
      const headingText = await page.textContent('[data-testid="heading"]')
      expect(headingText).toEqual(headingPostLogin)
    } catch (error) {
      console.log('Login failed error reason - ' + error.message)
      console.log('Login failed error stacktrace - ' + error.stacktrace)
    } finally {
      await page.close()
      await context.close()
      await browser.close()
    }
  })

  test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
  })
})
