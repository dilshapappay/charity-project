const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const itemsRoutes = require('./itemsRoutes');

router.use('/users', userRoutes);
router.use('/items',itemsRoutes);
module.exports = router;