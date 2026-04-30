# Namma Taxi — Backend

Production-grade Express.js backend for the Namma Taxi booking platform.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB (via `mongoose`) |
| Auth | JWT (`jsonwebtoken`) |
| Validation | `express-validator` |
| Logging | `winston` + `morgan` |
| Security | `helmet`, `cors`, `express-rate-limit` |

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local instance or MongoDB Atlas cluster)

### 1. Configure environment

```bash
# From the /backend directory
cp .env.example .env
```

Open `.env` and set:
- `MONGODB_URI` — your MongoDB connection string (default: `mongodb://127.0.0.1:27017/namma_taxi`)
- `JWT_SECRET` — any long random string (use `openssl rand -hex 64`)

### 2. Start the dev server

```bash
npm run dev
```

Server starts on `http://localhost:5000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Liveness + DB readiness check |
| GET | `/api/v1` | API info + module list |
| ALL | `/api/v1/auth/*` | Auth (Phase 2 stub) |
| ALL | `/api/v1/bookings/*` | Bookings (Phase 2 stub) |
| ALL | `/api/v1/customers/*` | Customers (Phase 2 stub) |
| ALL | `/api/v1/drivers/*` | Drivers (Phase 2 stub) |
| ALL | `/api/v1/vehicle-categories/*` | Vehicle categories (Phase 2 stub) |
| ALL | `/api/v1/pricing/*` | Pricing (Phase 2 stub) |
| ALL | `/api/v1/quotes/*` | Quote engine (Phase 2 stub) |
| ALL | `/api/v1/staff/*` | Staff (Phase 2 stub) |
| ALL | `/api/v1/attendance/*` | Attendance (Phase 2 stub) |
| ALL | `/api/v1/settings/*` | Settings (Phase 2 stub) |
| ALL | `/api/v1/addresses/*` | Customer addresses (Phase 2 stub) |
| ALL | `/api/v1/notifications/*` | Notifications (Phase 2 stub) |
| ALL | `/api/v1/analytics/*` | Analytics (Phase 2 stub) |
| ALL | `/api/v1/audit-logs/*` | Audit logs (Phase 2 stub) |
| ALL | `/api/v1/seo/*` | SEO/Keywords (Phase 2 stub) |

**Health response example (DB connected):**
```json
{
  "status": "ok",
  "timestamp": "2026-04-28T16:30:00.000Z",
  "uptime": 120,
  "environment": "development",
  "services": {
    "database": { "status": "connected", "name": "namma_taxi" }
  }
}
```

---

## Project Structure

```
backend/
├── src/
│   ├── server.js              # Entry point — boot, listen, shutdown
│   ├── app.js                 # Express app factory + middleware
│   │
│   ├── config/
│   │   ├── env.js             # Centralized env config (fail-fast)
│   │   └── database.js        # MongoDB connection via Mongoose
│   │
│   ├── utils/
│   │   ├── AppError.js        # Custom error class with factory helpers
│   │   ├── asyncHandler.js    # Async route wrapper
│   │   ├── apiResponse.js     # Standardized JSON response helpers
│   │   └── logger.js          # Winston structured logger
│   │
│   ├── middleware/
│   │   ├── auth.js            # protect / authorize / optionalAuth
│   │   ├── validate.js        # express-validator result middleware
│   │   ├── requestLogger.js   # Morgan → Winston HTTP logging
│   │   ├── errorHandler.js    # Global error handler
│   │   └── notFoundHandler.js # 404 catch-all
│   │
│   ├── routes/
│   │   ├── health.js          # GET /api/health
│   │   └── v1/
│   │       ├── index.js       # /api/v1 router
│   │       ├── auth.routes.js
│   │       ├── bookings.routes.js
│   │       └── ...            # One file per module
│   │
│   └── modules/               # Domain modules (controller/service/repository/validators)
│       ├── auth/
│       ├── bookings/
│       ├── customers/
│       └── ...
│
├── .env                       # Local dev config (gitignored)
├── .env.example               # Template for all env vars
├── package.json
└── nodemon.json
```

---

## Architecture Decisions

### Response Envelope
All responses use a consistent envelope:
```json
{ "success": true, "message": "...", "data": {}, "meta": {} }
{ "success": false, "message": "...", "code": "ERROR_CODE", "errors": [] }
```

### Error Handling
Errors flow through: `asyncHandler → errorHandler middleware`.
- `AppError` = operational (user-facing, safe to expose)
- Unknown errors masked in production with generic message

### Auth Pattern
`protect → authorize('admin', 'staff')` chained middleware.
JWT payload: `{ userId, role }`.

### DB Access Pattern
`routes → controller → service → repository → Mongoose Model`  

---

## Running Frontend + Backend Together

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
# → http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
# → http://localhost:5173
```

The frontend's `.env.local` points `VITE_API_BASE_URL` to `http://localhost:5000/api/v1`.  
The frontend API client is at `src/lib/api.js` — not wired to UI yet (Phase 2).

---

## Phase 2 — What to Implement Next

### Priority order

1. **Auth module** (`POST /auth/login`, `POST /auth/admin/login`, OTP flow, JWT issue)
2. **Vehicle Categories CRUD** (simple seed + admin API)
3. **Base Pricing CRUD** (admin API for fare configuration)
4. **Quote Engine** (`POST /quotes` — calculate fare from trip params)
5. **Booking creation** (`POST /bookings` — create from frontend checkout)
6. **Admin booking list** (`GET /admin/bookings` — replace mock data in AllBookings.jsx)
7. **Customer CRUD** (register, profile, address management)
8. **Driver CRUD** (admin panel, wallet tracking)
9. **Staff CRUD + login** (replace mock AuthContext with real JWT)
10. **Attendance** (check-in/check-out per staff)
11. **Settings API** (save/load from DB instead of console.log)
12. **Notifications** (SMS via Twilio, email via SMTP)
13. **Analytics** (dashboard stats from real DB)
14. **SEO/Keywords** (dynamic content)

### Frontend wiring for Phase 2
- Replace `UserModule.jsx` mock `handleBookClick` with real `POST /api/v1/bookings`
- Replace `data.js` hardcoded cabs with `GET /api/v1/vehicle-categories`
- Replace `AuthContext.jsx` dummy user with real JWT auth
- Wire admin pages to real API endpoints

---

## Assumptions Made in Phase 1

1. MongoDB is the chosen database
2. Auth will be JWT-based (not session-based)
3. Customer login will use phone + OTP (common for taxi apps in India); email/password is optional
4. Admin/Staff login uses email + password
5. `booking_ref` format matches existing UI (e.g. `NT-8679`)
6. Driver wallet is tracked in-app (not external payment gateway)
7. The `staff` collection also covers admin roles (`role` enum includes `admin`)
8. Pricing is per trip-type + vehicle category (not per route/zone in Phase 1)
9. The frontend's `data.js` mock cab data maps to `vehicle_categories` collection
10. No real OTP/SMS provider is configured in Phase 1 — that's a Phase 2 dependency

---

*Phase 1 complete — backend foundation is runnable, clean, and ready for Phase 2 module implementation.*
