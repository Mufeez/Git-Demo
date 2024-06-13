import { test, expect, Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { TIMEOUT } from "dns";

test.describe('Date Picker', async () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
  
  
  
    test.beforeAll(async () => {
  
      browser = await chromium.launch();
      context = await browser.newContext();
      page = await context.newPage();
  
    });

    test('Adding Date using Fill method', async () => {
        await page.goto('https://testautomationpractice.blogspot.com',{timeout:30000, waitUntil:"networkidle"});
        await page.waitForSelector('#datepicker');
        await page.fill('#datepicker','06/12/2024');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        const date = await page.locator('#datepicker').inputValue();
        expect(date).toEqual('06/12/2024');

    });

    test.only('Adding Date using UI interaction', async () => {
      await page.goto('https://testautomationpractice.blogspot.com');
      const year = "2025";
      const month = "June";
      const day = "6";

      await page.click('#datepicker')
      while(true){
        const current_year = await page.locator('.ui-datepicker-year').textContent()
        const current_month = await page.locator('.ui-datepicker-month').textContent()
        if(current_year == year && current_month == month){
          break
        }
        await page.locator('[title="Next"]').click()
        
      }

      const days = await page.$$('[data-handler="selectDay"]')
      console.log(days);

      for(const dt of days){
        if(await dt.textContent() == day){
          await dt.click();
          break;          
        }
      }
      // await page.click(`//a[@class='.ui-state-default']['text()="${date}"']`);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(5000);
      const date = await page.locator('#datepicker').inputValue();
      expect(date).toEqual('06/06/2025');

      

  });

    // test.only('3rd way', async () => {
    //     await page.goto('https://mui.com/x/react-date-pickers/date-picker');
    //     await page.click('[data-testid="CalendarIcon"]');
    //     await page.click('[data-testid="ArrowDropDownIcon"]')
        
    //     await page.waitForTimeout(5000);

    // });


    test.afterAll(async() => {
        await page.close();
        await context.close()
        await browser.close()
      });

})
