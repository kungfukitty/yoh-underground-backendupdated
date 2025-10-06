'use strict';
const base = process.env.API_BASE || 'http://localhost:8080';
(async () => {
  const health = await fetch(base + '/api/health').then(r=>r.json()).catch(e=>({error:e.message}));
  console.log('Health:', health);
  const reset = await fetch(base + '/api/auth/reset', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email:'someone@example.com', continueUrl:'http://localhost:5173/reset' }) })
    .then(async r=>({ status:r.status, body: await r.json() })).catch(e=>({error:e.message}));
  console.log('Reset email:', reset);
})();

