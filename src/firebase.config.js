import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
export const  firebaseConfig={
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "instagram-59824.firebaseapp.com",
    projectId: "instagram-59824",
    storageBucket: "instagram-59824.appspot.com",
    messagingSenderId: "139040693406",
    appId: "1:139040693406:web:8b2cc3042621c75d4eef8f",
    measurementId: "G-G6LQBNRGVT"
}
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
const {
    FIREBASE_API_KEY
} = process.env;
 
    