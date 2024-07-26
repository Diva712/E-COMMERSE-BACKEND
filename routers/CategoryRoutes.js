
const express = require('express');
const { createCategory } = require('../controllers/CategoryController');
const router = express.Router();

router.route('/create').post(createCategory)

module.exports = router;