const express = require('express');
const { registerController } = require('../controllers/UserController');
const router = express.Router();

router.route('/register').get(registerController);

module.exports = router;