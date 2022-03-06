import { ReactElement } from "react";

export type NavigationRoute = {
  id: number;
  url: string;
  Icon: ReactElement;
  title: string;
};

export const SITE_NAVIGATION_ROUTES: NavigationRoute[] = [
  { id: 1, url: "/home", Icon: <div>Icon</div>, title: "home" },
  { id: 2, url: "/tasks", Icon: <div>Icon</div>, title: "tasks" },
  { id: 3, url: "/incidents", Icon: <div>Icon</div>, title: "incidents" },
  { id: 4, url: "/devices", Icon: <div>Icon</div>, title: "devices" },
  { id: 5, url: "/system", Icon: <div>Icon</div>, title: "system" },
];

export const SETTINGS_NAVIGATION_ROUTES: NavigationRoute[] = [
  { id: 1, url: "/profile", Icon: <div>Icon</div>, title: "profile" },
  { id: 2, url: "/settings", Icon: <div>Icon</div>, title: "settings" },
];
