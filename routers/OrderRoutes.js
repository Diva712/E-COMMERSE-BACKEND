const express = require('express');
const { createOrder, myOrder, getSingleOrder } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');



router.route('/create').post(isAuthenticated, createOrder);

router.route('/my-orders').get(isAuthenticated, myOrder);

router.route('/my-orders/:id').get(isAuthenticated, getSingleOrder);

module.exports = router;