import { getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let messaging: any = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging };

export const requestForToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.log("Messaging not supported");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (currentToken) {
        return currentToken;
      } else {
        console.log("No registration token available.");
        return null;
      }
    } else {
      console.log("Unable to get permission to notify.");
      return null;
    }
  } catch (err) {
    console.error("An error occurred while retrieving token:", err);
    return null;
  }
};

export const onMessageListener = (): Promise<MessagePayload> => {
  return new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Foreground received msg:", payload);
        resolve(payload);
      });
    }
  });
};

export default app;
