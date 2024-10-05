const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();

router.get('/', itemsController.getItems);
router.post('/', itemsController.createItems);
router.delete('/',itemsController.deleteItem)
module.exports = router;
