const express = require('express');
const { registerController, loginController, getUserProfile, logoutController, updateUserController, updatePasswordController } = require('../controllers/UserController');
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').get(isAuthenticated, logoutController);
router.route('/update-profile').patch(isAuthenticated, updateUserController);
router.route('/update-password').put(isAuthenticated, updatePasswordController);

module.exports = router;