const express = require('express');
const { getAllProduct } = require('../controllers/ProductController');
const router = express.Router();


router.route('/get-all').get(getAllProduct);

module.exports = router;
