const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();

router.get('/', itemsController.getItems);
router.post('/', itemsController.createItems);
module.exports = router;
