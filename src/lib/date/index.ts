import { format } from "date-fns";

export function formatYYYYMMDD<DateType extends Date>(
  date: DateType | number | string,
) {
  return format(date, "yyyy-MM-dd");
}
