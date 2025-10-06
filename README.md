# Yoh Underground Backend (with Password Reset)
Endpoints:
- POST /api/auth/reset           { email, continueUrl? }       → { ok, email }
- POST /api/auth/reset/verify    { oobCode }                   → { ok, email }
- POST /api/auth/reset/confirm   { oobCode, newPassword }      → { ok, email }

Existing:
- POST /api/auth/login           { email, password }           → { token, user, firebaseIdToken, refreshToken }
- GET  /api/health

