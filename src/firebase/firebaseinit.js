// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPLAFNUmtIXWyUajzflySXImAIbGgWLHI",
  authDomain: "cricket-auction-5031f.firebaseapp.com",
  projectId: "cricket-auction-5031f",
  storageBucket: "cricket-auction-5031f.appspot.com",
  messagingSenderId: "336383709094",
  appId: "1:336383709094:web:8146fe194a89a37e5a4967",
};
// Initialize Cloud Firestore and get a reference to the service
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase

// const analytics = getAnalytics(app);

export { db };
