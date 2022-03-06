import { fetchApi } from "./base";
import type { Response } from "./models";

const CONTROLLER = "setting";
const METHOD = {
  GET: "getSettingsFirewall",
};

const fetchNetworkMap: any = fetchApi(CONTROLLER);

export type FirevalInfo = {
  isRouter: true;
  id: number;
  ip: string;
  mac: string;
  name: string;
  online: boolean;
  type: number;
  wired: boolean;
  firewall?: Firewall[];
  ports?: {
    [key: string]: string;
  };
};

export type Firewall = {
  dest_ip: string;
  src_dport: number;
  dest_port: number;
};

export type RouterPortByDevice = {
  deviceId: number;
  devicePort: number;
  port: number;
};

export type Device = {
  id: number;
  ip: string;
  name: string;
  os: string;
  ports: number[];
};

export type Router = {
  external: {
    // внешний
    ip: string;
    ports: RouterPortByDevice[];
  };
  internal: {
    // внутренний
    ip: string;
    ports: RouterPortByDevice[];
  };
};

function getRouterPorts(data: FirevalInfo[], firewall: Firewall[]) {
  return firewall.map(({ dest_ip, src_dport, dest_port }) => {
    const device = data.find((item) => item.ip === dest_ip);

    let routerPort: RouterPortByDevice = {
      deviceId: device?.id ?? 666,
      devicePort: Number(dest_port),
      port: device ? Number(src_dport) : 666,
    };
    return routerPort;
  });
}

export type NetworlMapInfo = {
  network: Device[];
  wifi: Device[];
  routers: RouterPortByDevice[];
};

function deviceAdapter(item: FirevalInfo) {
  const deviceProrts = item?.ports
    ? Object.keys(item.ports).map((port) => Number(port))
    : [];
  const firewalPorts = item?.firewall?.map((f) => Number(f.dest_port)) ?? [];
  return {
    id: item.id,
    ip: item.ip,
    name: item.name,
    os: item.name,
    ports: [...firewalPorts, ...deviceProrts],
  };
}

export const getInfo = async (): Promise<NetworlMapInfo | null> => {
  const { data }: Response<FirevalInfo[]> = await fetchNetworkMap({
    [METHOD.GET]: { format: "map" },
  });
  if (!data) return null;
  return data.reduce<NetworlMapInfo>(
    (acc, item) => {
      if (item.firewall) {
        acc.routers = [...acc.routers, ...getRouterPorts(data, item.firewall)];
      }
      if (item.wired) acc.wifi = [...acc.wifi, deviceAdapter(item)];
      else acc.network = [...acc.network, deviceAdapter(item)];
      return acc;
    },
    { network: [], wifi: [], routers: [] }
  );
};
