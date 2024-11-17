import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAikbvSfw9Mj9oDPiWIXZ0NdWkY-uxUohM",
  authDomain: "orchid-a9686.firebaseapp.com",
  projectId: "orchid-a9686",
  storageBucket: "orchid-a9686.appspot.com",
  messagingSenderId: "863732124115",
  appId: "1:863732124115:web:056d9f0cd02a1793adc726",
  measurementId: "G-12BR6JHSW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app); // Initialize Firebase Storage
