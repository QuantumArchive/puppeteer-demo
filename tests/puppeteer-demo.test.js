const puppeteer = require('puppeteer')
const assert = require('assert')

const viewPortDimensions = { width: 1024, height: 768 }
const timeout = 15000
const timeoutOption = { timeout }

describe('application loads correctly', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 5000,
      defaultViewPort: viewPortDimensions,
      dumpio: true,
      env: {},
      devtools: true
    })
  }, timeout)

  const getNewlyOpenedPage = (browser) => new Promise(
    resolve => browser.once(
      'targetcreated',
      target => resolve(target.page())
    )
  )

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('https://www.google.com')
    await page.waitForSelector('h1', timeoutOption)
  }, timeout)

  afterEach(async () => {
    await page.close()
  }, timeout)

  afterAll(() => {
    browser.close()
  }, timeout)

  test('goes to google.com', async () => {

  }, timeout)
})
