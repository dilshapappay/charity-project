const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const itemsRoutes = require('./itemsRoutes');
const roleRoutes = require('./roleRoutes');

router.use('/users', userRoutes);
router.use('/items',itemsRoutes);
router.use('/roles', roleRoutes);

module.exports = router;