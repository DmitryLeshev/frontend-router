import { fetchApi } from "shared/api/cubic/base";
import { Response } from "shared/api/config";
import { LoginDTO } from "./auth";

const fetchSettings = fetchApi("setting");

type TypeState = "static" | "pppoe" | "um" | "dhcp6" | "dhcp";

export interface Params {
  buob?: boolean;
  dhcpHost?: string;
  login?: string;
  password?: string;
  ac?: string;
  sn?: string;
  address?: string[];
  geteway?: string;
  broadcast?: string;
  dns?: string[];
  ip6al?: number;
  ip6address?: string[];
  ip6gw?: string;
  ap6rp?: string;
  ip6ah?: number;
  mask?: string;
  gateway?: string;
  ip?: string;
}

type Range = "2.4" | "5";

export interface SettingWifiDTO {
  range: Range;
  essid: string;
  passwd: string;
  channel: number;
  width: number;
  started?: boolean;
}

export interface SetWanSettingsDTO {
  state: TypeState;
  params?: Params;
}

export interface SetLanSettingsDTO {
  ip: string;
  mask: string;
  dns: string[];
  gateway: string;
}

export interface toggleWifiDTO {
  range: Range;
  started: boolean;
}

export interface RestoggleWifi {
  range: Range;
  enabled: boolean;
  name: string;
  channel: string;
}

export interface ResGetDHCP {
  ip: string;
  max: number;
  min: number;
}

export interface ChangeDhcpDTO {
  min: number;
  max: number;
}

interface IApiSettings {
  settingWifi: ({
    range,
    essid,
    passwd,
    channel,
    width,
    started,
  }: SettingWifiDTO) => any;
  setWanSettings: (args: SetWanSettingsDTO) => any;
  setLanSettings: (args: SetLanSettingsDTO) => any;
  reset: () => any;
  reboot: () => any;
  changeAuthData: (args: LoginDTO) => any;
  getWifiInfo: () => any;
  getNetworkInfo: () => any;
  getWifiToggleInfo: () => any;
  toggleWifi: (dto: toggleWifiDTO) => any;
  getDHCP: () => any;
  changeDHCP: (dto: ChangeDhcpDTO) => any;
}

const setting: IApiSettings = {
  setLanSettings: async (args) => await fetchSettings({ setLanSettings: args }),
  settingWifi: async (args) => await fetchSettings({ settingWifi: args }),
  setWanSettings: async (args) => await fetchSettings({ setWanSettings: args }),
  reset: async () => await fetchSettings({ reset: {} }),
  reboot: async () => await fetchSettings({ reboot: {} }),
  getWifiInfo: async () => await fetchSettings({ getWifiInfo: {} }),
  getNetworkInfo: async () => await fetchSettings({ getNetworkInfo: {} }),
  changeAuthData: async (args) => await fetchSettings({ changeAuthData: args }),
  getWifiToggleInfo: async () => await fetchSettings({ getWifiToggleInfo: {} }),
  toggleWifi: async (dto) => await fetchSettings({ toggleWifi: dto }),
  getDHCP: async () => await fetchSettings({ getDHCP: {} }),
  changeDHCP: async (dto) => await fetchSettings({ changeDHCP: dto }),
};

export { setting };
