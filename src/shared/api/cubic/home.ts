import { fetchApi } from "./base";
import type { Response, GetHomeInfoRES } from "./models";

const BASE_PATH = "main";

const fetchHome: any = fetchApi(BASE_PATH);

export const getHomeInfo = async (): Promise<Response<GetHomeInfoRES>> => {
  return await fetchHome({ index: {} });
};
