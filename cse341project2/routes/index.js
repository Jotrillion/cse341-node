const express = require('express');
const router = express.Router();


const itemsRoutes = require('./items');
const contactsRoutes = require('./contacts');

router.use(itemsRoutes);
router.use(contactsRoutes);

module.exports = router;
