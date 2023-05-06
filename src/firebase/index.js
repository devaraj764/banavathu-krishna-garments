// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"
import {getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9xrwbhST4ymbDRLBuH2icpDSA63NYN1o",
  authDomain: "bkembroideryworks.firebaseapp.com",
  projectId: "bkembroideryworks",
  storageBucket: "bkembroideryworks.appspot.com",
  messagingSenderId: "223348037382",
  appId: "1:223348037382:web:a910de9b71821b7d7c3087",
  measurementId: "G-JFZM6YFT38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export const storage = getStorage(app);
// const analytics = getAnalytics(app);