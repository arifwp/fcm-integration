import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";
interface Props extends HTMLMotionProps<"button"> {
  title: string;
  className?: string;
  isLoading?: boolean;
}

export const ButtonPrimary = ({
  title,
  onClick,
  className,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <motion.button
      whileTap={{ scale: 0.75, transition: { type: "spring", stiffness: 250 } }}
      className={clsx(
        "w-full px-3 py-1.5 rounded-md font-semibold bg-indigo-600 text-white cursor-pointer transition-all duration-200 ease-in-out text-sm focus:outline-2 focus:outline-indigo hover:bg-indigo/80",
        "disabled:!cursor-not-allowed disabled:!opacity-60 disabled:hover:!bg-indigo",
        className
      )}
      onClick={onClick ? onClick : undefined}
      disabled={isLoading ? true : false}
      {...rest}
    >
      {isLoading ? (
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <span
            className={clsx(
              "loader w-4 h-4 border-2 border-t-transparent rounded-full animate-spin bg-primary text-white text-sm",
              isLoading && "opacity-60"
            )}
          ></span>

          <p className="font-semibold text-sm">Loading...</p>
        </div>
      ) : (
        title
      )}
    </motion.button>
  );
};
