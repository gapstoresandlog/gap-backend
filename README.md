# GAP Backend (final) - Ready for GitHub & Render

This is the final GAP backend scaffold prepared for you.

## What’s included
- Node.js + Express backend
- MongoDB models: User, Product, Order
- Auth routes (register/login)
- Product routes (list/create)
- Order routes (create/upload-payment-proof)
- Seed script to create Super Admin, Vendor, Customer, and sample product
- Cloudinary integration scaffold
- Payment provider placeholders (Paystack, Flutterwave, Stripe, PayPal, Coinbase)
- Bank transfer & Pay-on-delivery proof uploads & admin verification flow

## Seed data (pre-configured)
- Super Admin: Excel Blessing (gapstoresandlog@gmail.com) / AdminPass123!
- Vendor: vendor@gapstores.test / VendorPass123!
- Customer: customer@gapstores.test / CustomerPass123!

Sample product: Neolife Aloe Vera Plus — ₦100,000

## Quick start (local)
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run seed`
4. `npm run dev`
5. Visit `http://localhost:5000/api/products` to confirm the product

## Deploy to GitHub & Render (upload steps)
1. Create a GitHub repo named `gap-backend` in your account.
2. On your phone/PC, extract the ZIP you download from this page.
3. In GitHub web UI → your repo → Add file → Upload files
   - Select **all files and folders** from the extracted folder (not the ZIP itself).
   - Commit changes.
4. In Render.com create a new Web Service → connect to GitHub → choose `gap-backend` repo.
   - Build command: `npm install`
   - Start command: `npm start`
5. In Render environment variables, add values from `.env.example` (MONGO_URI etc.)
6. Deploy. After build, visit `https://<your-render-url>/api/products`

## Payment provider notes
- Add keys for Paystack, Flutterwave, Stripe, PayPal, Coinbase in environment vars.
- Configure webhooks to the endpoints in `/api/payments/*` after integration.

## Bank Transfer Flow (manual verification)
When a customer selects Bank Transfer at checkout:
1. System generates unique tracking code.
2. Customer transfers to company account and includes tracking code in description.
3. Customer uploads proof in app.
4. Admin verifies and marks order paid.
