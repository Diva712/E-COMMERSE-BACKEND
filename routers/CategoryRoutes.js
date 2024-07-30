
const express = require('express');
const { createCategory, getAllCategory, deleteCategory, updateCategory } = require('../controllers/CategoryController');
const { isAuthenticated, isAdmin } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.route('/create').post(isAuthenticated, isAdmin, createCategory)
router.route('/').get(isAuthenticated, isAdmin, getAllCategory);
router.route('/delete/:id').delete(isAuthenticated, isAdmin, deleteCategory);
router.route('/update/:id').patch(isAuthenticated, isAdmin, updateCategory);



module.exports = router;