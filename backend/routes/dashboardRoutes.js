const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router();

router.get("/", authMiddlware, dashboardController.getDashboardData);
router.get("/order-status", authMiddlware, dashboardController.getOrderStatusData);
router.get("/quantity", authMiddlware, dashboardController.getQuantityData);

module.exports = router;