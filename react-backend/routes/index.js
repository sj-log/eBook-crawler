var express = require('express');
var router = express.Router();
const millieCrawler = require('../crawler/millie');
const ridiCrawler = require('../crawler/ridi');
const yesCrawler = require('../crawler/yes');
const {Cluster} = require('puppeteer-cluster');

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Home page opened up!');

});

router.get('/search', (req, res) => {

    (async() => {
        const inputBookName = req.query.inputBookName;

        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 3,
            puppeteerOptions: {
                headless: true
            }
        });

        const millieCrawling = async({page, data: inputBookName}) => {
            return await millieCrawler.millieCrawler(page, inputBookName);

        };
        const ridiCrawling = async({page, data: inputBookName}) => {
            return await ridiCrawler.ridiCrawler(page, inputBookName);
        };

        const yesCrawling = async({page, data: inputBookName}) => {
            return await yesCrawler.yesCrawler(page, inputBookName);
        };

        const resultMillie = await cluster.execute(inputBookName, millieCrawling);
        const resultRidi = await cluster.execute(inputBookName, ridiCrawling);
        const resultYes = await cluster.execute(inputBookName, yesCrawling);

        res.json({ridiBooks: resultRidi, millieBooks: resultMillie, yesBooks: resultYes});

        await cluster.idle();
        await cluster.close();

    })(req, res)

})

module.exports = router;
