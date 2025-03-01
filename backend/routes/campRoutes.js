const express = require('express');
const campController = require('../controllers/campController');
const { validate } = require('../middlewares/validator');
const { campSchema } = require('../api-data-schema/addCampSchema');
const { updateCampSchema } = require('../api-data-schema/updateCampSchema');
const authMiddleware = require('../middlewares/authMiddlware');

const router = express.Router();

router.get('/', authMiddleware,campController.getCamps);
router.get('/:id', campController.getCampById);
router.post('/', validate(campSchema),campController.createCamps);
router.put('/',validate(updateCampSchema),campController.updateCamp);

router.delete('/',campController.deleteCamp);
module.exports = router;