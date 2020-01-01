var express = require('express');
var router = express.Router();
const millieCrawler = require('../crawler/millie');

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Home page opened up!');

});

router.get('/search', (req, res, next) => {

    const bookName = req.query.bookName;
    console.log(`[Client Look up] ${bookName}`);

    (async() => {
        const books = await millieCrawler.millieCrawler(bookName);
        console.log(`[Crawler found] ${books}`);
        
   
        res.json(books);

    })();

  


})

module.exports = router;
