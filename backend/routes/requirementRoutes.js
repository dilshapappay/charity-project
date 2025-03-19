const express = require('express');
const requirementController = require('../controllers/requirementController');
const { validate } = require('../middlewares/validator');
const { requirementSchema } = require('../api-data-schema/addRequirementSchema');
const { updateRequirementSchema } = require('../api-data-schema/updateRequirementSchema');
const authMiddleware = require('../middlewares/authMiddlware');


const router = express.Router();

router.get('/' ,requirementController.getRequirements);
router.get('/:id', requirementController.getRequirementById);
router.post('/',requirementController.createRequirements);
router.put('/',requirementController.updateRequirement);
router.delete('/',requirementController.deleteRequirement);

module.exports = router;