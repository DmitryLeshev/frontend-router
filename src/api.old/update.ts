import { fetchData } from "shared/fetch";
import { Response } from "shared/api/config";

const fetchUpdate = fetchData("update");

interface IUpdating {
  start: string;
  end: string;
}

export interface IDataSettingIndex {
  downloaded?: boolean;
  downloading: "auto" | "manual";
  updating: "auto" | "manual" | IUpdating;
  version?: string;
}

interface IApiUpdate {
  set: ({ key, value }: { key: string; value: string }) => any;
  setAll: (dto: IDataSettingIndex) => any;
  index: () => Promise<Response<IDataSettingIndex>>;
  removeUpdate: () => any;
  manualUpdate: () => any;
  checkUpdate: () => any;
}

const update: IApiUpdate = {
  index: async () => await fetchUpdate({ index: {} }),
  removeUpdate: async () => await fetchUpdate({ removeUpdate: {} }),
  manualUpdate: async () => await fetchUpdate({ manualUpdate: {} }),
  checkUpdate: async () => await fetchUpdate({ checkUpdate: {} }),
  set: async (args) => await fetchUpdate({ set: args }),
  setAll: async (dto) => await fetchUpdate({ setAll: { json: dto } }),
};

export { update };
