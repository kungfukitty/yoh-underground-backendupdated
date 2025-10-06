'use strict';
const admin = require('firebase-admin');

let app;
function initFirebase() {
  if (app) return app;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey && privateKey.startsWith('"')) {
    try { privateKey = JSON.parse(privateKey); } catch {}
  }

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('⚠️ Firebase Admin not fully configured. Skipping Admin initialization.');
    return null;
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey })
  });
  return app;
}
module.exports = { admin, initFirebase };

