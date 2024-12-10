// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ai-trip-planner-3d5ca.firebaseapp.com",
  projectId: "ai-trip-planner-3d5ca",
  storageBucket: "ai-trip-planner-3d5ca.firebasestorage.app",
  messagingSenderId: "514761810076",
  appId: "1:514761810076:web:5bb5afff214e21977bcd59",
  measurementId: "G-B7MFNGKT6K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);