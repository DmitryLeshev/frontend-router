import { cubicApi } from "shared/api";
import { createEffect, createStore, sample } from "effector";
import { Router } from ".";

const getNetworkInfoFx = createEffect(() => {
  return cubicApi.networkMap.getInfo();
});

const $info = createStore<cubicApi.networkMap.NetworlMapInfo>({
  network: [],
  routers: [],
  wifi: [],
});

$info.on(getNetworkInfoFx.doneData, (prev, data) => (data ? data : prev));

const $ethernet = createStore<cubicApi.networkMap.Device[]>([]);
const $wifi = createStore<cubicApi.networkMap.Device[]>([]);
const $routers = createStore<Router>({
  external: {
    ip: "external",
    ports: [],
  },
  internal: {
    ip: "internal",
    ports: [],
  },
});

sample({
  clock: getNetworkInfoFx.doneData,
  source: $info,
  fn: (info) => info.network,
  target: $ethernet,
});

sample({
  clock: getNetworkInfoFx.doneData,
  source: $info,
  fn: (info) => info.wifi,
  target: $wifi,
});

sample({
  clock: getNetworkInfoFx.doneData,
  source: $info,
  fn: (info) => ({
    external: {
      ip: "external",
      ports: info.routers,
    },
    internal: {
      ip: "internal",
      ports: [],
    },
  }),
  target: $routers,
});

export const stores = { $info, $ethernet, $wifi, $routers };
export const actions = { getNetworkInfoFx };
