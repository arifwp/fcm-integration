"use client";

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { HomeListNotif } from "@/components/page/home/HomeListNotif";
import { HomeSendNotif } from "@/components/page/home/HomeSendNotif";
import { COMMON_ERR_MSG } from "@/constants/error";
import { useFCMToken } from "@/hooks/useFcmToken";
import { useNotification } from "@/hooks/useNotification";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const { isSupported, isPermissionGranted, requestPermission } =
    useNotification();

  const { error, generateToken } = useFCMToken();

  useEffect(() => {
    if (isSupported && !isPermissionGranted) {
      requestPermission();
    }
  }, [isPermissionGranted, isSupported, requestPermission]);

  useEffect(() => {
    generateToken();
  }, [generateToken]);

  useEffect(() => {
    if (error) {
      toast.error(error || COMMON_ERR_MSG);
    }
  }, [error]);

  return (
    <div className="w-full p-8 gap-8 flex flex-col relative">
      {isSupported && !isPermissionGranted && (
        <div className="w-full p-4 gap-4 rounded-lg bg-blue-50 border-2 border-blue-600 flex flex-col">
          <h1 className="text-lg font-semibold">Request Notifikasi</h1>

          <ButtonPrimary
            className="px-4 py-2"
            onClick={() => requestPermission()}
            title="Request Notifikasi"
          />
        </div>
      )}

      <HomeSendNotif />

      <HomeListNotif />

      <div className="fixed bottom-3 right-3 md:bottom-12 md:right-12 z-10">
        <Link
          href="https://wa.me/6281316294482?text=Halo%2C%20saya%20tertarik%20untuk%20berlangganan%20sistem%20PlayFields.%20Bisa%20dibantu%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 gap-2 bg-red-100 hover:bg-red-400 rounded-lg flex items-center text-md font-semibold cursor-pointer z-[9999] transition-colors duration-200 ease-in-out"
          type="button"
        >
          <ArrowRightEndOnRectangleIcon className="size-6 text-black" />
          Logout
        </Link>
      </div>
    </div>
  );
}
