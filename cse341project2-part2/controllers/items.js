
const { connectToDatabase } = require('./database');
const { ObjectId } = require('mongodb');

// GET /api/items
async function getItems(req, res) {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find().toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}

// POST /api/items
async function createItem(req, res) {
  try {
    const db = await connectToDatabase();
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const result = await db.collection('items').insertOne({ name, description });
    res.status(201).json(result.ops ? result.ops[0] : { _id: result.insertedId, name, description });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
}


// PUT /api/items/:id
async function updateItem(req, res) {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid item ID' });
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const result = await db.collection('items').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, description } },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(result.value);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
}

// DELETE /api/items/:id
async function deleteItem(req, res) {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid item ID' });
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
}

module.exports = { getItems, createItem, updateItem, deleteItem };
