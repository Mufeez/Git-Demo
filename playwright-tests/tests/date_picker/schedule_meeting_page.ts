import { Page } from 'playwright-core';

class ScheduleMeetingPage {
    static SCHEDULED_DATE = '#datePicker';

    static selectDate = async (
        page: Page,
        year: string,
        month: string,
        day: string
    ) => {
        await page.goto('https://testautomationpractice.blogspot.com');
        await page.click('#datepicker');
        while (true) {
            const current_year = await page
                .locator('.ui-datepicker-year')
                .textContent();
            const current_month = await page
                .locator('.ui-datepicker-month')
                .textContent();
            if (current_year == year && current_month == month) {
                break;
            }
            await page.locator('[title="Next"]').click();
        }

        const days = await page.$$('[data-handler="selectDay"]');
        console.log(days);

        for (const dt of days) {
            if ((await dt.textContent()) == day) {
                await dt.click();
                break;
            }
        }
        // await page.click(`//a[@class='.ui-state-default']['text()="${date}"']`);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        const date = await page.locator('#datepicker').inputValue();
        return date;
    };

    static fillDate = async (page: Page, dateToBeFilled: string) => {
        await page.goto('https://testautomationpractice.blogspot.com', {
            timeout: 30000,
            waitUntil: 'networkidle',
        });
        await page.waitForSelector(ScheduleMeetingPage.SCHEDULED_DATE);
        await page.fill(ScheduleMeetingPage.SCHEDULED_DATE, dateToBeFilled);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        const date = await page
            .locator(ScheduleMeetingPage.SCHEDULED_DATE)
            .inputValue();
        return date;
    };
}
export default ScheduleMeetingPage;
