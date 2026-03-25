const express = require('express');
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

mongodb.initDb((err) =>
{
    if (err)
        console.log(err)
    else 
   app.listen(port, () => { (console.log(`database is listening and node running on port ${port}`))})     
})
