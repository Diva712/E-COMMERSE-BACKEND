const express = require('express');
const { registerController, loginController, getUserProfile, logoutController, updateUserController } = require('../controllers/UserController');
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').get(isAuthenticated, logoutController);
router.route('/update').patch(isAuthenticated, updateUserController);


module.exports = router;