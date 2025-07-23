"use client";

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { COMMON_ERR_MSG } from "@/constants/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SendNotif {
  title: string;
  body: string;
}
export const HomeSendNotif = () => {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SendNotif>();

  const sendMutation = useMutation({
    mutationFn: async (data: SendNotif) => {
      const response = await fetch("/api/fcm/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || COMMON_ERR_MSG);
      }

      return result;
    },
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.message || COMMON_ERR_MSG);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET-NOTIFICATIONS"] });
    },
  });

  const onSubmit = (data: SendNotif) => {
    sendMutation.mutate(data);
  };

  return (
    <div className="w-full p-4 gap-4 rounded-lg bg-amber-50 border-2 border-amber-600 flex flex-col">
      <h1 className="text-lg font-semibold">Send Notifikasi</h1>

      <div className="w-full p-8 gap-4 rounded-md bg-white shadow-sm">
        <div>
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              {...register("title", {
                required: "Titile harus diisi",
              })}
              id="title"
              name="title"
              type="title"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.title && (
              <p
                className="error-text"
                role="alert"
              >{`${errors.title.message}`}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="body"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Pesan
          </label>
          <div className="mt-2">
            <input
              {...register("body", {
                required: "Titile harus diisi",
              })}
              id="body"
              name="body"
              type="body"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.body && (
              <p
                className="error-text"
                role="alert"
              >{`${errors.body.message}`}</p>
            )}
          </div>

          <div className="mt-4">
            <ButtonPrimary
              onClick={handleSubmit(onSubmit)}
              title="Kirim"
              isLoading={sendMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
