// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTSeHn2Ww7ApfIaXwH9vgjAGqvViWqQH0",
  authDomain: "login1-f7515.firebaseapp.com",
  projectId: "login1-f7515",
  storageBucket: "login1-f7515.firebasestorage.app",
  messagingSenderId: "783648853180",
  appId: "1:783648853180:web:40dcb8f05a4f11eb04d4b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
