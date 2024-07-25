const express = require('express');
const { registerController, loginController, getUserProfile } = require('../controllers/UserController');
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/profile').get(isAuthenticated, getUserProfile);



module.exports = router;