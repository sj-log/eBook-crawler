const puppeteer = require('puppeteer');

module.exports = {
    millieCrawler: async function (bookName) {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage();
        await page.goto(`https://www.millie.co.kr/v3/search/result/${bookName}?toapp=stop&type=all`);

        var selector = `span.title`;
        const titlesSelect = await page.evaluate((selector) => {
            var titles = Array.from(document.querySelectorAll(selector));
            return titles
                .map(title => title.textContent)
                .slice(0, titles.length);
        }, selector)

        var result = titlesSelect
        console.log(`${result} in millie.js`)
        return result

    }
}