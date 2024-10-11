const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const itemsRoutes = require('./itemsRoutes');
const roleRoutes = require('./roleRoutes');
const  campRoutes = require('./campRoutes');
const requirementRoutes = require('./requirementRoutes')

router.use('/users', userRoutes);
router.use('/items',itemsRoutes);
router.use('/roles', roleRoutes);
router.use('/camps', campRoutes);
router.use('/requirements',requirementRoutes);
module.exports = router;