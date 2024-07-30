const express = require('express');
const { createOrder, myOrder, getSingleOrder, razorPayKey, razorPayCapturingPayment, getAllOrdersController, changeOrderStatusController } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/AuthMiddleware');



router.route('/create').post(isAuthenticated, createOrder);

router.route('/my-orders').get(isAuthenticated, myOrder);

router.route('/my-orders/:id').get(isAuthenticated, getSingleOrder);


//Payment routes
router.route('/razorpay-key').get(isAuthenticated, razorPayKey);
router.route('/razorpay-payment').post(isAuthenticated, razorPayCapturingPayment);


router.route('/getAllOrders').get(isAuthenticated, isAdmin, getAllOrdersController);
router.route('/change-order-status/:id').put(isAuthenticated, isAdmin, changeOrderStatusController);
module.exports = router;