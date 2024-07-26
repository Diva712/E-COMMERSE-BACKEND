const express = require('express');
const { registerController, loginController, getUserProfile, logoutController, updateUserController, updatePasswordController, ProfilePictureController, updateProfilePicture } = require('../controllers/UserController');
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const singleUpload = require('../middleware/MulterMiddleware');
const router = express.Router();

router.route('/register').post(singleUpload, registerController);
router.route('/login').post(loginController);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').get(isAuthenticated, logoutController);
router.route('/update-profile').patch(isAuthenticated, updateUserController);
router.route('/update-password').put(isAuthenticated, updatePasswordController);
router.route('/profile-picture-update').put(isAuthenticated, singleUpload, updateProfilePicture);



module.exports = router;