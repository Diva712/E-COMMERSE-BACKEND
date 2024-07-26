const express = require('express');
const { createOrder } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');
router.route('/create').post(isAuthenticated, createOrder);


module.exports = router;