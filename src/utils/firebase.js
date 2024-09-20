// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFaCVgGiqJ0x0153eDey4Z0IkBMc0PIGI",
  authDomain: "netflixgpt-81199.firebaseapp.com",
  projectId: "netflixgpt-81199",
  storageBucket: "netflixgpt-81199.appspot.com",
  messagingSenderId: "853877822339",
  appId: "1:853877822339:web:01fd3161adf86b8c385cb6",
  measurementId: "G-EMD6JZZKN7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth };
