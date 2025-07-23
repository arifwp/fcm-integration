import {
  NotificationContext,
  NotificationContextType,
} from "@/context/FirebaseContext";
import { useContext } from "react";

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
