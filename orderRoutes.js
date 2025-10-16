const express = require('express');
const router = express.Router();
const { createOrder, uploadPaymentProof, listOrders } = require('../controllers/orderController');
router.post('/', createOrder);
router.post('/:id/upload-proof', uploadPaymentProof);
router.get('/', listOrders);
module.exports = router;
