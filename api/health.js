'use strict';
module.exports = (req, res) => {
  res.json({ ok: true, uptime: process.uptime(), timestamp: Date.now(), env: process.env.NODE_ENV || 'production' });
};

