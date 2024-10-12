const express = require('express');
const requirementController = require('../controllers/requirementController');
const router = express.Router();

router.get('/', requirementController.getRequirements);
router.get('/:id', requirementController.getRequirementById);
router.post('/',requirementController.createRequirements);
router.delete('/',requirementController.deleteRequirement);

module.exports = router;