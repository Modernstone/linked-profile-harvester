
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcdAdxc_-7xsSQ4OlQmoTLNnxpUvuACKw",
  authDomain: "linkedin-vite-extension.firebaseapp.com",
  projectId: "linkedin-vite-extension",
  storageBucket: "linkedin-vite-extension.firebasestorage.app",
  messagingSenderId: "790333553392",
  appId: "1:790333553392:web:3b3595f64811079bf46035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
