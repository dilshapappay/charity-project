const express = require('express');
const campController = require('../controllers/campController');
const { validate } = require('../middlewares/validator');
const { campSchema } = require('../api-data-schema/addCampSchema');
const router = express.Router();

router.get('/', campController.getCamps);
router.get('/:id', campController.getCampById);
router.post('/', validate(campSchema),campController.createCamps);
router.put('/',campController.updateCamp);

router.delete('/',campController.deleteCamp);
module.exports = router;