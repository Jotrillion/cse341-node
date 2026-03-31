const express = require('express');
const router = express.Router();


const itemsRoutes = require('./items');
const contactsRoutes = require('./contacts');

router.use(itemsRoutes);
router.use(contactsRoutes);

// Logout route
router.get('/logout', function(req, res, next) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});

router

module.exports = router;
