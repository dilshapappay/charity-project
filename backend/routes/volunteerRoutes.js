const express = require('express');
const volunteerController = require('../controllers/volunteerController.js');
const { validate } = require('../middlewares/validator');
const { volunteerSchema } = require('../api-data-schema/addVolunteerSchema');
const { updateVolunteerSchema } = require('../api-data-schema/updateVolunteerSchema');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router();

router.get('/', authMiddlware,volunteerController.getVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.post('/', validate(volunteerSchema), volunteerController.createVolunteer);
router.put('/', validate(updateVolunteerSchema),volunteerController.updateVolunteer);
router.delete('/', volunteerController.deleteVolunteer);

module.exports = router;