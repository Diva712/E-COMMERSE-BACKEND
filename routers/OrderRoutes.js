const express = require('express');
const { createOrder, myOrder } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');



router.route('/create').post(isAuthenticated, createOrder);

router.route('/my-orders').get(isAuthenticated, myOrder);

module.exports = router;