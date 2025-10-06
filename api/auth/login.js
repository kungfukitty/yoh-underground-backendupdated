'use strict';
const fetch = global.fetch;
const { sign } = require('../../utils/jwt');
const { initFirebase } = require('../../config/firebase');

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Uses Firebase Auth REST API (signInWithPassword) with FIREBASE_WEB_API_KEY
 * Returns: { token, user, firebaseIdToken, refreshToken }
 */
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Auth not configured.' });

    initFirebase(); // optional future use

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const data = await r.json();

    if (!r.ok) {
      const msg = data?.error?.message || 'Authentication failed';
      return res.status(401).json({ error: msg });
    }

    const user = { uid: data.localId, email: data.email };
    const token = sign({ sub: user.uid, email: user.email });

    res.json({ token, user, firebaseIdToken: data.idToken, refreshToken: data.refreshToken });
  } catch (e) {
    console.error('login error', e);
    res.status(500).json({ error: 'Server error' });
  }
};

