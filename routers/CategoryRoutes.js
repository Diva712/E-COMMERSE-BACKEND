
const express = require('express');
const { createCategory, getAllCategory, deleteCategory, updateCategory } = require('../controllers/CategoryController');
const router = express.Router();

router.route('/create').post(createCategory)
router.route('/').get(getAllCategory);
router.route('/delete/:id').delete(deleteCategory);
router.route('/update/:id').patch(updateCategory);



module.exports = router;