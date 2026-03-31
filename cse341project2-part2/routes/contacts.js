const express = require('express');
const router = express.Router();

const { connectToDatabase } = require('../controllers/database');
const { ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');


// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});




// Create a new contact with validation
router.post('/contacts', [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().notEmpty(),
  body('address').isString().notEmpty(),
  body('city').isString().notEmpty(),
  body('zip').isString().notEmpty(),
  body('birthday').isString().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const db = await connectToDatabase();
    const result = await db.collection('contacts').insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// Get a contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});



// Update a contact by ID with validation
router.put('/contacts/:id', [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().notEmpty(),
  body('address').isString().notEmpty(),
  body('city').isString().notEmpty(),
  body('zip').isString().notEmpty(),
  body('birthday').isString().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const db = await connectToDatabase();
    const result = await db.collection('contacts').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// Delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
