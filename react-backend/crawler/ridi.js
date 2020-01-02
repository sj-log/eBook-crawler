const puppeteer = require('puppeteer');

module.exports = {

    ridiCrawler: async function (bookName, browser) {
        // const browser = await puppeteer.launch({headless: true})
        
        console.log(-3.1);
        const page = await browser.newPage();
        await page.on("console",msg=>{
            `[LOG]`, msg.text();
        })
        console.log(-3);

        // const page = await browser.newPage();
        console.log(-2);

        await page.goto(`https://select.ridibooks.com/search?q=${bookName}&type=Books`);
        console.log(-1);
       
        const titlesProc = await page.evaluateHandle(() => {
            console.log(`1`);
            var titles = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Title`));
            console.log(`2`);
            var resultTitleProc = titles
                .map(title => title.textContent)
                .slice(0, titles.length);
            console.log(`3`);

            console.log(`[ridi title]${resultTitleProc} `)

            return resultTitleProc;
        },).catch(rej => {throw rej});
        // .then(res=>console.log(res)).catch(rej=>{throw rej})
       
        console.log(4);

        const writerProc = await page.evaluate(() => {
            var writers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Authors`));
            var writerProcResult = writers
                .map(writer => writer.textContent)
                .slice(0, writers.length);

            console.log(`[ridi writer]${writerProcResult} `)

            return writerProcResult;
        },)

        const publisherProc = await page.evaluate(() => {
            var publishers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Publisher`));
            var resultPublisherProc = publishers
                .map(publisher => publisher.textContent)
                .slice(0, publishers.length);

            console.log(`[ridi pub]${resultPublisherProc} `)

            return resultPublisherProc;
        },)

        const imgProc = await page.evaluate(() => {
            var imgs = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > div > a > div > img`));
            var resultImgProc = imgs
                .map(img => img.src)
                .slice(0, imgs.length);

            console.log(`[ridi img]${resultImgProc} `)
            return resultImgProc;
        },)

        // proc to put all info into an array
        const ridiBookInfo = [];
        for (var i = 0; i < titlesProc.length; i++) {

            ridiBookInfo[i] = {
                title: titlesProc[i],
                writer: writerProc[i],
                publisher: publisherProc[i],
                img: imgProc[i]

            }

        }

        console.log(`[Ridi] ${ridiBookInfo}`);

        return ridiBookInfo

    }
}