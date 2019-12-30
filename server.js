var express = require('express')
var port = 3000;
var app = express();

app.use(express.static('public'))
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
    console.log(bookName)
    
    const puppeteer = require('puppeteer');
    (async(bookName) => {
      const browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});

      const page = await browser.newPage();
      await page.goto('https://www.millie.co.kr/v3/search/result/' + bookName + '?toapp=stop&type=all');
      await page.keyboard.press('Enter');
      
      await page.screenshot()
    })
    
    
    res.send()
})

app.listen(port, () => {
    console.log(`Port ${port} opened!`)
})
