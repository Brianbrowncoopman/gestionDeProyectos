import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEa4mrQqzupl7-pi9NuhD2tLtrSCFFz5Y",
  authDomain: "gestion-de-proyectos-4fc21.firebaseapp.com",
  projectId: "gestion-de-proyectos-4fc21",
  storageBucket: "gestion-de-proyectos-4fc21.firebasestorage.app",
  messagingSenderId: "651517505529",
  appId: "1:651517505529:web:3931a30fb44bca4317d728",
  measurementId: "G-GYNMPJEJW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);