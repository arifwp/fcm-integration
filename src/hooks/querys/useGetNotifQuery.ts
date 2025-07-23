import { useQuery } from "@tanstack/react-query";

export interface NotificationItemResponse {
  id: string;
  clinicId: number;
  title: string;
  body: string;
  targe: any;
  targetId: any;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useGetNotifQuery = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["GET-NOTIFICATIONS", page, limit],
    queryFn: async () => {
      const res = await fetch(
        `/api/fcm/get-notification?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Gagal mengambil notifikasi");
      }

      return data;
    },
  });
};
