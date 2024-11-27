import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqX9KZBZWxeKr2GGvPnQZqHWBT1Bjk-FU",
  authDomain: "legal-text-robot.firebaseapp.com",
  projectId: "legal-text-robot",
  storageBucket: "legal-text-robot.appspot.com",
  messagingSenderId: "339876543210",
  appId: "1:339876543210:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();