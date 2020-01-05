var express = require('express');
var router = express.Router();
const crawlers = require('../crawler/crawlers');
const {Cluster} = require('puppeteer-cluster');
const chromium = require('chrome-aws-lambda');
const functions = require('firebase-functions');
const puppetExtra = require('puppeteer-extra');
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppetExtra.use(adblockerPlugin({blockerTrackers: true, useCache:true})); // this makes ridi books come out
puppetExtra.use(StealthPlugin()); // preventing to be traced.
const options = {
    memory: '1GB',
    timeoutSeconds: 300
}
// index
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));

});

// submit
router.get('/search', (req, res) => {
req.setEncoding('utf8');

    functions
        .runWith(options)
        .https
        .onRequest(async() => {

            const inputBookName = req.query.inputBookName;

            const cluster = await Cluster.launch({
                puppeteer: puppetExtra.addExtra(chromium.puppeteer),
                concurrency: Cluster.CONCURRENCY_PAGE,
                maxConcurrency: 3,

                puppeteerOptions: {

                    args: [
                        ...chromium.args,
                        '--no-sandbox',
                        '--disable-web-security',
                        '--disable-dev-profile',
                        '--font-render-hinting=none',
                        '--enable-font-antialiasing',
                        "--proxy-server='direct://'",
                        '--proxy-bypass-list=*',
                        '--no-first-run',
                        '--disable-gpu',
                        '--disable-setuid-sandbox',
                        '--no-zygote',
                    ],
                    ignoreHTTPSErrors: true,
                
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath,
                    headless: true,
                    userDataDir: '/dev/null'
                }
            });

            const crawling = async({page, data: inputBookName}) => {
               
                // await page.setRequestInterception(true);
                // page.on('request', (request) => {
                //     if (['stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                //         request.abort();
                //     } else {
                //         request.continue();
                //     }
                // });

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
