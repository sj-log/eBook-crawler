var express = require('express');
var router = express.Router();
const millieCrawler = require('../crawler/millie');

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Home page opened up!');

});

router.get('/search', (req, res, next) => {
    const inputBookName = req.query.inputBookName;
    console.log(`[Server got Bookname] ${inputBookName}`);

    (async() => {
        const books = await millieCrawler.millieCrawler(inputBookName);
        console.log(`[Fetched Books] ${books}`);
        
   
        res.json(books);

    })();

  


})

module.exports = router;
