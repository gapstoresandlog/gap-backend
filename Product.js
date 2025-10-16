const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  price: Number,
  currency: { type: String, default: 'NGN' },
  images: [String],
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ['draft','published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema);
