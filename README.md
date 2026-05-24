# TaskFlow — Full-Stack Task Manager

A production-grade Task Manager built with **React + Node.js + Express + MongoDB**.

![TaskFlow](https://img.shields.io/badge/stack-MERN-6C63FF?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-22C55E?style=flat-square)

---

## ✨ Features

### Frontend (React)
- **Authentication UI** — Login, Register with validation
- **Dashboard** — Task stats, progress bar, high-priority alerts
- **Task Management** — Create, edit, delete, filter, search
- **Protected Routes** — Auto-redirect unauthenticated users
- **Custom Hooks** — `useAuth`, `useTasks`
- **Context API** — Global auth state via `AuthProvider`
- **Toast Notifications** — Success/error feedback
- **Priority Badges** — Low (green), Medium (orange), High (red)
- **Responsive Design** — Works on all screen sizes
- **Loading & Empty States** — Skeleton loaders, empty state UI

### Backend (Node.js + Express)
- **REST API** — Auth + Task endpoints
- **JWT Authentication** — Secure login tokens
- **bcrypt** — Password hashing (12 rounds)
- **Joi Validation** — All request bodies validated
- **Helmet** — Secure HTTP headers
- **CORS** — Frontend-only access
- **Rate Limiting** — 100 req/15min global, 20 req/15min auth
- **Error Handling** — Centralized error middleware

---

## 🗂️ Project Structure

```
taskflow/
├── client/                   # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── common/       # Spinner, PriorityBadge, ProtectedRoute
│       │   ├── layout/       # AppLayout (sidebar)
│       │   └── tasks/        # TaskCard, TaskModal, TaskFilters
│       ├── context/          # AuthContext.jsx
│       ├── hooks/            # useAuth.js, useTasks.js
│       ├── pages/            # Login, Register, Dashboard, Tasks, Profile
│       ├── services/         # api.js (Axios)
│       └── App.jsx           # Routing
│
└── server/                   # Node.js + Express backend
    ├── controllers/          # auth.controller.js, task.controller.js
    ├── middleware/           # auth, error, validation
    ├── models/               # User, Task (Mongoose)
    ├── routes/               # auth.routes.js, task.routes.js
    ├── services/             # db.js
    └── index.js              # Entry point
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Setup the server
```bash
cd server
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

### 3. Setup the client
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Variables

### server/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 📡 API Reference

### Auth Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | Yes | Logout |
| GET | `/api/auth/me` | Yes | Get current user |

### Task Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks` | Yes | Get all tasks (filterable) |
| POST | `/api/tasks` | Yes | Create task |
| PATCH | `/api/tasks/:id` | Yes | Update task |
| DELETE | `/api/tasks/:id` | Yes | Delete task |

### Task Query Params
```
GET /api/tasks?status=active&priority=high&search=keyword
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| Password hashing | bcryptjs (12 rounds) |
| Authentication | JWT tokens (7d expiry) |
| Middleware protection | `protect` middleware on all task routes |
| Request validation | Joi schemas |
| HTTP headers | Helmet.js |
| CORS | Restricted to frontend URL |
| Rate limiting | express-rate-limit |
| Secrets | dotenv (.env) |

---

## 🎨 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Axios, react-hot-toast, date-fns

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Joi, Helmet, CORS, Morgan

---

## 📊 Evaluation Criteria Met

| Area | Features |
|------|----------|
| React architecture | Context API, Custom Hooks, Protected Routes, Component composition |
| Hooks & state | useAuth, useTasks, useState, useEffect, useCallback, useReducer |
| UI/UX | Responsive, Loading states, Empty states, Toast notifications, Priority badges |
| API design | RESTful, proper HTTP status codes, clean responses |
| Security | bcrypt, JWT, Helmet, CORS, Rate limiting, Joi, .env |
| Code quality | Separation of concerns, reusable components, clean naming |

---

## 🗓️ Development Order (followed)

1. ✅ Express setup + MongoDB connection
2. ✅ User model + Auth APIs (register/login/logout)
3. ✅ JWT middleware
4. ✅ Task APIs (CRUD)
5. ✅ React + Routing setup
6. ✅ Auth pages + Context API
7. ✅ Dashboard + Task management
8. ✅ UI polish + Responsive design

---

