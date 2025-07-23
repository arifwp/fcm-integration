"use client";

import { SpinLoader } from "@/components/loadings/SpinLoader";
import { COMMON_ERR_MSG } from "@/constants/error";
import {
  NotificationItemResponse,
  useGetNotifQuery,
} from "@/hooks/querys/useGetNotifQuery";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HomeItemNotif } from "./HomeItemNotif";

export const HomeListNotif = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, error } = useGetNotifQuery(page, limit);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || COMMON_ERR_MSG);
    }
  }, [error]);

  const totalData = data?.data?.totalData || 0;
  const notifications = data?.data?.notification || [];
  const totalPages = Math.ceil(totalData / limit);

  return (
    <div className="w-full p-4 gap-4 rounded-lg bg-green-50 border-2 border-green-600 flex flex-col">
      <h1 className="text-lg font-semibold">List Notifikasi</h1>

      <div className="w-full p-4 gap-4 rounded-md bg-white shadow-sm">
        {isLoading ? (
          <SpinLoader />
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">Tidak ada notifikasi</p>
        ) : (
          <>
            <ul className="space-y-4">
              {notifications.map((item: NotificationItemResponse) => (
                <HomeItemNotif key={item.id} item={item} />
              ))}
            </ul>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm text-gray-600">
                Halaman {page} dari {totalPages || 1}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
