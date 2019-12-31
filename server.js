var React = require(`react`);

var Home = require(`./pages/index.js`);
var express = require('express');
var {renderToString} = require(`react-dom/server`);
var router = express.Router();
var path = require('path');
var port = 3000;
var app = express();
const millieCrawler = require(`./crawler/millie`);

app.use(express.static(path.join(__dirname, `html`)));

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `html`, `index.html`))
})


app.get('/search', (req, res) => {

    const bookName = req.query.bookName;
    console.log(bookName);

    millieCrawler
        .millieCrawler(bookName)
        .then(resolve => {
            console.log(resolve);

            renderToString
            res.send(renderToString(Home))
            // res.send(path.join(__dirname, `pages`, `index.js`));

        })
        .catch(reject => {
            alert(`${reject} No books we found, will go to home.`);
            res.sendFile(path.join(__dirname, `html`, `index.html`));
        });

});

app.listen(port, () => {
    console.log(`\n[Server Start] Port ${port} opened!`)
})
