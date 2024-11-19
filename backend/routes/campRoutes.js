const express = require('express');
const campController = require('../controllers/campController');
const router = express.Router();

router.get('/', campController.getCamps);
router.get('/:id', campController.getCampById);
router.post('/',campController.createCamps);
router.put('/',campController.updateCamp);

router.delete('/',campController.deleteCamp);
module.exports = router;