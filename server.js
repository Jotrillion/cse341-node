require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'cse341';

let db;

async function startServer() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();

    db = client.db(dbName);
    app.locals.db = db;

    console.log(`Connected to MongoDB: ${dbName}`);

    app.listen(port, () => {
      console.log('Web Server is listening at port ' + port);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}
 
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: db ? 'connected' : 'disconnected'
  });
});

startServer();
