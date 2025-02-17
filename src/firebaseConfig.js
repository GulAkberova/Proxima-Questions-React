// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc,getDocs ,getDoc,doc, updateDoc} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn3D45uOdrc6ZqKOAueROF413BjDcWEyo",
  authDomain: "proxima-forms-aec15.firebaseapp.com",
  projectId: "proxima-forms-aec15",
  storageBucket: "proxima-forms-aec15.firebasestorage.app",
  messagingSenderId: "500222566384",
  appId: "1:500222566384:web:073313632c853d1b9bc735",
  measurementId: "G-78E505YNVV",
};
// console.log(getFirestore,'77777777777777777777');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// console.log(db,'5555555555555555555555555');

export {
  db,
  addDoc,
  getDocs,
  getDoc,
  collection,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  doc, updateDoc
};
