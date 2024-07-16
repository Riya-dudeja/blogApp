// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKdYJFRXszY2Su7ez_QeAlJsbFzptAcxg",
  authDomain: "blogapp-ae8a7.firebaseapp.com",
  projectId: "blogapp-ae8a7",
  storageBucket: "blogapp-ae8a7.appspot.com",
  messagingSenderId: "613793259803",
  appId: "1:613793259803:web:523e734c49c8c0d4c6b3be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);