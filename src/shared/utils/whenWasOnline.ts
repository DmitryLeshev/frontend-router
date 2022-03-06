import declOfNum from "./declOfNum";
import { transformDate, DD_MM_YYYY, hh_mm_DD_MM_YYYY } from "./transformDate";

const MINUTS = 60;
const HOUR = MINUTS * 60;
const DAY = HOUR * 24;

export default function whenWasOnline(timestamp: number) {
  const date = new Date();
  const time = Math.floor(new Date().getTime() / 1000);
  const today = date.setHours(0, 0, 0, 0) / 1000;
  const yesterday = date.setDate(date.getDate() - 1) / 1000;
  const secondsLastLogin = Math.floor(time) - timestamp;

  if (secondsLastLogin < 0)
    return `[timestamp = ${timestamp}] [date = ${transformDate(
      timestamp,
      hh_mm_DD_MM_YYYY
    )}] Привет из будущего`;

  if (secondsLastLogin < HOUR) {
    const count = Math.floor(secondsLastLogin / MINUTS);
    return `Был ${count} ${declOfNum(count, [
      "минуту",
      "минуты",
      "минут",
    ])} назад`;
  }

  if (secondsLastLogin < DAY) {
    const count = Math.floor(secondsLastLogin / HOUR);
    return `Был ${count} ${declOfNum(count, ["час", "часа", "часов"])} назад`;
  }

  if (secondsLastLogin < yesterday) {
    const count = Math.floor(secondsLastLogin / DAY);
    return `Был ${count} ${declOfNum(count, ["день", "дня", "дней"])} назад`;
  }

  return transformDate(timestamp, DD_MM_YYYY);
}
