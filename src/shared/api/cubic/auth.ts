import { fetchApi } from "./base";
import { Response } from "../config";

const BASE_PATH = "auth";

const fetchAuth = fetchApi(BASE_PATH);

export type LoginArgs = {
  login: string;
  password: string;
};

export const login = async (args: LoginArgs): Promise<any> => {
  return await fetchAuth({ login: args });
};

export const logout = async () => {
  return await fetchAuth({ logout: {} });
};

export const status = async () => {
  const response = await fetchAuth({ status: {} });
  console.log("status", { response })
  return response
};

export type TimeoutRES = {
  timeout: number;
  count: number;
};

export const timeout = async (): Promise<Response<TimeoutRES>> => {
  return await fetchAuth({ timeout: {} });
};
