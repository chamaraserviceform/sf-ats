// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAA537utvMu4u0BGMQg-JMfeXRNY6ToAPk",
    authDomain: "leadpixel-33e21.firebaseapp.com",
    databaseURL: "https://leadpixel-33e21-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "leadpixel-33e21",
    storageBucket: "leadpixel-33e21.appspot.com",
    messagingSenderId: "136206690393",
    appId: "1:136206690393:web:a2e0ef6155c6813154a948",
    measurementId: "G-647091E0RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)