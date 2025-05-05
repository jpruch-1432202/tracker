import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Check if any required Firebase config values are missing
const missingValues = Object.entries(firebaseConfig)
  .filter(([_, value]) => value === undefined)
  .map(([key]) => key);

if (missingValues.length > 0) {
  console.error(`FIREBASE CONFIG ERROR: Missing environment variables: ${missingValues.join(', ')}`);
  console.error('Make sure your .env file exists and has these variables defined');
} else {
  console.log('FIREBASE CONFIG initialized successfully');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
