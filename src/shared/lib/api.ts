import { fetchData } from "shared/lib";

export const DEVICE = "device";
export const MAIN = "main";
export const AUTH = "auth";
export const SETTINGS = "setting";
export const UPDATE = "update";
export const TASK = "task";
export const INCIDENT = "incident";
export const SERVER = "server";

export const enum Controllers {
  DEVICE = "device",
  MAIN = "main",
  AUTH = "auth",
}

export const enum AuthMethods {
  STATUS = "status",
  LOGIN = "login",
  CREATE = "create",
  LOGOUT = "logout",
}

export interface AuthLoginDTO {
  login: string;
  password: string;
}

export const ENDPOINTS = {
  [AUTH]: {
    status: `${AUTH}/status`,
    login: `${AUTH}/login`,
    create: `${AUTH}/create`,
    logout: `${AUTH}/logout`,
  },
  [DEVICE]: {
    list: `${DEVICE}/list`,
    genCert: `${DEVICE}/genCert`,
    get: `${DEVICE}/get`,
    getTasks: `${DEVICE}/getTasks`,
    getIncidents: `${DEVICE}/getIncidents`,
    getPrograms: `${DEVICE}/getPrograms`,
    setNewResume: `${DEVICE}/setNewResume`,
  },
  [INCIDENT]: {
    list: `${INCIDENT}/list`,
    get: `${INCIDENT}/get`,
    getDevices: `${INCIDENT}/getDevices`,
  },
  [MAIN]: {
    index: `${MAIN}/index`,
    getGraphicData: `${MAIN}/getGraphicData`,
    isServerConnected: `${MAIN}/isServerConnected`,
  },
  [SERVER]: {
    registration: `${SERVER}/registration`,
    anketa: `${SERVER}/anketa`,
    disconnect: `${SERVER}/disconnect`,
  },
  [SETTINGS]: {
    settingWifi: `${SETTINGS}/settingWifi`,
    setWanSettings: `${SETTINGS}/setWanSettings`,
    setLanSettings: `${SETTINGS}/setLanSettings`,
    reset: `${SETTINGS}/reset`,
    reboot: `${SETTINGS}/reboot`,
    changeAuthData: `${SETTINGS}/changeAuthData`,
    getWifiInfo: `${SETTINGS}/getWifiInfo`,
    getNetworkInfo: `${SETTINGS}/getNetworkInfo`,
    getWifiToggleInfo: `${SETTINGS}/getWifiToggleInfo`,
    toggleWifi: `${SETTINGS}/toggleWifi`,
    getDHCP: `${SETTINGS}/getDHCP`,
    changeDHCP: `${SETTINGS}/changeDHCP`,
  },
  [TASK]: {
    list: `${TASK}/list`,
    get: `${TASK}/get`,
    getDevices: `${TASK}/getDevices`,
  },
  [UPDATE]: {
    set: `${UPDATE}/set`,
    setAll: `${UPDATE}/setAll`,
    index: `${UPDATE}/index`,
    removeUpdate: `${UPDATE}/removeUpdate`,
    manualUpdate: `${UPDATE}/manualUpdate`,
    checkUpdate: `${UPDATE}/checkUpdate`,
  },
};

export const apiTets = {
  [Controllers.AUTH]: {
    [AuthMethods.LOGIN]: {
      path: `${Controllers.AUTH}/${AuthMethods.LOGIN}`,
      args: { login: "", password: "" },
      method: (dto: AuthLoginDTO) => console.log(dto),
    },
  },
};

class Api {
  constructor() {}

  async fetch(packet: any) {
    const structureError = () => console.error("Ошибка структуры пакета");
    if (!packet) return;
    const [path, args = {}] = Object.entries(packet)[0];
    const [iface, method] = path.split("/");
    if (!iface || !method) return structureError();
    console.log("[Api] args", { [path]: args });
    try {
      const res = await fetchData(iface)({ [method]: args });
      console.log("[Api] res", { [path]: res });
      return res;
    } catch (error) {
      console.log("[Api] error", { error });
      return error;
    }
  }
}

const api = new Api();

export { api };
