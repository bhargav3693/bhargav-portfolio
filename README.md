# B. Bhargav — Full-Stack Portfolio

A premium, production-level portfolio web application built with **React + Vite**, **Tailwind CSS**, **Three.js**, **Framer Motion**, **GSAP** on the frontend, and **Node.js + Express + MongoDB** on the backend.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 Design | Dark luxury theme, glassmorphism UI, glow highlights |
| 🌐 3D Hero | Three.js animated icosahedron + particles |
| 🖱️ Cursor | Animated custom cursor with glow ring |
| 📐 Animations | Framer Motion page transitions, GSAP character animation, scroll-triggered reveals |
| 📊 Skills | Animated radial SVG charts + progress bars |
| 📬 Contact Form | Floating labels, glow focus, stores in MongoDB |
| 🔒 Backend | Rate-limited REST API with Helmet security headers |
| 📱 Responsive | Fully mobile-compatible |
| 🔍 SEO | Meta tags, Open Graph, semantic HTML |

---

## 🗂️ Project Structure

```
portfolio/
├── frontend/                 # Vite + React application
│   ├── src/
│   │   ├── components/       # Navbar, CustomCursor, HeroCanvas, PageTransition
│   │   ├── pages/            # Home, About, Projects, Skills, Contact
│   │   ├── App.jsx           # Router with AnimatePresence
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                  # Node.js + Express + MongoDB API
    └── src/
        ├── models/Contact.js
        ├── controllers/contactController.js
        ├── routes/contact.js
        ├── middleware/auth.js
        └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 1. Backend Setup

```bash
cd portfolio/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env: set MONGO_URI and ADMIN_SECRET

# Start development server
npm run dev
```

The API runs at **http://localhost:5000**

**API Endpoints:**

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit contact message |
| `GET` | `/api/contact/admin` | View messages (requires `x-admin-secret` header) |
| `GET` | `/api/health` | Health check |

---

### 2. Frontend Setup

```bash
cd portfolio/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at **http://localhost:5173**

> The Vite dev server proxies `/api/*` requests to `localhost:5000` automatically — no CORS issues during development.

---

### 3. Build for Production

```bash
# Frontend
cd frontend && npm run build

# Backend — set NODE_ENV=production in .env
cd backend && npm start
```

---

## 🌱 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bhargav_portfolio
NODE_ENV=development
ADMIN_SECRET=your_secret_key_here
```

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite 5, Tailwind CSS 3, Framer Motion, Three.js, GSAP, React Router 6, Axios

**Backend:** Node.js, Express 4, MongoDB, Mongoose 8, Helmet, CORS, Express Rate Limit

---

## 📄 License

Built with ❤️ by **B. Bhargav** · For personal and professional use only.
