module.exports = {

    ridiCrawler: async function (page, inputBookName) {
     
        await page.goto(`https://select.ridibooks.com/search?q=${inputBookName}&type=Books`);

    
        const titleSelector = `#app > main > ul > li > div > div > a > h3`;
        const titlesProc = await page.evaluate((titleSelector) => {
            var titles = Array.from(document.querySelectorAll(titleSelector));

            var resultTitleProc = titles
                .map(title => title.textContent)
                .slice(0, 3); // 3 > titles.length


            return resultTitleProc;
        }, titleSelector)

        const writerProc = await page.evaluate(() => {
            var writers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Authors`));
            var writerProcResult = writers
                .map(writer => writer.textContent)
                .slice(0, 3);


            return writerProcResult;
        },)

        const publisherProc = await page.evaluate(() => {
            var publishers = Array.from(document.querySelectorAll(`#app > main > ul > li > div > div > a > span.SearchResultBookList_Publisher`));
            var resultPublisherProc = publishers
                .map(publisher => publisher.textContent)
                .slice(0, 3);


            return resultPublisherProc;
        },)


        const imgSelector = `#app > main > ul > li > div > div > div > a > div > img`;
        const imgProc = await page.evaluate((imgSelector) => {
            var imgs = Array.from(document.querySelectorAll(imgSelector));
            var resultImgProc = imgs
                .map(img => img.src)
                .slice(0, 3);

            return resultImgProc;
        }, imgSelector);

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

        return ridiBookInfo

    }
}