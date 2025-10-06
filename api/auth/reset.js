'use strict';
const express = require('express');
const router = express.Router();
const fetch = global.fetch;

/**
 * POST /api/auth/reset
 * Body: { email, continueUrl? }
 */
router.post('/reset', async (req, res) => {
  try {
    const { email, continueUrl } = req.body || {};
    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!apiKey) return res.status(500).json({ error:'Auth not configured.' });
    if (!email) return res.status(400).json({ error:'Email is required.' });
    const payload = { requestType: 'PASSWORD_RESET', email };
    if (continueUrl) payload.continueUrl = continueUrl;
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    const data = await r.json();
    if (!r.ok) return res.status(400).json({ error: data?.error?.message || 'Unable to send reset email.' });
    return res.json({ ok:true, email: data.email || email });
  } catch (e) { console.error('reset error', e); return res.status(500).json({ error:'Server error' }); }
});

/**
 * POST /api/auth/reset/verify
 * Body: { oobCode }
 */
router.post('/reset/verify', async (req, res) => {
  try {
    const { oobCode } = req.body || {};
    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!apiKey) return res.status(500).json({ error:'Auth not configured.' });
    if (!oobCode) return res.status(400).json({ error:'oobCode is required.' });
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ oobCode })
    });
    const data = await r.json();
    if (!r.ok) return res.status(400).json({ error: data?.error?.message || 'Invalid or expired code.' });
    return res.json({ ok:true, email: data.email });
  } catch (e) { console.error('verify reset error', e); return res.status(500).json({ error:'Server error' }); }
});

/**
 * POST /api/auth/reset/confirm
 * Body: { oobCode, newPassword }
 */
router.post('/reset/confirm', async (req, res) => {
  try {
    const { oobCode, newPassword } = req.body || {};
    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!apiKey) return res.status(500).json({ error:'Auth not configured.' });
    if (!oobCode || !newPassword) return res.status(400).json({ error:'oobCode and newPassword are required.' });
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ oobCode, newPassword })
    });
    const data = await r.json();
    if (!r.ok) return res.status(400).json({ error: data?.error?.message || 'Unable to set new password.' });
    return res.json({ ok:true, email: data.email });
  } catch (e) { console.error('confirm reset error', e); return res.status(500).json({ error:'Server error' }); }
});

module.exports = router;

