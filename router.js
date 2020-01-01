const express = require('express');
const router = express.Router();
const millieCrawler = require(`./crawler/millie`);

router.get('/', (req, res) => {
    res.send('server is up and running');
});


router.get('/search', (req, res) => {

    const bookName = req.query.bookName;
    console.log(bookName);

    millieCrawler
        .millieCrawler(bookName)
        .then(resolve => {
            console.log(resolve);

            res.json(resolve);

        })
        .catch(reject => {
            alert(`${reject} No books we found, will go to home.`);
        });

});

module.exports = router;