const express = require('express');
const { getAllProduct, getSingleProduct, creareProduct, updateProduct, updateProductImage, deleteProductImage, deleteProduct, productReviewController, getTopProduct } = require('../controllers/ProductController');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/AuthMiddleware');
const singleUpload = require('../middleware/MulterMiddleware');
router.route('/get-all').get(getAllProduct);
router.route('/:id').get(getSingleProduct).put(isAuthenticated, isAdmin, updateProduct)
router.route('/update-image/:id').put(isAuthenticated, isAdmin, singleUpload, updateProductImage);
router.route('/create').post(isAuthenticated, isAdmin, singleUpload, creareProduct);
router.route('/delete-image/:id').delete(isAuthenticated, isAdmin, deleteProductImage);
router.route('/delete-product/:id').delete(isAuthenticated, isAdmin, deleteProduct);
router.route('/:id/review').post(isAuthenticated, productReviewController);

module.exports = router;
