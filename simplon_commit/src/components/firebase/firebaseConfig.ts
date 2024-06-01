// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDUwjMtAZzNPCyn8nuyLYZywM8nPYezw50",
    authDomain: "sheyhealthy-lite-e2013.firebaseapp.com",
    projectId: "sheyhealthy-lite-e2013",
    storageBucket: "sheyhealthy-lite-e2013.appspot.com",
    messagingSenderId: "922854930194",
    appId: "1:922854930194:web:336221c7b08db7ab6b65cb",
    measurementId: "G-H9Z2TTPBTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDatabase = getFirestore(app);

export default firestoreDatabase