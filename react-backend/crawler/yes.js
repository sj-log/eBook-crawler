module.exports = {
    
    yesCrawler: async function (page, inputBookName) {
      
        await page.goto(`http://m.yes24.com/BookClub/Search?keyword=${inputBookName}`);
        


        const titleSelector = `#ulGoodsList > li > div > div > div > a`;
        const titlesProc = await page.evaluate((titleSelector) => {
            var titles = Array.from(document.querySelectorAll(titleSelector));
            var returnTitles = titles
                .map(title => title.textContent)
                .slice(0, 3);

            return returnTitles;
        }, titleSelector)

        const urlProc = await page.evaluate(() => {
            var urls = Array.from(document.querySelectorAll(`#ulGoodsList > li > div > p > span > a`));
            var returnUrls = urls
                .map(url => url.href)
                .slice(0, 3);

            return returnUrls;
        },)

        const imgProc = await page.evaluate(() => {
            var imgs = Array.from(document.querySelectorAll(`#ulGoodsList > li > div > p > span > a > img`));
            var returnImgs = imgs
                .map(img => img.src)
                .slice(0, 3);

            return returnImgs;
        },)

        // proc to put all info into an array
        console.log(`[YES ] put into Array!`)
        const yesBookInfo = [];
        for (var i = 0; i < titlesProc.length; i++) {

            yesBookInfo[i] = {
                title: titlesProc[i],
                url: urlProc[i],
                img: imgProc[i]
            }

        }

        console.log(`[YES] ${yesBookInfo}`);

        return yesBookInfo;

    }
}
