const puppeteer = require('puppeteer');

var bookName = '학교';

(async() => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(`https://www.millie.co.kr/v3/search/result/ ${bookName} ?toapp=stop&type=all`)
   
    await page
        .keyboard
        .press(String.fromCharCode(13));

    await page.pdf({path: 'test.pdf', format: 'A4'})
    await browser.close()
})();