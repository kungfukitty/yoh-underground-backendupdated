'use strict';
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const EXPIRES_IN = '7d';

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}
function verify(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}
module.exports = { sign, verify };

