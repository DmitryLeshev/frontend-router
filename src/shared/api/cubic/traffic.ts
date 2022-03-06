import { fetchApi } from "./base";
import type { Response, Traffic } from "./models";

const BASE_PATH = "main";

const fetchRouter: any = fetchApi(BASE_PATH);

export const getGraphicData = async (): Promise<Response<Traffic[]>> => {
  return await fetchRouter({ getGraphicData: {} });
};
