var express = require('express');
var router = express.Router();
const crawlers = require('../crawler/crawlers');
const {Cluster} = require('puppeteer-cluster');
const chromium = require('chrome-aws-lambda');
const functions = require('firebase-functions');
const puppetExtra = require('puppeteer-extra');
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppetExtra.use(adblockerPlugin({blockerTrackers: true, useCache: true})); // this makes ridi books come out
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
                    devtools: true,
                    args: [
                        ...chromium.args,
                        '--no-sandbox',
                        '--disable-multi-display-layout',
                        "--proxy-server='direct://'",
                        '--proxy-bypass-list=*',
                        '--no-first-run',
                        '--disable-gpu',
                        '--disable-setuid-sandbox',
                        '--no-zygote'
                    ],
                    ignoreHTTPSErrors: true,

                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath,
                    headless: true,
                    userDataDir: '/dev/null'
                }
            });

            const crawling = async({page, data: inputBookName}) => {
                page.on('console', msg => {
                    for (let i = 0; i < msg._args.length; ++i) 
                        console.log(`${i}: ${msg._args[i]}`);
                    }
                );
                console.log(`[REQ BOOK NAME] ${inputBookName}`)

                await page
                    .tracing
                    .start({categories: ['devtools.timeline'], path: "./tracing.json"});

                const millieResult = await crawlers.millieCrawler(page, inputBookName);
                const ridiResult = await crawlers.ridiCrawler(page, inputBookName);
                const yesResult = await crawlers.yesCrawler(page, inputBookName);

                res.json({ridiBooks: ridiResult, millieBooks: millieResult, yesBooks: yesResult});

                var tracing = JSON.parse(await page.tracing.stop());
                tracing
                    .traceEvents
                    .filter(te => te.name === "ResourceSendRequest");
                tracing
                    .traceEvents
                    .filter(te => te.name === "ResourceReceiveResponse");

            };

            cluster.execute(inputBookName, crawling);

            await cluster.idle();
            await cluster.close();

        })(req, res)

})

module.exports = router;