const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number, price: Number }],
  totalAmount: Number,
  currency: { type: String, default: 'NGN' },
  paymentMethod: { type: String, default: 'ONLINE' },
  paymentStatus: { type: String, default: 'pending' },
  trackingCode: String,
  paymentProofs: [{ url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, uploadedAt: Date, method: String }],
  courierReceipts: [{ url: String, courierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, uploadedAt: Date, trackingOnReceipt: String }],
  orderStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
