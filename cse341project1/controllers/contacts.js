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

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
 const reponse = await mongodb
      .getDatabase()
      .db(process.env.MONGODB_DB)
      .collection('contacts')
    .insertOne(contact);
  if (reponse.acknowledged) {
    res.status(204).send;
  } else {
    res.status(500).json(reponse.error || 'some error occured while updating the user');
  }

 
};

const updateContact = async (req, res) => {
   const ObjectId = require('mongodb').ObjectId;
   const contact = {
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     favoriteColor: req.body.favoriteColor,
     birthday: req.body.birthday
   };
   const response = await mongodb
        .getDatabase()
        .db(process.env.MONGODB_DB)
        .collection('contacts')
     .replaceOne({_id: new ObjectId(req.params.id)}, contact);
   if (response.modifiedCount > 0) {
     res.status(204).send();
   } else {
     res.status(500).json(response.error || 'Some error occurred while updating the user');
   }

 
};

const deleteContact = async (req, res) => {
   const ObjectId = require('mongodb').ObjectId;
  
   const response = await mongodb
        .getDatabase()
        .db(process.env.MONGODB_DB)
        .collection('contacts')
    .deleteOne({_id: new ObjectId(req.params.id)});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }

 
};



module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };