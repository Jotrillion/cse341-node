const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;

let client;
let db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB:', dbName);
  }
  return db;
}

module.exports = { connectToDatabase };
