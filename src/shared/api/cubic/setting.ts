import { fetchApi } from "./base";
import { Response, URL, CREDENTIALS, HEADERS } from "../config";
import { sleep } from "shared/utils";

const BASE_PATH = "setting";
const METHOD = {
  GET_FIREWALL: "getSettingsFirewall",
  SET_FIREWALL: "setSettingsFirewall",
  ADD_FIREWALL: "addSettingsFirewall",
  DEL_FIREWALL: "delSettingsFirewall",
  GET_CERTS: "openVPNGetCerts",
  GENERATE_KEYS: "generateKeys",
  GENERATE_CHECK: "checkGenerate",
  SET_STATE_OPEN_VPN: "setStateOpenVpn",
  UPLOAD_CONFIG: "uploadConfigOpenVPN",
  STATUS_RUNNING: "statusRunning",
  SET_ADMIN: "passthroughAdminPanel",
};

const fetchSetting: any = fetchApi(BASE_PATH);

// type SrcNeigh = string | Rule;

export type Rule = {
  anonymous: boolean;
  dest: string;
  dest_ip: string;
  dest_port: string;
  dst: "lan" | "wan";
  dst_ip: string;
  index: number;
  name: string;
  device: string;
  proto: string;
  real_name: string;
  reflection: string;
  src: string;
  src_dip: string;
  src_dport: string;
  target: string;
  type: string;
  src_ip: string;
  src_neigh?: {
    [real_name: string]: (string | Rule)[];
  };
};

export const getFirewall = async (): Promise<
  Response<{
    redirect: {
      [id: string]: Rule;
    };
  }>
> => {
  return await fetchSetting({ [METHOD.GET_FIREWALL]: {} });
};

export type SetFirewallDTO = {
  module: string;
  params: {
    [real_name: string]: {
      [key: string]: string;
    };
  };
};

export const setFirewall = async (dto: SetFirewallDTO): Promise<any> => {
  // return await fetchSetting({ [METHOD.SET_FIREWALL]: dto });

  let controller = new AbortController();
  let signal = controller.signal;

  let args = dto;
  let path = "Setting/setSettingsFirewall";

  let fetchPromise = fetch(URL, {
    signal,
    headers: HEADERS,
    credentials: CREDENTIALS,
    method: "POST",
    body: JSON.stringify({ path, args, token: "DEBUG" }),
  });

  let timeoutId = setTimeout(() => {
    console.log("ABORT START");
    controller.abort();
    console.log("ABORT END");
  }, 1000);

  const res = fetchPromise
    .then(async (response) => {
      console.log("RESPONSE");
      clearTimeout(timeoutId);
      await sleep(10000);
      return response;
    })
    .catch(async (error) => {
      console.log("ERROR");

      await sleep(10000);
      return error;
    });
  console.log("SLEEP");

  await sleep(10000);
  return res;
};

export type AddFirewallDTO = {
  module: string;
  type: string;
  params: {
    name: string;
    dest_port: string;
    dest_ip: string;
    src_dport: string;
    src_ip: string;
  };
};

export const addFirewall = async (dto: AddFirewallDTO): Promise<any> => {
  // return await fetchSetting({ [METHOD.ADD_FIREWALL]: dto }, 1000);

  let controller = new AbortController();
  let signal = controller.signal;

  let args = dto;
  let path = "Setting/addSettingsFirewall";

  let fetchPromise = fetch(URL, {
    signal,
    headers: HEADERS,
    credentials: CREDENTIALS,
    method: "POST",
    body: JSON.stringify({ path, args, token: "DEBUG" }),
  });

  let timeoutId = setTimeout(() => {
    console.log("ABORT START");
    controller.abort();
    console.log("ABORT END");
  }, 1000);

  const res = fetchPromise
    .then(async (response) => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(async (error) => {
      await sleep(10000);
      return error;
    });
  return res;
};

export type DelFirewallDTO = {
  module: string;
  type: string;
  params: {
    [id: number]: string; // real_name
  };
};

export const delFirewall = async (dto: DelFirewallDTO) => {
  return await fetchSetting({ [METHOD.DEL_FIREWALL]: dto });
};

export const openVPNGetCerts = async () => {
  return await fetchSetting({ [METHOD.GET_CERTS]: {} });
};

export const generateKeys = async () => {
  return await fetchSetting({ [METHOD.GENERATE_KEYS]: {} });
};

export const checkGenerate = async () => {
  return await fetchSetting({ [METHOD.GENERATE_CHECK]: {} });
};

export type OpenVpnActionType =
  | "serverenable"
  | "serverdisable"
  | "clientenable"
  | "clientdisable";

export type DTOSetStateOpenVpn = {
  action: OpenVpnActionType;
};

export const setStateOpenVpn = async (dto: DTOSetStateOpenVpn) => {
  return await fetchSetting({ [METHOD.SET_STATE_OPEN_VPN]: dto });
};

export type TypeOpenVPN = "config" | "ca" | "cert" | "key";

export type DTOUploadConfigOpenVPN = {
  file: string;
  type: TypeOpenVPN;
};

export const uploadConfigOpenVPN = async (dto: DTOUploadConfigOpenVPN) => {
  return await fetchSetting({ [METHOD.UPLOAD_CONFIG]: dto });
};

export type DTOStatusRunning = {
  type: "client" | "server";
};

export const statusRunning = async (dto: DTOStatusRunning) => {
  return await fetchSetting({ [METHOD.STATUS_RUNNING]: dto.type });
};

export type DTOAdminAction = {
  action: "add" | "del" | "status";
};

export const adminAction = async (
  dto: DTOAdminAction
): Promise<Response<"inactive" | "active">> => {
  return await fetchSetting({ [METHOD.SET_ADMIN]: dto });
};
