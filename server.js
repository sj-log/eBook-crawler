var express = require('express')
var port = 3000;
var result = ``;
var app = express();
const puppeteer = require('puppeteer');

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Simple E-Book crawler</title>
    </head>
    <body>
        <h1>Simple E-Book crawler</h1>
        <form action="/search" method="GET">
            <input type="text" name="bookName" placeholder="Search your Book!" required>
            <button type="submit" >Find</button>
        </form>
    </body>
</html>`)
})

app.get('/search', (req, res) => {

    bookName = req.query.bookName;
    console.log("Typed, ", bookName);

    result = (async() => {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage();
        await page.goto(`https://www.millie.co.kr/v3/search/result/${bookName}?toapp=stop&type=all`);
        await page
            .keyboard
            .press(String.fromCharCode(13))

        const titles = await page.evaluate(() => document.querySelector('span.title').textContent)
        console.log(`book detected ${titles}`)
        // await page.pdf({path: 'test.pdf', format: 'A4'})
        switch (titles) {
            case bookName:
                result = `[Success] '${bookName}' found`;
                console.log(result);

                res.send(`<h1>Result</h1>
                <p>${result}</p>
            <script> const goBack = () =>{ window.history.back();}</script>
            <Button onClick='goBack()'>Back</Button`);

                return result;

            default:
                result = `No, Sorry, we cannot found '${bookName}'`;
                console.log(result);

                res.send(`<h1>Result</h1>
                <p>${result}</p>
            <script> const goBack = () =>{ window.history.back();}</script>
            <Button onClick='goBack()'>Back</Button`);

                return result;
        }

    })().catch(err => {
        console.log(err)
    });

})

// const textContent = await page.evaluate(() => document.querySelector(''))
// const innerText = await page.evaluate(() => document.querySelector(''))

app.listen(port, () => {
    console.log(`[Server Start] Port ${port} opened!`)
})
