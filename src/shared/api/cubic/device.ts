import { fetchApi } from "./base";
import type { Response, Device } from "./models";

const BASE_PATH = "device";

const fetchDevices: any = fetchApi(BASE_PATH);

export type BaseDeviceArgs = { id: number };

export const list = async (): Promise<Response<Device[]>> => {
  return await fetchDevices({ list: {} });
};

export type GenCertArgs = BaseDeviceArgs;

export const genCert = async (args: GenCertArgs): Promise<Response<any>> => {
  return await fetchDevices({ genCert: args });
};

export type GetArgs = BaseDeviceArgs;

export const get = async (args: GetArgs): Promise<Response<any>> => {
  return await fetchDevices({ get: args });
};

export type GetTasksArgs = BaseDeviceArgs;

export const getTasks = async (args: GetTasksArgs): Promise<Response<any>> => {
  return await fetchDevices({ getTasks: args });
};

export type GetIncidentsArgs = BaseDeviceArgs;

export const getIncidents = async (
  args: GetIncidentsArgs
): Promise<Response<any>> => {
  return await fetchDevices({ getIncidents: args });
};

export type GetProgramsArgs = BaseDeviceArgs;

export const getPrograms = async (
  args: GetProgramsArgs
): Promise<Response<any>> => {
  return await fetchDevices({ getPrograms: args });
};

export type SetNewResumeArgs = BaseDeviceArgs & {
  name: string;
  type: number;
};

export const setNewResume = async (
  args: SetNewResumeArgs
): Promise<Response<any>> => {
  return await fetchDevices({ setNewResume: args });
};
