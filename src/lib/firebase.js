// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsvPv8KzmdVWTzSP5wYUaDmq-eKbuoQZw",
  authDomain: "vridhi-real-estate.firebaseapp.com",
  projectId: "vridhi-real-estate",
  storageBucket: "vridhi-real-estate.firebasestorage.app",
  messagingSenderId: "440791844975",
  appId: "1:440791844975:web:b190c6993b486ae9cbe59a",
  measurementId: "G-PC7JWGMWQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };