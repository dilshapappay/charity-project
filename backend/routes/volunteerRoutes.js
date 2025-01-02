const express = require('express');
const volunteerController = require('../controllers/volunteerController.js');
const { validate } = require('../middlewares/validator');
const { volunteerSchema } = require('../api-data-schema/addVolunteerSchema');

const router = express.Router();

router.get('/', volunteerController.getVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.post('/', validate(volunteerSchema), volunteerController.createVolunteer);
router.put('/', volunteerController.updateVolunteer);
router.delete('/', volunteerController.deleteVolunteer);

module.exports = router;