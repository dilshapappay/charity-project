const express = require('express');
const itemsController = require('../controllers/itemsController');
const { validate } = require('../middlewares/validator');
const { itemSchema } = require('../api-data-schema/addItemSchema');
const router = express.Router();

router.get('/',itemsController.getItems);
router.get('/:id',itemsController.getItemById);
router.post('/',validate(itemSchema), itemsController.createItems);
router.put('/',itemsController.updateItem);

router.delete('/',itemsController.deleteItem)
module.exports = router;
