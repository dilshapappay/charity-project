const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();

router.get("/", dashboardController.getDashboardData);
router.get("/order-status", dashboardController.getOrderStatusData);
router.get("/quantity", dashboardController.getQuantityData);

module.exports = router;