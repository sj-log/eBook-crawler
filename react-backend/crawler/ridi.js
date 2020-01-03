module.exports = {

    ridiCrawler: async function (page, inputBookName) {

        await page.goto(`https://select.ridibooks.com/search?q=${inputBookName}&type=Books`);

        console.log(`1`);

        page.on('console', msg => {
            for (let i = 0; i < msg._args.length; ++i) 
                console.log(`${i}: ${msg._args[i]}`);
            }
        )

        console.log(0);

        const titleSelector = `#app > main > ul > li > div > div > a > h3`;
        const titlesProc = await page.evaluate((titleSelector) => {
            var titles = Array.from(document.querySelectorAll(titleSelector));
            console.log(2);

            var resultTitleProc = titles
                .map(title => title.textContent)
                .slice(0, titles.length);
            console.log(3);

            console.log(`[Ridi title crawled] ${resultTitleProc}`);

            return resultTitleProc;
        }, titleSelector)

        console.log(4);

        const writerProc = await page.evaluate(() => {
            var writers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Authors`));
            var writerProcResult = writers
                .map(writer => writer.textContent)
                .slice(0, writers.length);

            console.log(`[Ridi writer crawled] ${writerProcResult}`);

            return writerProcResult;
        },)

        console.log(5);
        const publisherProc = await page.evaluate(() => {
            var publishers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Publisher`));
            var resultPublisherProc = publishers
                .map(publisher => publisher.textContent)
                .slice(0, publishers.length);

            console.log(`[Ridi PUBLISHERS] ${resultPublisherProc} `)

            return resultPublisherProc;
        },)

        // scrolling
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
        })

        const imgSelector = `#app > main > ul > li > div > div > div > a > div > img`;
        const imgProc = await page.evaluate((imgSelector) => {
            var imgs = Array.from(document.querySelectorAll(imgSelector));
            var resultImgProc = imgs
                .map(img => img.src)
                .slice(0, imgs.length);

            console.log(`[RIDI IMG] ${resultImgProc} `)
            return resultImgProc;
        }, imgSelector);
        console.log(7);
        // proc to put all info into an array
        const ridiBookInfo = [];
        for (var i = 0; i < titlesProc.length; i++) {

            ridiBookInfo[i] = {
                title: titlesProc[i],
                writer: writerProc[i],
                publisher: publisherProc[i],
                img: imgProc[i]

            }
            console.log(`[RIDI Array ${i}] ${ridiBookInfo[i]}`);

        }

        return ridiBookInfo

    }
}