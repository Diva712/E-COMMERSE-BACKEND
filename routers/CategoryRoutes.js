
const express = require('express');
const { createCategory, getAllCategory } = require('../controllers/CategoryController');
const router = express.Router();

router.route('/create').post(createCategory)
router.route('/').get(getAllCategory);



module.exports = router;