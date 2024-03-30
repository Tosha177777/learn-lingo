import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const API_KEY = 'AIzaSyAxsDI5dBRpeIz7Zton6vO0AB99JKiwlbc';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'learn-lingo-cfe9e.firebaseapp.com',
  databaseURL: 'https://learn-lingo-cfe9e-default-rtdb.firebaseio.com',
  projectId: 'learn-lingo-cfe9e',
  storageBucket: 'learn-lingo-cfe9e.appspot.com',
  messagingSenderId: '763648465352',
  appId: '1:763648465352:web:6b4cfe1eeb186fe4f5c8fd',
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);