// pages/api/sendNotification.js
import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_KEY);
// Inicjalizacja Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://addfirebasetonextjs.firebaseio.com"
  });
}

export default async (req, res) => {
  const { token, message } = req.body;

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(token, payload);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


