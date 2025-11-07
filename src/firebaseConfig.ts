import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

//Перекинуть все в .env
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAx5g_jL5VbLtSIWFA_QGQ5kbmcyvl4VjI',
  authDomain: 'pixema-775fd.firebaseapp.com',
  projectId: 'pixema-775fd',
  storageBucket: 'pixema-775fd.firebasestorage.app',
  messagingSenderId: '177331059386',
  appId: '1:177331059386:web:84c0b03da52a700babe083',
  measurementId: 'G-BFCXL45RVW',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
