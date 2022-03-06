import { fetchData } from "shared/fetch";
import { IEvent } from "shared/components/Event/Event";
import { Response } from "shared/api/config";

const fetchTask = fetchData("task");

export interface IDeviceSearch {
  entityId: number;
  entityType: number;
}

export interface EventListDTO {
  progressId?: number;
  devices?: IDeviceSearch[];
  crt?: [number, number];
  minCrt?: number;
  maxCrt?: number;
  limit?: number;
  date?: [number | null, number | null];
  minCreateDate?: number;
  maxCreateDate?: number;
  lastId?: number;
}
export interface TaskGetDTO {
  id: number;
}

interface IApiTask {
  list: (dto: EventListDTO) => Promise<Response<IEvent[]>>;
  get: (dto: TaskGetDTO) => Promise<Response<IEvent>>;
  getDevices: () => Promise<Response<IDeviceSearch[]>>;
}

const task: IApiTask = {
  list: async (dto) => await fetchTask({ list: dto }),
  get: async (dto) => await fetchTask({ get: dto }),
  getDevices: async () => await fetchTask({ getDevices: {} }),
};

export { task };
