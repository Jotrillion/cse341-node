const express = require('express');
const router = express.Router();


const { body, validationResult } = require('express-validator');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/items');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated && req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'Unauthorized' });
}



router.get('/items', isAuthenticated, getItems);

// Data validation for POST and PUT
const itemValidation = [
	body('name').isString().notEmpty(),
	body('description').optional().isString()
];

// POST /items with validation
router.post('/items', isAuthenticated, itemValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	createItem(req, res, next);
});

// PUT /items/:id with validation
router.put('/items/:id', isAuthenticated, itemValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	updateItem(req, res, next);
});
router.delete('/items/:id', isAuthenticated, deleteItem);

module.exports = router;
