//const mongodb = require('../data/database');
//const ObjectId = require('mongodb').ObjectId;

//const getAll = async (req, res, next) => {
  //try {
    //const result = await mongodb.getDatabase().db().collection('user').find();
    //const users = await result.toArray();
    //res.setHeader('Content-Type', 'application/json');
    //res.status(200).json(users);
  //} catch (err) {
    //next(err);
  //}
//};

//const getSingle = async (req, res, next) => {
  //try {
    //const userId = new ObjectId(req.params.id);
    //const result = await mongodb.getDatabase().db().collection('user').find({ _id: userId });
    //const users = await result.toArray();
    //res.setHeader('Content-Type', 'application/json');
    //res.status(200).json(users[0] || null);
  //} catch (err) {
    //next(err);
  //}
//};

//module.exports = { getAll, getSingle };

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const users = await mongodb
      .getDatabase()
      .db(process.env.MONGODB_DB)
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const user = await mongodb
      .getDatabase()
      .db(process.env.MONGODB_DB)
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getSingle };