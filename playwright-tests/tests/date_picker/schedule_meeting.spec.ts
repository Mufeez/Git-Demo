import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test'
import scheduleMeetingPage from './schedule_meeting_page'
import ScheduleMeetingPage from './schedule_meeting_page'

test.describe('Date Picker', async () => {
  let browser: Browser
  let context: BrowserContext
  let page: Page

  test.beforeAll(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
  })

  test('Adding Date using Fill method', async () => {
    const date = await scheduleMeetingPage.fillDate(page, '06/12/2024')
    expect(date).toEqual('06/12/2024')
    const date2 = await scheduleMeetingPage.fillDate(page, '07/12/2024')
    expect(date2).toEqual('07/12/2024')
  })

  test.only('Adding Date using UI interaction', async () => {
    await page.waitForSelector(ScheduleMeetingPage.SCHEDULED_DATE)
    const date = await scheduleMeetingPage.selectDate(page, '2024', '07', '06')
    expect(date).toEqual('06/06/2025')
  })

  test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
  })
})
