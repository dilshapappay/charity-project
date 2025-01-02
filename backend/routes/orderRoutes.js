const express = require('express');
const orderController = require('../controllers/orderController');
const { validate } = require('../middlewares/validator');
const { orderSchema } = require('../api-data-schema/addOrderSchema');
const router = express.Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

router.post('/',validate(orderSchema),orderController.createOrder);
router.put('/', orderController.updateOrder);
router.delete('/', orderController.deleteOrder);



module.exports = router;