const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const itemsRoutes = require('./itemsRoutes');
const roleRoutes = require('./roleRoutes');
const campRoutes = require('./campRoutes');
const requirementRoutes = require('./requirementRoutes');
const orderRoutes=require('./orderRoutes');
const volunteerRoutes=require('./volunteerRoutes');

 


router.use('/users', userRoutes);
router.use('/items',itemsRoutes);
router.use('/roles', roleRoutes);
router.use('/camps', campRoutes);
router.use('/requirements',requirementRoutes);
router.use('/orders', orderRoutes);
router.use('/volunteers',volunteerRoutes);

module.exports = router;