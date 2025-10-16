const Order = require('../models/Order');
const Product = require('../models/Product');
const shortid = require('shortid');
exports.createOrder = async (req, res) => {
  try {
    const { customerId, items, paymentMethod } = req.body;
    let total = 0;
    const productRefs = [];
    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) return res.status(400).json({ message: 'Invalid product' });
      total += (p.price || 0) * (it.qty || 1);
      productRefs.push({ product: p._id, qty: it.qty, price: p.price });
    }
    const trackingCode = 'GAP-' + shortid.generate().toUpperCase();
    const order = new Order({
      customer: customerId,
      items: productRefs,
      totalAmount: total,
      paymentMethod: paymentMethod || 'ONLINE',
      paymentStatus: paymentMethod === 'ONLINE' ? 'paid' : 'pending',
      trackingCode
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.uploadPaymentProof = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, uploadedBy, method } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.paymentProofs.push({ url, uploadedBy, uploadedAt: new Date(), method });
    order.paymentStatus = 'proof_uploaded';
    await order.save();
    res.json({ message: 'Proof uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.listOrders = async (req, res) => {
  const orders = await Order.find().limit(200).populate('customer vendor items.product');
  res.json(orders);
};
