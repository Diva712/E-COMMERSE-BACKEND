const express = require('express');
const { getAllProduct, getSingleProduct, creareProduct, updateProduct, updateProductImage, deleteProductImage, deleteProduct, productReviewController, getTopProduct } = require('../controllers/ProductController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const singleUpload = require('../middleware/MulterMiddleware');
router.route('/get-all').get(getAllProduct);
router.route('/:id').get(getSingleProduct).put(isAuthenticated, updateProduct)
router.route('/update-image/:id').put(isAuthenticated, singleUpload, updateProductImage);
router.route('/create').post(isAuthenticated, singleUpload, creareProduct);
router.route('/delete-image/:id').delete(deleteProductImage);
router.route('/delete-product/:id').delete(deleteProduct);
router.route('/:id/review').post(isAuthenticated, productReviewController);

module.exports = router;
