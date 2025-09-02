// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3b58e.firebaseapp.com",
  projectId: "mern-estate-3b58e",
  storageBucket: "mern-estate-3b58e.firebasestorage.app",
  messagingSenderId: "270810211424",
  appId: "1:270810211424:web:69813a396e4e5e8b5f0f05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);