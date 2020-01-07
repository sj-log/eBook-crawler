module.exports = {
    millieCrawler: async function (page, inputBookName) {

       
        await page.goto(`https://www.millie.co.kr/v3/search/result/${inputBookName}?toapp=stop&type=all&category=1`, {waitUntil: 'load'});
        const titlesProc = await page.$$eval(`span.title`, e => e.map((t) => t.textContent));
    
        const writerProc = await page.$$eval(`#wrap > section > div > section.search-list > div > ul > li> a > div.body > div`, e => e.map((t) => t.textContent));
        const urlProc = await page.$$eval(`#wrap > section > div > section.search-list > div > ul > li > a`, e => e.map(a => a.href));
        const imgProc = await page.$$eval(`#wrap > section > div > section.search-list > div > ul > li > a > div.image.book-icon > div > img`, e => e.map(i => i.src));

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

    },
    ridiCrawler: async function (page, inputBookName) {

        await page.goto(`https://select.ridibooks.com/search?q=${inputBookName}&type=Books`,{waitUntil: "networkidle2"});
        const titlesProc = await page.$$eval(`#app > main > ul > li > div > div > a > h3`, e => e.map((t) => t.textContent));
        const writerProc = await page.$$eval(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Authors`, e => e.map((t) => t.textContent))
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
                }, 35);
            });
        });
        const imgProc = await page.$$eval(`#app > main > ul > li > div > div > div > a > div > img`, e => e.map(i => i.src));

        const ridiBookInfo = [];
        for (var i = 0; i < titlesProc.length; i++) {

            ridiBookInfo[i] = {
                title: titlesProc[i],
                writer: writerProc[i],
                img: imgProc[i]

            }

        }
        console.log(`[ridiBookInfo] ${ridiBookInfo}`);
        return ridiBookInfo

    },
    yesCrawler: async function (page, inputBookName) {

        await page.goto(`http://m.yes24.com/BookClub/Search?keyword=${inputBookName}`, {waitUntil: "networkidle2"});
        const titlesProc = await page.$$eval(`#ulGoodsList > li > div > div > div > a`, e => e.map(t => t.textContent));
        const urlProc = await page.$$eval(`#ulGoodsList > li > div > p > span > a`, e => e.map(a => a.href));
        await page.evaluate(async() => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 200;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 35);
            });
        });
        const imgProc = await page.$$eval(`#ulGoodsList > li > div > p > span > a > img`, e => e.map(i => i.src));
        // proc to put all info into an array
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
