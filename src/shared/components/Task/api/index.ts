import { fetchData } from "shared/fetch";

const taskQuery = fetchData("task");
const incidentQuery = fetchData("incident");

export default {
  task: {
    get: async ({ id, lang = "ru" }: any) =>
      await taskQuery({ get: { id, lang } }),
  },
  incident: {
    get: async ({ id }: any) => await incidentQuery({ get: { id } }),
  },
};
