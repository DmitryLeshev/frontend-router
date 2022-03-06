import { fetchApi } from "./base";
import type { Response, Router, RouterRange } from "./models";

const BASE_PATH = "setting";

const fetchRouter: any = fetchApi(BASE_PATH);

export type toggleWifiArgs = {
  range: RouterRange;
  started: boolean;
};

export const toggleWifi = async (
  args: toggleWifiArgs
): Promise<Response<any>> => {
  return await fetchRouter({ toggleWifi: args });
};

export const getWifiToggleInfo = async (): Promise<Response<Router[]>> => {
  // console.log("getWifiToggleInfo");
  return await fetchRouter({ getWifiToggleInfo: {} });
};
