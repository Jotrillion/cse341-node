const { connectToDatabase } = require('./database');

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

module.exports = { getItems, createItem };
