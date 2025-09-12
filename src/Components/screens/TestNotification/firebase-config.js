
// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyDy-M3UFvX7_T-MsFE7DEowKcMeratR278",
//     authDomain: "wetflix-892f1.firebaseapp.com",
//     projectId: "wetflix-892f1",
//     storageBucket: "wetflix-892f1.firebasestorage.app",
//     messagingSenderId: "831014969386",
//     appId: "1:831014969386:web:efb2e490c81ad903382353",
//     measurementId: "G-D2Z2JNY4GK"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyBwJPE6_b-QqXNVKLzEUlpstMp9ks1n5Lo",
  authDomain: "wetflix-sample-app.firebaseapp.com",
  projectId: "wetflix-sample-app",
  storageBucket: "wetflix-sample-app.firebasestorage.app",
  messagingSenderId: "1090486972049",
  appId: "1:1090486972049:web:a17a024bf45ff979045930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export { messaging };
