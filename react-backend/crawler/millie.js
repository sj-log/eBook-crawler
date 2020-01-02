const puppeteer = require('puppeteer');

module.exports = {
    millieCrawler: async function (bookName) {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage();
        await page.goto(`https://www.millie.co.kr/v3/search/result/${bookName}?toapp=stop&type=all&category=1`);

        const titlesProc = await page.evaluate(() => {
            var titles = Array.from(document.querySelectorAll(`#wrap > section > div > section.search-list > div > ul > li > a > div.body > span.title`));
            var returnTitles = titles
                .map(title => title.textContent)
                .slice(0, titles.length);

            return returnTitles;
        },)

        const urlProc = await page.evaluate(() => {
            var urls = Array.from(document.querySelectorAll(`#wrap > section > div > section.search-list > div > ul > li > a`));
            var returnUrls = urls
                .map(url => url.href)
                .slice(0, urls.length);

            return returnUrls;
        },)

        const imgProc = await page.evaluate(() => {
            var imgs = Array.from(document.querySelectorAll(`#wrap > section > div > section.search-list > div > ul > li > a > div.image.book-icon > div > img`));
            var returnImgs = imgs
                .map(img => img.src)
                .slice(0, imgs.length);

            return returnImgs;
        },)

        // proc to put all info into an array
        const bookInfo = [];
        for (var i = 0; i < imgProc.length; i++) {

            bookInfo[i] = {
                title: titlesProc[i],
                url: urlProc[i],
                img: imgProc[i]
            }

        }

        console.log(bookInfo);

        var result = bookInfo;

        return result

    }
}
