import { random } from "../lib";
import { Device, Router } from "./types";

const MIN_PORT = 1000;
const MAX_PORT = 9999;

const NAMES = [
  "mishka",
  "vol4ok",
  "tef-tel",
  "zombe",
  "naruto",
  "bylo4ka",
  "grenka",
];
const OS_PC = ["Windows", "Linux", "MacOs"];
const OS_MOB = ["Android", "IOS"];

const INTERNAL_IP = "192.168.1.1";

const generateRandomPort = () => {
  return random(MIN_PORT, MAX_PORT);
};

const generatePorts = (min: number, max: number) => {
  return Array.from({ length: random(min, max) }).map(() =>
    generateRandomPort()
  );
};

const generateRandomIp = (isInternal?: boolean) => {
  const getByte = () => random(0, 255);
  const [fisrtByte, secondByte] = INTERNAL_IP.split(".");
  return `${isInternal ? fisrtByte : getByte()}.${
    isInternal ? secondByte : getByte()
  }.${getByte()}.${getByte()}`;
};

const generateRandomName = () => {
  return NAMES[random(0, NAMES.length - 1)];
};

const generateRandomOs = (variant: "pc" | "mob") => {
  const array = variant === "pc" ? OS_PC : OS_MOB;
  return array[random(0, array.length - 1)];
};

const generateRandomDevice = (os: "pc" | "mob"): Device => {
  return {
    id: random(1, 200),
    ip: generateRandomIp(true),
    name: generateRandomName(),
    os: generateRandomOs(os),
    ports: generatePorts(1, 10),
  };
};

const generateDevices = (count: number) =>
  Array.from({ length: count }).map(() => generateRandomDevice("pc"));

const generateRandomRouter = (): Router => {
  return {
    external: {
      ip: generateRandomIp(),
      ports: [],
    },
    internal: {
      ip: INTERNAL_IP,
      ports: [],
    },
  };
};

const generateMockData = () => {
  return {
    devices: {
      ethernet: generateDevices(random(1, 6)),
      wifi: generateDevices(random(1, 6)),
    },
    router: generateRandomRouter(),
  };
};

export { generateMockData };
