import { fetchApi } from "./base";
import { Response } from "../config";

const BASE_PATH = "users";

const fetchUsers = fetchApi(BASE_PATH);

export type User = {
  id: number;
  login: string;
  role: string;
};

export type CreateUserArgs = {
  login: string;
  password: string;
};

export const createUser = async (args: CreateUserArgs): Promise<any> => {
  return await fetchUsers({ createUser: args });
};

export type DeleteUserArgs = {
  id: number;
};

export const deleteUser = async (args: DeleteUserArgs) => {
  return await fetchUsers({ deleteUser: args });
};

export const getUsers = async (): Promise<Response<User[]>> => {
  return await fetchUsers({ getUsers: {} });
};

export type UpdateUserArgs = {
  id: number;
  login: string;
  password: string;
};

export const updateUser = async (
  args: UpdateUserArgs
): Promise<Response<any>> => {
  return await fetchUsers({ updateUser: args });
};

export type Log = {
  time: number;
  user: string;
  action: string;
  params: {
    [key: string]: string | number;
  };
};

export type GetLogArgs = {
  id: number;
};

export const getLog = async (args: GetLogArgs): Promise<Response<Log[]>> => {
  return await fetchUsers({ getLog: args });
};
