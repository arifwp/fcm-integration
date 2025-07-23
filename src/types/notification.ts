export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
  requireInteraction?: boolean;
  tag?: string;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface FCMMessage {
  token?: string;
  topic?: string;
  condition?: string;
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: Record<string, string>;
  webpush?: {
    headers?: Record<string, string>;
    data?: Record<string, any>;
    notification?: NotificationPayload;
    fcm_options?: {
      link?: string;
      analytics_label?: string;
    };
  };
}

export interface NotificationContextState {
  token: string | null;
  isSupported: boolean;
  isPermissionGranted: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SendNotificationRequest {
  token: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  icon?: string;
  badge?: string;
  requireInteraction?: boolean;
}

export interface SendNotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: any;
}
