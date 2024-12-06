import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Format date to relative time. E.g. "2 hours ago", "just now"
export const formatRelativeTime = (date: Date): string => {
  const formattedString = dayjs(date).fromNow();
  return formattedString === "in a few seconds" ? "just now" : formattedString;
};
