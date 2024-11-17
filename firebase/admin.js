//firebase/admin.js
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_KEY);

// Inicjalizacja Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://addfirebasetonextjs.firebaseio.com"
});

const payload = {
    notification: {
      title: "Nowa wiadomość",
      body: "Tekst wiadomości",
    },
  };
  
  const token = "USER_FCM_TOKEN"; // Token FCM użytkownika, który chcesz powiadomić
  
  admin.messaging().sendToDevice(token, payload)
    .then((response) => {
      console.log("Powiadomienie wysłane:", response);
    })
    .catch((error) => {
      console.error("Błąd podczas wysyłania powiadomienia:", error);
    });
  

    import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase/firebase"; // Załaduj messaging z firebase.js

const saveTokenToFirestore = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_ADMIN_KEY });

    if (token) {
      // Zapisz token w Firestore (lub w dowolnej bazie danych)
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { fcmToken: token }, { merge: true });
      console.log("Token zapisany w Firestore");
    }
  } catch (error) {
    console.error("Błąd przy pobieraniu tokenu FCM:", error);
  }
};
 
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Wyświetl notyfikację na froncie
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png',
  });
});

Notification.requestPermission().then((permission) => {
  if (permission === 'granted', permission) {
    console.log('Permission granted');
    saveTokenToFirestore(); // Zapisz token FCM, jeśli użytkownik wyraził zgodę
  } else {
    console.error('Permission not granted');
  }
});
