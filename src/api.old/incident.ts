import { fetchData } from "shared/fetch";
import { IEvent } from "shared/components/Event/Event";
import { Response } from "shared/api/config";
import { EventListDTO, IDeviceSearch } from "./task";

const fetchIncident = fetchData("incident");

export interface IncidentListDTO {
  progressId?: number;
}
export interface IncidentGetDTO {
  id: number;
}

interface IApiIncident {
  list: (dto: EventListDTO) => Promise<Response<IEvent[]>>;
  get: (dto: IncidentListDTO) => Promise<Response<IEvent>>;
  getDevices: () => Promise<Response<IDeviceSearch[]>>;
}

const incident: IApiIncident = {
  list: async (dto) => await fetchIncident({ list: dto }),
  get: async (dto) => await fetchIncident({ get: dto }),
  getDevices: async () => await fetchIncident({ getDevices: {} }),
};

export { incident };
