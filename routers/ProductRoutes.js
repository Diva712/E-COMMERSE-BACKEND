const express = require('express');
const { getAllProduct, getSingleProduct } = require('../controllers/ProductController');
const router = express.Router();


router.route('/get-all').get(getAllProduct);
router.route('/:id').get(getSingleProduct);




module.exports = router;
