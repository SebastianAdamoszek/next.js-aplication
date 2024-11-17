// pages/api/sendNotification.js
import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_KEY);
// Inicjalizacja Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://addfirebasetonextjs.firebaseio.com",
  });

  const payload = {
    notification: {
      title: "Nowa wiadomość",
      body: "Tekst wiadomości",
    },
  };

  const token = "USER_FCM_TOKEN"; // Token FCM użytkownika, który chcesz powiadomić

  admin
    .messaging()
    .sendToDevice(token, payload)
    .then((response) => {
      console.log("Powiadomienie wysłane:", response);
    })
    .catch((error) => {
      console.error("Błąd podczas wysyłania powiadomienia:", error);
    });
}
