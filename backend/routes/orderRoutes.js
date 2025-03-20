const express = require('express');
const orderController = require('../controllers/orderController');
const { validate } = require('../middlewares/validator');
const { orderSchema } = require('../api-data-schema/addOrderSchema');
const { updateOrderSchema } = require('../api-data-schema/updateOrderSchema');
const authMiddleware = require('../middlewares/authMiddlware');

const router = express.Router();

router.get('/', authMiddleware, orderController.getOrders);
router.get('/:id', orderController.getOrderById);

router.post('/', authMiddleware, validate(orderSchema), orderController.createOrder);
router.put('/', authMiddleware, validate(updateOrderSchema), orderController.updateOrder);
router.delete('/', orderController.deleteOrder);

module.exports = router;