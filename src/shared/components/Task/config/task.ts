import dependencies from "../dependencies";
import { FlashOnIcon } from "shared/assets/icons";

const { IconSwords, IconMessage, IconSettings, IconRadiation } =
  dependencies.icon;

export const TasksTypeImg: any = {
  ATTACK: FlashOnIcon,
  MESSAGE: IconMessage,
  SETTINGS: IconSettings,
  WARNING: IconRadiation,
};

export const TasksType: any = {
  1: "ATTACK",
  2: "MESSAGE",
  3: "SETTINGS",
  4: "WARNING",
};

export const TasksStatus: any = {
  IN_WORK: "in-work",
  DEFERRED: "deferred",
  CANCELED: "canceled",
  COMPLETED: "completed",
};
