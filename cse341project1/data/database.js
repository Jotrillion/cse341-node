const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let Database;

const initDb = (callback) => {
  if (Database) {
    console.log('Db is already initialized!');
    return callback(null, Database);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      Database = client;
      callback(null, Database);
    })
    .catch((err) => {
      callback(err);
    });
};

const  getDatabase = () => {
  if (!Database) {
    throw Error('Db not initialized');
  }
  return Database;
};

module.exports = {
  initDb,
  getDatabase,
};