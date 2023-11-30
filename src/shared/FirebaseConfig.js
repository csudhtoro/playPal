// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAovgB1rIifvTn4a9NfNfT63G-rZJf7pbY",
  authDomain: "playpal-17859.firebaseapp.com",
  projectId: "playpal-17859",
  storageBucket: "playpal-17859.appspot.com",
  messagingSenderId: "1009450259912",
  appId: "1:1009450259912:web:e8a0c29bb5231b68ac9cfd",
  measurementId: "G-XDMF0WBZJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
