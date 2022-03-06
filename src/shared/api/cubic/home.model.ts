type Ap = {
  name: string;
  channel: number;
  range: number;
};

export type TopEvent = {
  id: number;
  type: number;
  crt: number;
  titleVars: {
    [key: string]: string;
  };
  createTst: number;
};

type Devices = {
  cable: {
    count: number;
    new: number;
  };
  wifi: {
    count: number;
    new: number;
  };
};

type Port = {
  duplex: boolean;
  port: number;
  auto: boolean;
  link: boolean;
  speed: number;
  txflow: boolean;
  rxflow: boolean;
  type: "ethernet";
};

export type GetHomeInfoRES = {
  vulner: number;
  incident: number;
  tasks: TopEvent[];
  incidents: TopEvent[];
  localNetwork: {
    ap: Ap[];
    devices: Devices;
    ports: Port[];
  };
  connection: "online" | "offline" | "error" | "not-connected";
};
