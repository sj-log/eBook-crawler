var express = require('express');
var router = express.Router();
const crawlers = require('../crawler/crawlers');
const {Cluster} = require('puppeteer-cluster');

// index
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));

});

// submit
router.get('/search', (req, res) => {

    (async() => {
        const inputBookName = req.query.inputBookName;

        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 3,

            puppeteerOptions: {
                headless: true,
                args: ['--no-sandbox', "--proxy-server='direct://'", '--proxy-bypass-list=*']
            }
        });

        const crawling = async({page, data: inputBookName}) => {

            const millieResult = await crawlers.millieCrawler(page, inputBookName);
            const ridiResult = await crawlers.ridiCrawler(page, inputBookName);
            const yesResult = await crawlers.yesCrawler(page, inputBookName);

            res.json({ridiBooks: ridiResult, millieBooks: millieResult, yesBooks: yesResult});
        };

        cluster.execute(inputBookName, crawling);

        await cluster.idle();
        await cluster.close();

    })(req, res)

})

module.exports = router;
