const express = require('express');
const app = express();
const mongodb = require('./data/database');
const port = process.env.port || 3000;
app.use('/', require('./routes'));

mongodb.initDb((err) =>
{
    if (err)
        console.log(err)
    else 
   app.listen(port, () => { (console.log(`database is listening and node running on port ${port}`))})     
})
