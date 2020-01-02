var express = require('express');
var router = express.Router();
const millieCrawler = require('../crawler/millie');
const ridiCrawler = require('../crawler/ridi');

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Home page opened up!');

});

router.get('/search', (req, res, next) => {
    const inputBookName = req.query.inputBookName;
    console.log(`[Request] ${inputBookName}`);

    (async() => {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({headless: true})
        

        const millieBooks = await millieCrawler.millieCrawler(inputBookName, browser);

        const ridiBooks = await ridiCrawler.ridiCrawler(inputBookName, browser);

        console.log(`[Fetched] ${millieBooks, ridiBooks}`);
        
        res.json(millieBooks);

    })();

})

module.exports = router;
