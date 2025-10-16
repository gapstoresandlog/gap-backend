const Product = require('../models/Product');
exports.listProducts = async (req, res) => {
  const products = await Product.find({ status: 'published' }).limit(50);
  res.json(products);
};
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};
exports.createProduct = async (req, res) => {
  const body = req.body;
  const product = new Product(body);
  await product.save();
  res.json(product);
};
