const express = require('express');
const volunteerController = require('../controllers/volunteerController.js');
const router = express.Router();

router.get('/', volunteerController.getVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.post('/', volunteerController.createVolunteer);
router.put('/', volunteerController.updateVolunteer);
router.delete('/', volunteerController.deleteVolunteer);

module.exports = router;