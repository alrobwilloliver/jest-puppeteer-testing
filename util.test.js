const puppeteer = require('puppeteer')
const { generateText, checkAndGenerate } = require('./util');

test('Should output name and age', () => {
    const test = generateText('Max', 29)
    expect(test).toBe('Max (29 years old)')
    const test2 = generateText('Anna', 19)
    expect(test2).toBe('Anna (19 years old)')
})

test('Should be data-less text', () => {
    const test = generateText(' ', null)
    expect(test).toBe('  (null years old)')
})

test('Should generate a valid text output', () => {
    const test = checkAndGenerate('Max', 29)
    expect(test).toBe('Max (29 years old)')
})

test('should create element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:5500/')
    await page.click('input#name');
    await page.type('input#name', 'Alan')
    await page.click('input#age');
    await page.type('input#age', '25');
    await page.click('#btnAddUser')
    const testFinal = await page.$eval('.user-item', el => el.textContent)
    expect(testFinal).toBe('Alan (25 years old)')
}, 10000)