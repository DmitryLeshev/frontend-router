export const hh_mm_DD_MM_YYYY: Variant = "hh:mm DD.MM.YYYY";
export const DD_MM_YYYY: Variant = "DD.MM.YYYY";
export const hh_mm: Variant = "hh:mm";
export const hh_mm_ss: Variant = "hh:mm:ss";

export type Variant = "hh:mm DD.MM.YYYY" | "DD.MM.YYYY" | "hh:mm" | "hh:mm:ss";

export enum Variants {
  hh_mm_DD_MM_YYYY = "hh:mm DD.MM.YYYY",
  DD_MM_YYYY = "DD.MM.YYYY",
  hh_mm = "hh:mm",
  hh_mm_ss = "hh:mm:ss",
}

export const transformDate = (timestamp: number, variant: Variant) => {
  if (!variant) return;
  const jsDate = new Date(timestamp * 1000);
  const year = jsDate.getFullYear();
  const month = jsDate.getMonth() + 1;
  const day = jsDate.getDate();
  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();
  const seconds = jsDate.getSeconds();

  const MM = month <= 9 ? "0" + month : month;
  const DD = day <= 9 ? "0" + day : day;
  const hh = hours <= 9 ? "0" + hours : hours;
  const mm = minutes <= 9 ? "0" + minutes : minutes;
  const ss = seconds <= 9 ? "0" + seconds : seconds;

  if (variant === "DD.MM.YYYY") {
    return `${DD}.${MM}.${year}`;
  }
  if (variant === "hh:mm DD.MM.YYYY") {
    return `${hh}:${mm} ${DD}.${MM}.${year}`;
  }
  if (variant === "hh:mm") {
    return `${hh}:${mm}`;
  }
  if (variant === "hh:mm:ss") {
    return `${hh}:${mm}:${ss}`;
  }
  if (variant === "") {
    return;
  }
  return "";
};

export const transformTimestamp = (timestamp: number) => {
  const day = Math.floor(timestamp / 60 / 60 / 24);

  const hours = Math.floor(timestamp / 60 / 60);

  const minutes = Math.floor(timestamp / 60) - hours * 60;

  const seconds = Math.floor(timestamp % 60);

  const renderHours = Math.floor(timestamp / 60 / 60) - day * 24;

  return `${day.toString().padStart(2, "0")}д ${renderHours
    .toString()
    .padStart(2, "0")}ч ${minutes.toString().padStart(2, "0")}м ${seconds
    .toString()
    .padStart(2, "0")}с`;
};

export const startOfTheDay = (date: any) => {
  if (!date) return;
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime() / 1000;
};

export const endOfTheDay = (date: any) => {
  if (!date) return;
  const secondsPerDay = 86400;
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime() / 1000 + secondsPerDay - 1;
};

export const trDateInTimestamp = (date: Date) => {
  return date.getTime() / 1000;
};
