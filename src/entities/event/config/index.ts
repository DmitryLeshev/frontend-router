import type { ITab } from "shared/components/Tabs/Tabs";

export const tabs: ITab[] = [
  {
    id: 0,
    i18next: "tasks_tabs.in-work",
    url: "/tasks?status=in-work",
    tab: "in-work",
  },
  {
    id: 1,
    i18next: "tasks_tabs.completed",
    url: "/tasks?status=completed",
    tab: "completed",
  },
];
