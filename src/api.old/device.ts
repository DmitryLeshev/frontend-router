import { fetchData } from "shared/fetch";

const fetchDevice = fetchData("device");

interface IApiDevice {
  list: () => any;
  genCert: ({ id }: { id: number }) => any;
  get: ({ id }: { id: number }) => any;
  getTasks: ({ id }: { id: number }) => any;
  getIncidents: ({ id }: { id: number }) => any;
  getPrograms: ({ id }: { id: number }) => any;
  setNewResume: ({
    id,
    name,
    type,
  }: {
    id: number;
    name: string;
    type: number;
  }) => any;
}

const device: IApiDevice = {
  list: async () => await fetchDevice({ list: {} }),
  genCert: async ({ id }) => await fetchDevice({ genCert: { id } }),
  get: async ({ id }) => await fetchDevice({ get: { id } }),
  getTasks: async ({ id }) => await fetchDevice({ getTasks: { id } }),
  getIncidents: async ({ id }) => await fetchDevice({ getIncidents: { id } }),
  getPrograms: async ({ id }) => await fetchDevice({ getPrograms: { id } }),
  setNewResume: async ({ id, name, type }) =>
    await fetchDevice({ setNewResume: { id, name, type } }),
};

export { device };
