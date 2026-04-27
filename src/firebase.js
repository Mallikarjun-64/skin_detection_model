import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDALa5aYR06bZ9_wy5hrd0qU1BhO6VgJ1Y",
  authDomain: "skincare-73bdc.firebaseapp.com",
  projectId: "skincare-73bdc",
  storageBucket: "skincare-73bdc.firebasestorage.app",
  messagingSenderId: "94362571640",
  appId: "1:94362571640:web:decd3d8de343b3080c2e8d",
  measurementId: "G-68W9CJN17C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
