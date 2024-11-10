// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADrUky6loigwkwuBn7oKb-Zo5QDxrLQ58",
  authDomain: "email-password-d8e1a.firebaseapp.com",
  projectId: "email-password-d8e1a",
  storageBucket: "email-password-d8e1a.firebasestorage.app",
  messagingSenderId: "212493307358",
  appId: "1:212493307358:web:52e1fe8991c53e1d58214f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
