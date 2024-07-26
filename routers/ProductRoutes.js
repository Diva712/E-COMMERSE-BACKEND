const express = require('express');
const { getAllProduct, getSingleProduct, creareProduct, updateProduct, updateProductImage } = require('../controllers/ProductController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/AuthMiddleware');
const singleUpload = require('../middleware/MulterMiddleware');
router.route('/get-all').get(getAllProduct);
router.route('/:id').get(isAuthenticated, getSingleProduct).put(updateProduct)
router.route('/image/:id').put(singleUpload, updateProductImage);
router.route('/create').post(isAuthenticated, singleUpload, creareProduct);



module.exports = router;
