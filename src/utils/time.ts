import { format as formatDateFns, isValid, parseISO } from "date-fns";
import { id as idDateFns } from "date-fns/locale/id";

export const convertToSeconds = (duration: string): number => {
  const match = duration.match(/^(\d+)([hmsd])$/i);
  if (!match) return 3600; // fallback 1 jam

  const [, valueStr, unit] = match;
  const value = parseInt(valueStr, 10);

  switch (unit.toLowerCase()) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 3600;
  }
};

export const formatToLocalTime = (
  dateStr: string | null | undefined
): string => {
  if (!dateStr) return "-";
  const date = parseISO(dateStr);
  if (!isValid(date)) return "-";
  return formatDateFns(date, "EEEE, dd MMMM yyyy HH:mm", {
    locale: idDateFns,
  });
};
