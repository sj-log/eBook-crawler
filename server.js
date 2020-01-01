var express = require('express');
const router = require('express').Router();
var path = require('path');
var port = 5000;
var app = express();
const millieCrawler = require(`./crawler/millie`);

app.use(express.static(path.join(__dirname, `client/src`)));

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname +'/client/public/index.html'))
})

app.get('/search', (req, res) => {

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
            res.sendFile(path.join(__dirname, `html`, `index.html`));
        });

});

app.listen(port, () => {
    console.log(`\n[Server Start] Port ${port} opened!`)
})
