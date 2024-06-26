import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test'

test.describe('File Uploading', async () => {
  let browser: Browser
  let context: BrowserContext
  let page: Page

  test.beforeAll(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
  })

  test('single file upload', async () => {
    await page.goto('https://commitquality.com/practice-file-upload')
    const handle = page.locator('input[type="file"]')
    await handle.setInputFiles('D:/Ibexlabs/Automation/Demo/KT/Git-Demo/package.json')

    // await page.pause();
    await page.waitForSelector('[data-testid="file-input"]')
    const filename = await page.inputValue('[data-testid="file-input"]')
    expect(filename).toContain('package.json')

    page.once('dialog', (dialog) => {
      console.log(dialog.message())
      dialog.accept()
    })
    await page.getByText('submit').click()
    // await page.locator('input[name="filesToUpload"]').setInputFiles("playwright-tests\files\basic.txt")
    // await page.pause();
  })

  test.only('Multiple file upload', async () => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    await page
      .locator('input[type="file"]')
      .setInputFiles(['D:/Ibexlabs/Automation/Demo/KT/Git-Demo/package.json', 'D:/Ibexlabs/Automation/Demo/KT/Git-Demo/playwright-tests/files/basic.txt'])
    // await page.pause();
    await page.locator('#fileList')
    const files = await page.locator('ul#fileList >li')
    await expect(files).toHaveText(['package.json', 'basic.txt'])
    // await page.waitForSelector('[data-testid="file-input"]');
    // const filename= await page.inputValue('[data-testid="file-input"]');
    // expect(filename).toContain('package.json');
  })

  test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
  })
})
