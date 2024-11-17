//public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAHTtVwXcmT2aDo9tI_sn3Xek3v2R7q_S8",
  authDomain: "addfirebasetonextjs.firebaseapp.com",
  projectId: "addfirebasetonextjs",
  storageBucket: "addfirebasetonextjs.appspot.com",
  messagingSenderId: "366009107390",
  appId: "1:366009107390:web:75e08da771e23347ddefef",
  measurementId: "G-950CM3QF9L",
});

const messaging = firebase.messaging();

// Obsługuje powiadomienia, gdy aplikacja jest w tle lub zamknięta
messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received ", payload);
  const notificationTitle = "Nowa wiadomość";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
