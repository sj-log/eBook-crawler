module.exports = {
    yesCrawler: async function (page, inputBookName) {
        await page.goto(`http://m.yes24.com/BookClub/Search?keyword=${inputBookName}`);

        page.on('console', msg => {
            for (let i = 0; i < msg._args.length; ++i) 
                console.log(`${i}: ${msg._args[i]}`);
            }
        )

        const titleSelector = `#ulGoodsList > li > div > div > div > a`;
        const titlesProc = await page.evaluate((titleSelector) => {
            var titles = Array.from(document.querySelectorAll(titleSelector));
            var returnTitles = titles
                .map(title => title.textContent)
                .slice(0, titles.length);

            console.log(`[YES title crawled] ${returnTitles}`);
            return returnTitles;
        }, titleSelector)

        const urlProc = await page.evaluate(() => {
            var urls = Array.from(document.querySelectorAll(`#ulGoodsList > li > div > p > span > a`));
            var returnUrls = urls
                .map(url => url.href)
                .slice(0, urls.length);

            console.log(`[YES url crawled] ${returnUrls}`);
            return returnUrls;
        },)

        await page.evaluate(async() => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 50);
            })
        });
        const imgProc = await page.evaluate(() => {
            var imgs = Array.from(document.querySelectorAll(`#ulGoodsList > li > div > p > span > a > img`));
            var returnImgs = imgs
                .map(img => img.src)
                .slice(0, imgs.length);

            console.log(`[YES img crawled] ${returnImgs}`);
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
