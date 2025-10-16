const express = require('express');
const router = express.Router();
const { listProducts, getProduct, createProduct } = require('../controllers/productController');
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
module.exports = router;
