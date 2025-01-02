const express = require('express');
const requirementController = require('../controllers/requirementController');
const { validate } = require('../middlewares/validator');
const { requirementSchema } = require('../api-data-schema/addRequirementSchema');


const router = express.Router();

router.get('/', requirementController.getRequirements);
router.get('/:id', requirementController.getRequirementById);
router.post('/', validate(requirementSchema),requirementController.createRequirements);
router.put('/',requirementController.updateRequirement);
router.delete('/',requirementController.deleteRequirement);

module.exports = router;