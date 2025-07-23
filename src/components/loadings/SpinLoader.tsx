import clsx from "clsx";

export const SpinLoader = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("w-full flex justify-center items-center", className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
    </div>
  );
};
