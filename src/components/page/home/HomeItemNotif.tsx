import { NotificationItemResponse } from "@/hooks/querys/useGetNotifQuery";
import { formatToLocalTime } from "@/utils/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

export const HomeItemNotif = ({ item }: { item: NotificationItemResponse }) => {
  const queryClient = useQueryClient();

  const readMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/fcm/read-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data?.error || "Gagal menandai notifikasi sebagai terbaca"
        );
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET-NOTIFICATIONS"] });
    },
  });

  const onSubmit = () => {
    if (item.isRead) return;

    readMutation.mutate(item.id);
  };

  return (
    <li
      key={item.id}
      className={clsx("p-4 border rounded shadow-sm cursor-pointer", {
        "bg-gray-100": !item.isRead,
        "bg-white": item.isRead,
      })}
      onClick={onSubmit}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">{item.title}</h2>
        <p className="text-gray-700">{item.body}</p>
        <p className="text-sm text-gray-400">
          {formatToLocalTime(item.createdAt)}
        </p>
      </div>
    </li>
  );
};
