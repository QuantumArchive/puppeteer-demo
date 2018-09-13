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
      slowMo: 1000,
      defaultViewPort: viewPortDimensions,
      dumpio: true,
      env: {},
      devtools: true
    })
  }, timeout)

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('https://www.nike.com/us/en_us/')
    await page.waitForSelector('.nsg-glyph--swoosh', timeoutOption)
  }, timeout)

  afterEach(async () => {
    await page.close()
  }, timeout)

  afterAll(() => {
    browser.close()
  }, timeout)

  test('clicks on the cart item which goes to new page', async () => {

  }, timeout)

  // test('enters swoosh into search and goes to search page', async () => {
  //   assert.ok(true)
  // }, timeout)

  // test('hover on men in nav bar and selects new releases and goes to new page', async () => {
  //   assert.ok(true)
  // }, timeout)
})
