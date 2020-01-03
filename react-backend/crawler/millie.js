
module.exports = {
    millieCrawler: async function (page, inputBookName) {
        // const page = await browser.newPage();
        await page.goto(`https://www.millie.co.kr/v3/search/result/${inputBookName}?toapp=stop&type=all&category=1`,{waitUntil : 'networkidle2'});
   
        page.on('console', msg => {
            for (let i = 0; i < msg._args.length; ++i) 
                console.log(`${i}: ${msg._args[i]}`);
            }
        )
        //page is working but, evaluate function doesn't involved.
        const titleSelector = `#wrap > section > div > section.search-list > div > ul > li > a > div.body > span.title`;
        // await page.waitForSelector(titleSelector);
        const titlesProc = await page.evaluate((titleSelector) => {
            var titles = Array.from(document.querySelectorAll(titleSelector));
            var returnTitles = titles
                .map(title => title.textContent)
                .slice(0, titles.length);

                console.log(`[Mili title crawled] ${returnTitles}`);
            return returnTitles;
        },titleSelector)



        const writerProc = await page.evaluate(() => {
            var writers = Array.from(document.querySelectorAll("#wrap > section > div > section.search-list > div > ul > li> a > div.body > div " +
                    "> span"));
            var returnWriters = writers
                .map(writer => writer.textContent.substr(0,15))
                .slice(0, writers.length);

                console.log(`[Mili Writer crawled] ${returnWriters}`);
            return returnWriters;
        },)

        const urlProc = await page.evaluate(() => {
            var urls = Array.from(document.querySelectorAll(`#wrap > section > div > section.search-list > div > ul > li > a`));
            var returnUrls = urls
                .map(url => url.href)
                .slice(0, urls.length);

                console.log(`[Mili url crawled] ${returnUrls}`);
            return returnUrls;
        },)

        const imgProc = await page.evaluate(() => {
            var imgs = Array.from(document.querySelectorAll(`#wrap > section > div > section.search-list > div > ul > li > a > div.image.book-icon > div > img`));
            var returnImgs = imgs
                .map(img => img.src)
                .slice(0, imgs.length);

                console.log(`[Mili img crawled] ${returnImgs}`);
            return returnImgs;
        },)
 
        // proc to put all info into an array
        console.log(`[Milie ] put into Array!`)
        const millieBookInfo = [];
        for (var i = 0; i < titlesProc.length; i++) {

            millieBookInfo[i] = {
                title: titlesProc[i],
                writer: writerProc[i],
                url: urlProc[i],
                img: imgProc[i]
            }
            
        }

        console.log(`[Millie] ${millieBookInfo}`);

        return millieBookInfo;

    }
}
