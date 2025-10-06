# Yoh Underground Backend

Production-ready Express backend with Firebase Auth (REST), JWT sessions, strict CORS, Helmet security headers, rate limiting, logging, and health checks.

## Structure
```
yoh-underground-backend/
├── api/
│   ├── auth/
│   │   └── login.js
│   ├── health.js
│   └── middleware/
│       └── cors.js
├── config/
│   └── firebase.js
├── utils/
│   └── jwt.js
├── server.js
├── package.json
├── render.yaml
├── .env
├── .env.example
├── .gitignore
├── test.js
└── README.md
```

## Quick Start
```bash
npm install
cp .env.example .env
# Fill .env with JWT secret + Firebase creds and CORS FRONTEND_ORIGIN
npm run dev
```
Server: http://localhost:8080

## Endpoints
- `GET /api/health` → uptime + timestamp
- `POST /api/auth/login` → `{ email, password }` → returns `{ token, user, firebaseIdToken, refreshToken }`

## Deploy on Render
- Use `render.yaml`
- Add env vars from `.env.example`
- Deploy

