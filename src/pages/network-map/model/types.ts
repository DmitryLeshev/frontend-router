import { cubicApi } from "shared/api";

export type Device = cubicApi.networkMap.Device;

export type Router = {
  external: {
    // внешний
    ip: string;
    ports: cubicApi.networkMap.RouterPortByDevice[];
  };
  internal: {
    // внутренний
    ip: string;
    ports: cubicApi.networkMap.RouterPortByDevice[];
  };
};
