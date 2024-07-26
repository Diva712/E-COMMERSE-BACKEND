
const express = require('express');
const { createCategory, getAllCategory, deleteCategory } = require('../controllers/CategoryController');
const router = express.Router();

router.route('/create').post(createCategory)
router.route('/').get(getAllCategory);
router.route('/delete/:id').delete(deleteCategory);



module.exports = router;