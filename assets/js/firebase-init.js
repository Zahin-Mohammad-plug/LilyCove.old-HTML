// firebase-init.js
// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLelX72MP-eG-7A6qzeggwP5T6IW-gFD8",
  authDomain: "lilycove-37982.firebaseapp.com",
  projectId: "lilycove-37982",
  storageBucket: "lilycove-37982.firebasestorage.app",
  messagingSenderId: "276450531373",
  appId: "1:276450531373:web:392f734be691a29fb200a4",
  measurementId: "G-CJSBHB1TS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
