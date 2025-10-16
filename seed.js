// Seed script: creates a superadmin, sample vendor, sample customer and one product
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/gapdb';
async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB for seeding');
  const salt = await bcrypt.genSalt(10);
  const pw = await bcrypt.hash('AdminPass123!', salt);
  let admin = await User.findOne({ email: 'gapstoresandlog@gmail.com' });
  if (!admin) {
    admin = await User.create({ name: 'Excel Blessing', email: 'gapstoresandlog@gmail.com', passwordHash: pw, role: 'superadmin' });
    console.log('Superadmin created: gapstoresandlog@gmail.com / AdminPass123!');
  } else {
    console.log('Superadmin already exists');
  }
  let vendor = await User.findOne({ email: 'vendor@gapstores.test' });
  if (!vendor) {
    const vpw = await bcrypt.hash('VendorPass123!', salt);
    vendor = await User.create({ name: 'Sample Vendor', email: 'vendor@gapstores.test', passwordHash: vpw, role: 'vendor' });
    console.log('Vendor created: vendor@gapstores.test / VendorPass123!');
  } else {
    console.log('Vendor already exists');
  }
  let customer = await User.findOne({ email: 'customer@gapstores.test' });
  if (!customer) {
    const cpw = await bcrypt.hash('CustomerPass123!', salt);
    customer = await User.create({ name: 'Sample Customer', email: 'customer@gapstores.test', passwordHash: cpw, role: 'customer' });
    console.log('Customer created: customer@gapstores.test / CustomerPass123!');
  } else {
    console.log('Customer already exists');
  }
  let prod = await Product.findOne({ title: 'Neolife Aloe Vera Plus' });
  if (!prod) {
    prod = await Product.create({
      vendor: vendor._id,
      title: 'Neolife Aloe Vera Plus',
      description: 'An orange-flavoured aloe vera drink promoting gut comfort and vitality.',
      price: 100000,
      images: ['https://via.placeholder.com/800x800.png?text=Neolife+Aloe+Vera+Plus'],
      stock: 25,
      status: 'published'
    });
    console.log('Sample product created: Neolife Aloe Vera Plus (₦100,000)');
  } else {
    console.log('Sample product exists');
  }
  process.exit(0);
}
run().catch(err => { console.error(err); process.exit(1); });
