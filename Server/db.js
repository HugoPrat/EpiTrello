const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyAtkwQrPtR5nEA251SlEGA12JHKZKY9IGs',
  authDomain: 'epitrello-1380b.firebaseapp.com',
  databaseURL: 'https://epitrello-1380b.firebaseio.com',
  projectId: 'epitrello-1380b',
  storageBucket: 'epitrello-1380b.appspot.com',
  messagingSenderId: '471833465997',
  appId: '1:471833465997:web:16e8442062fc49e90d3ec4',
  measurementId: 'G-NDKG28CFDY'
};

firebase.initializeApp(firebaseConfig);

const admin = require('firebase-admin');
const serviceAccount = require('./config/epitrello-1380b-firebase-adminsdk-r980d-7062c4575c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore();

module.exports = { db, admin };
