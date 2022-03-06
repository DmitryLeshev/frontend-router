import { fetchApi } from "./base";
import type { Response } from "./models";

const BASE_PATH = "main";

const fetchSpeed: any = fetchApi(BASE_PATH);

type GetSpeedRES = {
  ping: number;
  download: number;
  upload: number;
};

export const getSpeed = async (): Promise<Response<GetSpeedRES>> => {
  return await fetchSpeed({ speedInternetResult: {} });
};

export const runSpeedTest = async (): Promise<Response<[]>> => {
  return await fetchSpeed({ speedInternetStart: {} });
};
