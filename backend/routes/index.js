const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const itemsRoutes = require('./itemsRoutes');
const roleRoutes = require('./roleRoutes');
const  campRoutes = require('./campRoutes');


router.use('/users', userRoutes);
router.use('/items',itemsRoutes);
router.use('/roles', roleRoutes);
router.use('/camps', campRoutes);
module.exports = router;