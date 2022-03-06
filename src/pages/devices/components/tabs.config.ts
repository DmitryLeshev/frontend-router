import { ITab } from "shared/components/Tabs/Tabs";
import TabInfo from "./TabInfo";
import TabPrograms from "./TabPrograms";
import TabEvents from "./TabEvents";

const TABS = {
  info: "info",
  programs: "programs",
  tasks: "tasks",
  incidents: "incidents",
};

export const TABS_COMPONENTS = {
  [TABS.info]: TabInfo,
  [TABS.programs]: TabPrograms,
  [TABS.tasks]: TabEvents,
  [TABS.incidents]: TabEvents,
};

const tabsConfig = (id: string, agent: boolean): ITab[] => {
  const tabs: any = ["info", "programs", "tasks", "incidents"].filter((tab) => {
    if (!agent && tab === "programs") return false;
    return true;
  });
  return tabs.map((tab: string, idx: number) => {
    return {
      i18next: `devices:${tab}.tab`,
      url: `/devices?id=${id}&tab=${tab}`,
      id: idx,
      tab,
    };
  });
};

export default tabsConfig;
