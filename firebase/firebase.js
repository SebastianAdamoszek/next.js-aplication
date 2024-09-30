// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Twoja konfiguracja Firebase z Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAHTtVwXcmT2aDo9tI_sn3Xek3v2R7q_S8",
  authDomain: "addfirebasetonextjs.firebaseapp.com",
  projectId: "addfirebasetonextjs",
  storageBucket: "addfirebasetonextjs.appspot.com",
  messagingSenderId: "366009107390",
  appId: "1:366009107390:web:75e08da771e23347ddefef",
  measurementId: "G-950CM3QF9L"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Warunkowa inicjalizacja Analytics
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log("Firebase Analytics został zainicjowany.");
  } else {
    console.log("Firebase Analytics nie jest wspierany w tym środowisku.");
  }
});

// Jeśli potrzebujesz Firebase Analytics, możesz go zainicjalizować
const analytics = getAnalytics(app);  // Opcjonalnie

// Inicjalizacja Firebase Authentication i Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };



// const firebaseConfig = {
//  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };
