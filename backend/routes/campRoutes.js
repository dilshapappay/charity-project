const express = require('express');
const campController = require('../controllers/campController');
const router = express.Router();

router.get('/', campController.getCamps);
router.get('/camps/:id', campController.getCampById);

router.post('/',campController.createCamps);
router.delete('/',campController.deleteCamp);
module.exports = router;