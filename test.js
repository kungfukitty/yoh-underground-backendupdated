'use strict';
const base = process.env.API_BASE || 'http://localhost:8080';

(async () => {
  const health = await fetch(base + '/api/health').then(r => r.json()).catch(e => ({ error: e.message }));
  console.log('Health:', health);

  const login = await fetch(base + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'peacefest08@gmail.com', password: 'newSecurePassword123' })
  }).then(async r => ({ status: r.status, body: await r.json() })).catch(e => ({ error: e.message }));
  console.log('Login:', login);
})();

