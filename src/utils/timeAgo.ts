import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function timeAgo(date: string) {
  const now = dayjs();
  const pastDate = dayjs(date);

  return pastDate.from(now);
}
