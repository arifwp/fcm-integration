import {
  requestForToken,
  onMessageListener,
} from "@/utils/firebase/firebase-config";
import { MessagePayload } from "firebase/messaging";

export const initializeNotifications = async (
  onMessage: (payload: MessagePayload) => void
): Promise<string | null> => {
  try {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }

    const fcmToken = await requestForToken();
    if (!fcmToken) throw new Error("FCM Token is null");

    onMessageListener()
      .then((payload) => {
        onMessage(payload);
      })
      .catch((err) => {
        console.error("Failed to receive message:", err);
      });

    return fcmToken;
  } catch (error) {
    console.error("Error initializing notifications:", error);
    return null;
  }
};

export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    if (!("Notification" in window)) return "denied";
    return await Notification.requestPermission();
  };
