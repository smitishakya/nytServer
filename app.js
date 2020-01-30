const express = require("express");
const morgan = require("morgan");
const app = express();

const books = require('./books');
app.use(morgan('common'));

app.get('/', (req, res) => {
    //having search = empty create optional query
    const { search = "", sort } = req.query;

    if(sort){
        if(!['title', 'rank'].includes(sort)){
            return res.status(400).send('Sort must be title or rank')
        }
    }
    //having everything lowercase and trim of spaces at the end out in search bar
    let results = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()));
    res.json(results);
    //sorting array of objects comparsion functions
    if(sort){
        results.sort((a,b) => {
            //a[sort]can be a[title or rank] else a.title
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            //turner operation true false statement ? true : false 
      })
    }

})

app.listen(8000, () => {
    console.log('App is running at http://localhost:8000');
})