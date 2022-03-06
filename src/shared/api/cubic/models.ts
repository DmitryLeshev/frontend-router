export type Response<T> = {
  status?: boolean;
  data?: T;
  msg?: string;
};

export type RouterRange = "2.4" | "5";
export type Router = {
  channel: number;
  enabled: boolean;
  name: string;
  range: RouterRange;
};

export type Traffic = {
  "0": number[];
  out: number;
  in: number;
  speedout: number;
  speedin: number;
};

export * from "./event.model";
export * from "./home.model";
export * from "./device.model";
