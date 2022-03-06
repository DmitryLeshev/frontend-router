import { fetchData } from "shared/fetch";
import { Response } from "shared/api/config";

const fetchUpdate = fetchData("update");

interface IUpdating {
  start: string;
  end: string;
}

export interface IDataSettingIndex {
  downloaded?: boolean;
  downloading?: "auto" | "manual";
  updating?: "auto" | "manual" | IUpdating;
  version?: string;
  loadedUpdate?: boolean;
  "update-settings"?: {
    times: [number, number];
    updating: "auto" | "man";
  };
}

interface IApiUpdate {
  set: ({ key, value }: { key: string; value: string }) => any;
  setAll: (dto: IDataSettingIndex) => any;
  index: () => Promise<Response<IDataSettingIndex>>;
  removeUpdate: () => any;
  manualUpdate: () => any;
  checkUpdate: () => any;
  checkUpdateManually: () => any;
  updateManually: () => any;
  changeUpdateSettings: (dto: {
    updating: "man" | "auto";
    times?: [number, number];
  }) => any;
}

const update: IApiUpdate = {
  index: async () => await fetchUpdate({ index: {} }),
  removeUpdate: async () => await fetchUpdate({ removeUpdate: {} }),
  manualUpdate: async () => await fetchUpdate({ manualUpdate: {} }),
  checkUpdate: async () => await fetchUpdate({ checkUpdate: {} }),
  set: async (args) => await fetchUpdate({ set: args }),
  setAll: async (dto) => await fetchUpdate({ setAll: { json: dto } }),
  checkUpdateManually: async () =>
    await fetchUpdate({ checkUpdateManually: {} }),
  updateManually: async () => await fetchUpdate({ updateManually: {} }),
  changeUpdateSettings: async (dto) =>
    await fetchUpdate({ changeUpdateSettings: dto }),
};

export { update };
