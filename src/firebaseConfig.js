// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByuR-At0x6cB5cagJOKZ8apHVvZX4kAAM",
  authDomain: "she-sos.firebaseapp.com",
  projectId: "she-sos",
  storageBucket: "she-sos.appspot.com",
  messagingSenderId: "888168697535",
  appId: "1:888168697535:web:a1b5d0884091bb1619c00a",
  measurementId: "G-FV9SXZG9B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
