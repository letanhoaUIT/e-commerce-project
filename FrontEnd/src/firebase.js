// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFx1oPNhPySNng3vMHVx7Pk_WJkCEtsBE",
  authDomain: "login-laravel-2409a.firebaseapp.com",
  projectId: "login-laravel-2409a",
  storageBucket: "login-laravel-2409a.appspot.com",
  messagingSenderId: "382883152752",
  appId: "1:382883152752:web:1e00b0efb1b40f3ff785b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
