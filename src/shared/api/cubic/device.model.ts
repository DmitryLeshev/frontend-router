enum TypeDevice {
  "unknown" = 0,
  "station" = 1,
  "server" = 2,
  "printer" = 3,
  "router" = 4,
  "ip_telephony" = 5,
  "camera" = 6,
  "tv" = 7,
  "tv_box" = 8,
  "wifi" = 9,
  "phone" = 10,
  "security" = 11,
  "cash" = 12,
  "bluetooth" = 13,
}

enum DhcpStatusDevice {
  REACHABLE = "REACHABLE",
  PERMANENT = "PERMANENT",
  STALE = "STALE",
  DELAY = "DELAY",
}

export type Device = {
  id: number;
  name: string;
  ip: string;
  type: TypeDevice;
  mac: string;
  online: number | boolean;
  agent: false;
  os: string;
  isUserOs: false;
  dhcpStatus: DhcpStatusDevice;
  sip: number;
  isRouter: boolean;
};
