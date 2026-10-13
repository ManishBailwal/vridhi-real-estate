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
  apiKey: "AIzaSyBdePCQ42nVUlA8tGplmPezELeJq0Brjqw",
  authDomain: "vridhi-real-estate-fbe03.firebaseapp.com",
  projectId: "vridhi-real-estate-fbe03",
  storageBucket: "vridhi-real-estate-fbe03.firebasestorage.app",
  messagingSenderId: "965976125906",
  appId: "1:965976125906:web:2fb5ebaeaa07a23047d80b",
  measurementId: "G-L91759KK0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };