// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhQZGh7E17e1ICMUhYRLcNn5uZ4cnr2fo",
  authDomain: "portfolio-c9e55.firebaseapp.com",
  projectId: "portfolio-c9e55",
  storageBucket: "portfolio-c9e55.appspot.com",
  messagingSenderId: "1097639505177",
  appId: "1:1097639505177:web:5744f10e891a3a0cafe988",
  measurementId: "G-2HHHS5C89W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);





