// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDrply-Ni9SymgnsOVSOyKfLDOzy7giEgw",
  authDomain: "stackpham-defaa.firebaseapp.com",
  projectId: "stackpham-defaa",
  storageBucket: "stackpham-defaa.appspot.com",
  messagingSenderId: "1050713801515",
  appId: "1:1050713801515:web:5569860d2d56e6f6537b6e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
