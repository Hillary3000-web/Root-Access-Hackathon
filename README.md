<p align="center">
  <img src="https://img.shields.io/badge/MediRemit-Cross--Border%20Healthcare%20Payments-00d084?style=for-the-badge&logoColor=white" alt="MediRemit" />
</p>

<h1 align="center">🏥 MediRemit</h1>

<p align="center">
  <strong>Pay Nigerian hospitals directly — from anywhere in the world.</strong><br/>
  <em>Built for the Enyata × Interswitch Buildathon 2026</em>
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

MediRemit is a **cross-border healthcare payment platform** that enables Nigerians in the diaspora to pay hospital bills directly — bypassing middlemen, eliminating wire transfer delays, and ensuring every naira reaches the hospital.

> _"Your mum needs care. Pay her hospital right now."_

Built on **Interswitch's Web Checkout API**, MediRemit provides instant, secure, and transparent payments to verified Nigerian hospitals from anywhere in the world.

---

## 💡 The Problem

Millions of Nigerians abroad face the same painful cycle when a family member needs medical care:

| Pain Point | Impact |
|---|---|
| ⏰ **Wire transfers take 3–5 days** | Delays life-saving treatment |
| 💸 **5–10% lost in fees** | Correspondent banks, hidden FX markups, and withdrawal charges |
| ❌ **No payment guarantee** | Cash sent to relatives may never reach the hospital |
| 🔍 **Zero transparency** | No receipts, no tracking, no proof of payment |

## ✅ The Solution

MediRemit **eliminates the middleman entirely**:

1. **Search** our verified hospital directory
2. **Enter** the patient name and amount
3. **Pay** — funds settle directly into the hospital's account via Interswitch
4. **Track** — both sender and hospital receive instant digital receipts

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏥 **Hospital Directory** | Search and browse verified Nigerian hospitals by name, location, or specialty |
| 💳 **Direct Hospital Payment** | Pay hospitals instantly via Interswitch Web Checkout — no middleman |
| 📊 **Transaction History** | Full payment ledger with real-time status tracking (Successful / Pending / Failed) |
| 🔐 **Secure Authentication** | JWT-based auth with bcrypt password hashing |
| 🗄️ **Real Database** | All data persisted in Supabase (PostgreSQL) |
| 🎨 **Premium Dark UI** | Modern glassmorphism design inspired by Stripe, Deel, and Remote.com |

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

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework |
| **Vite** | Lightning-fast build tool |
| **React Router DOM** | Client-side routing |
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
| **Supabase Realtime** | Live database sync |

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

Create a `.env` file in the project root:

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
│    React Frontend    │◄─────►│   Express Backend    │
│    (Vercel)          │ REST  │   (Render)           │
└──────────────────────┘       └──────────┬───────────┘
                                          │
                          ┌───────────────┼───────────────┐
                          │               │               │
                   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
                   │  Supabase   │ │ Interswitch │ │    JWT      │
                   │ PostgreSQL  │ │ Web Checkout│ │   Auth      │
                   └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 👥 Team

| Name | Role |
|---|---|
| **Hillary Chukwuma Prince** | Backend Lead — Architecture, Interswitch API integration, database design, deployment |

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
  <strong>MediRemit</strong> — Your family deserves certainty. Give it to them.<br/>
  <sub>© 2026 MediRemit. All rights reserved.</sub>
</p>