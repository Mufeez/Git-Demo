import { Page } from 'playwright-core'

class ScheduleMeetingPage {
  static SCHEDULED_DATE = '#datePicker'
  static YEAR = '.ui-datepicker-year'

  static selectDate = async (page: Page, year: string, month: string, day: string) => {
    await page.goto('https://testautomationpractice.blogspot.com')
    await page.click(ScheduleMeetingPage.SCHEDULED_DATE)
    let current_year
    let current_month

    while (!(current_year == year && current_month == month)) {
      current_year = await page.locator(ScheduleMeetingPage.YEAR).textContent()
      current_month = await page.locator('.ui-datepicker-month').textContent()

      await page.locator('[title="Next"]').click()
    }

    const days = await page.$$('[data-handler="selectDay"]')
    console.log(days)

    for (const dt of days) {
      if ((await dt.textContent()) == day) {
        await dt.click()
        break
      }
    }
    await page.keyboard.press('Enter')
    await page.waitForTimeout(5000)
    const date = await page.locator(ScheduleMeetingPage.SCHEDULED_DATE).inputValue()
    return date
  }

  static fillDate = async (page: Page, dateToBeFilled: string) => {
    await page.goto('https://testautomationpractice.blogspot.com', {
      timeout: 30000,
      waitUntil: 'networkidle'
    })
    await page.waitForSelector(ScheduleMeetingPage.SCHEDULED_DATE)
    await page.fill(ScheduleMeetingPage.SCHEDULED_DATE, dateToBeFilled)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(5000)
    const date = await page.locator(ScheduleMeetingPage.SCHEDULED_DATE).inputValue()
    return date
  }
}
export default ScheduleMeetingPage
