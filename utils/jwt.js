'use strict';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const EXPIRES_IN = '7d';
module.exports.sign = (payload)=>jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
module.exports.verify = (t)=>{ try { return jwt.verify(t, JWT_SECRET); } catch { return null; } };

