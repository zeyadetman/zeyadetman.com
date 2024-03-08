import { format } from "date-fns";

export const formatDate = (date: Date | string) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd.MM.yyyy");
};
