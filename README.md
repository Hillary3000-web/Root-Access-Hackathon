# MediRemit 🏥

> Cross-border healthcare payment platform for the Nigerian diaspora.

**Live Demo:** https://mediremit-frontend.vercel.app  
**Backend API:** https://mediremit-backend.onrender.com

---

## The Problem

Millions of Nigerians in the diaspora struggle to pay for their family's medical bills back home:

- Wire transfers take 3–5 days and cost 5–10% in fees
- Money lands as cash with no guarantee it reaches the hospital
- Families have no visibility into how the money is spent
- Hospitals have no direct international payment infrastructure

## The Solution

MediRemit lets diaspora users **pay Nigerian hospitals directly** — bypassing the person entirely — using Interswitch's payment infrastructure.

---

## Features

- **Hospital Directory** — Search and filter verified Nigerian hospitals
- **Direct Hospital Payment** — Pay hospitals directly via Interswitch Web Checkout API
- **Transaction History** — Track all past payments with real-time status
- **Secure Authentication** — JWT-based auth with bcrypt password hashing
- **Real Database** — All data persisted in Supabase (PostgreSQL)

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios
- Deployed on Vercel

**Backend**
- Node.js + Express
- Supabase (PostgreSQL)
- JWT + bcrypt authentication
- Deployed on Render

**Integrations**
- Interswitch Web Checkout API (payment processing)
- Interswitch OAuth 2.0 (authentication)
- Supabase Realtime Database

---

## API Endpoints

### Auth
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and get JWT token

### Hospitals
- `GET /hospitals` — Get all hospitals
- `GET /hospitals?search=lagos` — Search hospitals
- `GET /hospitals/:id` — Get single hospital

### Payments
- `POST /checkout/pay` — Initiate Interswitch payment
- `GET /checkout/callback` — Handle payment callback

### Transactions
- `POST /transactions` — Save a transaction
- `GET /transactions` — Get user transaction history
- `PATCH /transactions/:ref/status` — Update transaction status

---

## Running Locally

**Backend**
```bash
git clone https://github.com/Hillary3000-web/Root-Access-Hackathon
cd Root-Access-Hackathon
npm install
# Add your .env variables
node index.js
```

**Frontend**
```bash
cd mediremit-frontend
npm install
npm run dev
```

---

## Environment Variables
```
PORT=3000
INTERSWITCH_CLIENT_ID=your_client_id
INTERSWITCH_SECRET_KEY=your_secret_key
INTERSWITCH_BASE_URL=https://qa.interswitchng.com
INTERSWITCH_MERCHANT_CODE=your_merchant_code
INTERSWITCH_PAYABLE_CODE=your_payable_code
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
BASE_URL=https://mediremit-backend.onrender.com
```

---

## Team

**Hillary Chukwuma Prince** — Backend Lead  
Backend architecture, Interswitch API integration, database design, deployment

---

## Built For

**Enyata × Interswitch Buildathon 2026**  
Categories: Payments · Cross-Border · Health