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
      slowMo: 100,
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
    const cartGlyphNode = await page.$('.nsg-glyph--cart')
    await cartGlyphNode.click()
    await page.waitForSelector('[id="ch4_summaryContent"]')
    const cartUrl = page.url()
    assert.ok(cartUrl.includes('cart'))
  }, timeout)

  test('enters swoosh into search and goes to search page', async () => {
    const searchInput = await page.$('input#search')
    await searchInput.type('swoosh')
    await searchInput.press('Enter')
    await page.waitForSelector('.exp-gridwall-content-wrapper')
    const searchResultsUrl = page.url()
    assert.ok(searchResultsUrl.includes('swoosh'))
  }, timeout)

  // test('hover on men in nav bar and selects new releases and goes to new page', async () => {
  //   assert.ok(true)
  // }, timeout)
})
