"use client";

import React, { createContext, useEffect, useState } from "react";
import { MessagePayload } from "firebase/messaging";
import {
  initializeNotifications,
  requestNotificationPermission,
} from "@/utils/firebase/firebase-init";

export interface NotificationContextType {
  token: string | null;
  notification: MessagePayload | null;
  isSupported: boolean;
  isPermissionGranted: boolean;
  requestPermission: () => Promise<void>;
  clearNotification: () => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<MessagePayload | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator
    ) {
      setIsSupported(true);

      if (Notification.permission === "granted") {
        setIsPermissionGranted(true);
        init();
      }
    }
  }, []);

  const init = async () => {
    const fcmToken = await initializeNotifications((payload) => {
      console.log("Received foreground message:", payload);
      setNotification(payload);
    });

    if (fcmToken) setToken(fcmToken);
  };

  const requestPermission = async () => {
    if (!isSupported) {
      alert("Browser tidak mendukung notifikasi");
      return;
    }

    const permission = await requestNotificationPermission();

    if (permission === "granted") {
      setIsPermissionGranted(true);
      await init();
    } else {
      setIsPermissionGranted(false);
      alert("Izin notifikasi ditolak");
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const value: NotificationContextType = {
    token,
    notification,
    isSupported,
    isPermissionGranted,
    requestPermission,
    clearNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
