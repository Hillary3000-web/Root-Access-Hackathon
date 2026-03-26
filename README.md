<p align="center">
  <img src="https://img.shields.io/badge/MediRemit-Cross--Border%20Healthcare%20Payments-00d084?style=for-the-badge&logoColor=white" alt="MediRemit" />
</p>

<h1 align="center">🏥 MediRemit</h1>

<p align="center">
  <strong>Your mum needs care. Pay her hospital right now.</strong><br/>
  <em>Cross-border healthcare payments for the Nigerian diaspora.</em>
</p>

<p align="center">
  <a href="https://mediremit-frontend.vercel.app"><img src="https://img.shields.io/badge/🚀_Live_Demo-mediremit--frontend.vercel.app-00d084?style=flat-square" alt="Live Demo" /></a>
  <a href="https://mediremit-backend.onrender.com"><img src="https://img.shields.io/badge/🔗_Backend_API-mediremit--backend.onrender.com-0a0f1e?style=flat-square" alt="Backend API" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Interswitch-002B5C?style=flat-square&logoColor=white" alt="Interswitch" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white" alt="Render" />
</p>

---

## 🎯 What is MediRemit?

MediRemit is a cross-border healthcare payment platform that lets Nigerians in the diaspora **pay hospital bills directly** — bypassing middlemen, eliminating wire transfer delays, and ensuring every naira reaches the hospital. Built on **Interswitch's Web Checkout API**, payments settle instantly into verified hospital accounts.

---

## 💡 The Problem

Millions of Nigerians abroad send money home for medical bills through wire transfers that take 3–5 days, lose 5–10% in hidden fees, and offer zero guarantee the cash reaches the hospital. Families have no visibility, no receipts, and no peace of mind.

## ✅ The Solution

MediRemit eliminates the middleman entirely. Search our directory of 15 verified Nigerian hospitals, select a treatment category, enter the patient details, and pay directly via Interswitch — with live FX conversion, instant digital receipts, and full transaction tracking.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Animated Landing Page** | Dark premium UI with scroll animations, glassmorphism cards, and trust badges |
| 🔐 **User Authentication** | JWT-based registration & login with bcrypt password hashing |
| 🏥 **Hospital Directory** | Search 15 verified hospitals by name, location, or specialty with location filter pills |
| 💊 **Treatment Categories** | 7 categories: Consultation, Surgery, Drugs & Pharmacy, Emergency Care, Lab & Diagnostics, Physiotherapy, Dental Care |
| 💱 **Live FX Conversion** | Real-time NGN → USD/GBP rates via exchangerate-api.com |
| 📋 **Payment Summary** | Preview card showing hospital, patient, treatment, amount in NGN/USD/GBP before paying |
| 💳 **Interswitch Checkout** | Direct hospital payment via Interswitch Web Checkout API |
| 🧾 **Payment Receipt** | Callback page showing success/failure with transaction details |
| 📊 **Transaction History** | Full payment ledger with real-time status tracking (Successful / Pending / Failed) |
| 👤 **User Profile** | Dashboard with total spent, payment count, success rate, preferred hospital, and recent transactions |
| 📱 **Fully Responsive** | Mobile-first design with breakpoints at 900px, 768px, and 480px |

---

## 📸 Screenshots

<p align="center">
  <img src="./screenshots/landing.png" width="48%" alt="Landing Page" />
  <img src="./screenshots/hospitals.png" width="48%" alt="Hospital Directory" />
</p>
<p align="center">
  <img src="./screenshots/payment.png" width="48%" alt="Payment Checkout" />
  <img src="./screenshots/transactions.png" width="48%" alt="Transaction History" />
</p>
<p align="center">
  <img src="./screenshots/profile.png" width="48%" alt="User Profile" />
</p>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework |
| **Vite** | Lightning-fast dev server & bundler |
| **React Router DOM** | Client-side routing (8 routes) |
| **Axios** | HTTP client for API communication |
| **Vercel** | Frontend deployment & CDN |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **Supabase (PostgreSQL)** | Managed database with realtime capabilities |
| **JWT + bcrypt** | Authentication & password security |
| **Render** | Backend deployment |

### Integrations

| Service | Usage |
|---|---|
| **Interswitch Web Checkout API** | Payment processing & settlement |
| **Interswitch OAuth 2.0** | Secure API authentication |
| **ExchangeRate API** | Live NGN → USD/GBP conversion |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT token |

### Hospitals

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/hospitals` | List all verified hospitals |
| `GET` | `/hospitals?search=lagos` | Search hospitals by name/location |
| `GET` | `/hospitals?location=Lagos` | Filter hospitals by city |
| `GET` | `/hospitals/:id` | Get single hospital details |

### Payments

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/checkout/pay` | Initiate Interswitch payment session |
| `GET` | `/checkout/callback` | Handle payment gateway callback |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/transactions` | Record a new transaction |
| `GET` | `/transactions` | Get authenticated user's payment history |
| `PATCH` | `/transactions/:ref/status` | Update transaction status |

---

## 🗺️ Frontend Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/hospitals` | Hospital directory with search & filters |
| `/payment/:id` | Payment form with FX conversion |
| `/payment/callback` | Payment receipt (success/failure) |
| `/transactions` | Transaction history |
| `/profile` | User profile & stats dashboard |

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Interswitch sandbox credentials

### Backend

```bash
git clone https://github.com/Hillary3000-web/Root-Access-Hackathon.git
cd Root-Access-Hackathon
npm install
cp .env.example .env   # Add your environment variables
node index.js
```

### Frontend

```bash
cd mediremit-frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

### Environment Variables

```env
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

## 🏗️ Architecture

```
┌──────────────────────┐       ┌──────────────────────┐
│   React + Vite       │◄─────►│   Express Backend    │
│   (Vercel)           │ REST  │   (Render)           │
└──────────────────────┘       └──────────┬───────────┘
                                          │
                          ┌───────────────┼───────────────┐
                          │               │               │
                   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
                   │  Supabase   │ │ Interswitch │ │ ExchangeRate│
                   │ PostgreSQL  │ │ Web Checkout│ │     API     │
                   └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 👥 Team

| Name | Role |
|---|---|
| **Hillary Chukwuma Prince** | Backend Lead & Full Stack — Architecture, Interswitch API integration, frontend UI/UX, database design, deployment |
|---|---|
| **Samson Chimaraoke** | Technical Advisor & Architectural Designer |
|---|---|
---

## 🏆 Built For

<p align="center">
  <img src="https://img.shields.io/badge/Enyata_×_Interswitch-Buildathon_2026-00d084?style=for-the-badge" alt="Buildathon 2026" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Category-Payments-0a0f1e?style=flat-square" alt="Payments" />
  <img src="https://img.shields.io/badge/Category-Cross--Border-0a0f1e?style=flat-square" alt="Cross-Border" />
  <img src="https://img.shields.io/badge/Category-Health-0a0f1e?style=flat-square" alt="Health" />
</p>

---

<p align="center">
  <strong>MediRemit</strong> — Stop sending cash home and hoping. Pay the hospital directly.<br/>
  <sub>© 2026 MediRemit. All rights reserved.</sub>
</p>
