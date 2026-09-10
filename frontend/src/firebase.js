import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAk0tATTG7CIShZoDvER-dx0_7v6-ezkws',
  authDomain: 'homefield-properties.firebaseapp.com',
  projectId: 'homefield-properties',
  storageBucket: 'homefield-properties.firebasestorage.app',
  messagingSenderId: '565618407777',
  appId: '1:565618407777:web:fc16bde06b39e23140ed20',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);