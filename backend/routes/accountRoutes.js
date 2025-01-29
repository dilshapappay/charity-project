// filepath: /e:/dhilsha/charity project/backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Register Handle
router.post('/register', accountController.register);

// Login Handle
router.post('/login', accountController.login);

// Forgot Password Handle
router.post('/forgot', accountController.forgotPassword);

module.exports = router;