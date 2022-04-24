exports.PORT = process.env.PORT || 8080;
exports.DOMAINS = process.env.DOMAINS;
const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');

exports.fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});