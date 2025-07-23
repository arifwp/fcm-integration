"use client";

import { requestForToken } from "@/utils/firebase/firebase-config";
import { useCallback, useState } from "react";

export const useFCMToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fcmToken = await requestForToken();

      if (!fcmToken) throw new Error("FCM token not received");
      setToken(fcmToken);

      const sentToken = localStorage.getItem("fcmTokenSent");

      if (sentToken !== fcmToken) {
        const res = await fetch("/api/fcm/save-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: fcmToken }),
        });

        if (!res.ok) {
          throw new Error("Gagal mengirim FCM token ke server");
        }

        localStorage.setItem("fcmTokenSent", fcmToken);
      }

      return fcmToken;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get FCM token";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    token,
    isLoading,
    error,
    generateToken,
  };
};
