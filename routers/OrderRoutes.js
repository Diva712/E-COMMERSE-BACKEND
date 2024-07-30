const express = require('express');
const { createOrder, myOrder, getSingleOrder, razorPayKey, razorPayCapturingPayment } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');



router.route('/create').post(isAuthenticated, createOrder);

router.route('/my-orders').get(isAuthenticated, myOrder);

router.route('/my-orders/:id').get(isAuthenticated, getSingleOrder);


//Payment routes
router.route('/razorpay-key').get(isAuthenticated, razorPayKey);
router.route('/razorpay-payment').post(razorPayCapturingPayment);


module.exports = router;