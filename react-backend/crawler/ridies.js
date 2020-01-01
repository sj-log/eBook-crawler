const puppeteer = require('puppeteer');


(async() => {
    const browserRidie = await puppeteer.launch({headless: false})
    const pageRidie = await browserRidie.newPage();
    await pageRidie.goto(`
    https://select.ridibooks.com/search?q=${bookName}&type=Books`);

    try {
        // await pageRidie.waitFor(3000);
        const selector = `h3.SearchResultBookList_Title`;
        await pageRidie.waitForSelector(selector);
        const titlesSelect = await pageRidie.evaluate((selector) => {
            var titles = Array.from(document.querySelectorAll(selector));
            return titles
                .map(title => title.textContent)
                .slice(0, titles.length);
        }, selector)

        console.log(`titlesSelect ${titlesSelect}`);

        if (titlesSelect.find(bookName)) {
            result = `[Success] '${bookName}' found`;
            console.log(result);

            res.send(`<h1>Result</h1>
                <p>${result}</p>
            <script> const goBack = () =>{ window.history.back();}</script>
            <Button onClick='goBack()'>Back</Button`);

        } else {

            result = `No, Sorry, we cannot found '${bookName}' in RidiSelect`;

            res.send(`<h1>Result</h1>
                <p>${result}</p>
            <script> const goBack = () =>{ window.history.back();}</script>
            <Button onClick='goBack()'>Back</Button`);

        }

    } catch (err) {
        console.log(err);
    }
});