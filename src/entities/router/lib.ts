import type { Router } from "shared/api";

export const getRouterStatus = (data: Router) => {
  return data.enabled ? "Выключить" : "Включить";
};
