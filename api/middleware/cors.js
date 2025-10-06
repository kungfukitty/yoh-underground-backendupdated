'use strict';
const cors = require('cors');
const allowed = process.env.FRONTEND_ORIGIN || '';
const whitelist = allowed.split(',').map(s => s.trim()).filter(Boolean);
module.exports = cors({
  origin(origin, cb){
    if (!origin) return cb(null, true);
    if (whitelist.length===0 || whitelist.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials:true,
  methods:['GET','POST','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
});

