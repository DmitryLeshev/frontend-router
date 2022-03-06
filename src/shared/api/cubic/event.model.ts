interface IEventBody {
  cves: any[];
  port: string;
  title: string;
}

interface DeviceInfo {
  entityId: number;
  entityType: number;
  type: number;
  name?: string;
}

type Templates = 1 | 2 | 3;

enum EventStatus {
  IN_WORK = 1,
  COMPLETED = 6,
}

type TypeEventStatus = EventStatus.IN_WORK | EventStatus.COMPLETED;

export type EventVarinat = "incident" | "task";

export type Event = {
  body?: IEventBody;
  createTst: number;
  crt: number;
  deviceInfo: DeviceInfo;
  id: number;
  status: TypeEventStatus;
  show?: boolean;
  titleVars: {
    [key: string]: string;
  };
  type: Templates;
};

export type EventFilterDevice = {
  entityId: number;
  entityType: number;
  ip: string;
  name: string;
  typeId: number;
};
