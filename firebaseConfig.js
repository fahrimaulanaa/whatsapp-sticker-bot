// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChh9YDP1ltQ2oKOZDywVN9VME2S69Ltsk",
  authDomain: "bitd-database.firebaseapp.com",
  projectId: "bitd-database",
  storageBucket: "bitd-database.appspot.com",
  messagingSenderId: "384508698345",
  appId: "1:384508698345:web:c40d9d8fadf94950a79a78",
  measurementId: "G-1LXQJ9V707"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { app, db };
