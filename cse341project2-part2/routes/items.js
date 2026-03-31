const express = require('express');
const router = express.Router();

const { getItems, createItem, updateItem, deleteItem } = require('../controllers/items');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated && req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'Unauthorized' });
}



router.get('/items', isAuthenticated, getItems);
router.post('/items', isAuthenticated, createItem);
router.put('/items/:id', isAuthenticated, updateItem);
router.delete('/items/:id', isAuthenticated, deleteItem);

module.exports = router;
