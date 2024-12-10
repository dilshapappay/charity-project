const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

router.post('/', orderController.createOrder);
router.put('/', orderController.updateOrder);
router.delete('/', orderController.deleteOrder);



module.exports = router;