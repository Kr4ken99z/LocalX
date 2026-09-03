# LocalX — Hyperlocal Service Marketplace

> A production-grade Hyperlocal Marketplace connecting customers with verified local service professionals with an integrated Admin Governance Portal.

![LocalX Platform](./localx-hero.png)

---

## ⚡ 1. Three-Portal Product

| Portal | Audience | Core Capabilities |
| :--- | :--- | :--- |
| **Customer Portal** | Homeowners & Businesses | Instant service search, nearby discovery with Leaflet map, verified professional profiles, deterministic Trust Scores, booking lifecycle tracking, Socket.IO direct chat, post-completion reviews, and dispute creation. |
| **Professional Portal** | Service Providers & Technicians | Real-time incoming request dispatch (Accept/Decline), live job lifecycle tracker (`ON_THE_WAY` → `IN_PROGRESS` → `COMPLETED`), custom service & price catalog management, government ID & trade certificate verification center, live customer chat. |
| **Admin Portal** | Platform Governance & Operations | Real-time platform KPI metrics & volume dashboard, professional document verification queue (Approve/Reject with remarks), user directory & suspension controls, dispute investigation console, service category manager, and immutable audit logs. |

---

## 🛠️ 2. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router v6, Axios, Socket.IO-Client, React-Leaflet / OpenStreetMap.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JWT authentication, bcryptjs, Socket.IO, Multer.
- **Database**: MongoDB (Supports MongoDB Atlas, Local MongoDB, or automatic embedded `mongodb-memory-server` for zero-configuration local development).
- **Design System**: Slate/Navy luxury dark aesthetic (`#080f1c`), glassmorphism panels, glowing teal (`#2dd4bf`) and violet (`#8b5cf6`) accents.

---

## 🛡️ 3. Deterministic LocalX Trust Score Engine

LocalX replaces arbitrary review systems with an algorithmic, tamper-resistant Trust Score (0 to 100):

$$\text{Trust Score} = \text{Verification (25 pts)} + \text{Rating (35 pts)} + \text{Job Volume (20 pts)} + \text{Response Rate (10 pts)} + \text{Cancellation Reliability (10 pts)}$$

- **Elite Pro**: 90 – 100 pts
- **Verified Master**: 75 – 89 pts
- **Rising Pro**: 60 – 74 pts
- **Newcomer**: < 60 pts

---

## 🚀 4. Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
Clone or navigate to the repository:
```bash
cd c:\Programming\Projects\LocalX
npm run install:all
```

### Starting the Full Stack App
Start both the Express API (Port 5000) and the Vite frontend (Port 5173) with one command:
```bash
npm run dev
```

Visit the app in your browser:
**[http://localhost:5173](http://localhost:5173)**

---

## 🔑 5. Pre-Seeded Demo Credentials

Use the **Sandbox Switcher Bar** at the top of the interface for instant 1-click role jumping, or log in manually with:

| Role | Email | Password | Pre-loaded Context |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@localx.app` | `password123` | Priya Sharma (Indiranagar, Bengaluru) • 1 Completed Booking, 1 In-Progress Booking |
| **Professional** | `pro@localx.app` | `password123` | Rajesh Kumar (SparkVolt Electricals) • 84 Completed Jobs, 4.9★ Rating, 94 Trust Score |
| **Admin** | `admin@localx.app` | `password123` | LocalX Platform Admin • Full governance access to verification queue, disputes, audit log |

---

## 📁 6. Project Architecture

```
LocalX/
├── package.json               # Full-stack runner scripts
├── README.md
├── server/
│   ├── config/db.js           # Auto-provisioning MongoDB connection
│   ├── models/                # User, Professional, Service, Booking, Review, Dispute, AuditLog
│   ├── controllers/           # Auth, Pro, Booking, Review, Chat, Admin, Services
│   ├── routes/                # REST endpoints
│   ├── sockets/chatSocket.js  # Real-time WebSockets
│   ├── utils/trustScore.js    # Deterministic Trust Score calculator
│   └── seed/seedData.js       # Pre-seeded Bangalore hyperlocal dataset
└── client/
    ├── src/
    │   ├── context/           # AuthContext (with 1-click demo switcher) & SocketContext
    │   ├── components/        # Navbar, Footer, TrustScoreBadge, LeafletMap, BookingModal, ReviewModal, DisputeModal
    │   └── pages/             # HomePage, ExplorePage, ProProfile, Portals (Customer, Pro, Admin), ChatPage
```
