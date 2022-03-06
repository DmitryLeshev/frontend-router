import { reflect } from "@effector/reflect";
import { Page } from "./ui";
import { generateMockData, actions, stores } from "./model";

const data = generateMockData();

const NetworkMapPage = reflect({
  view: Page,
  bind: {
    ethernet: stores.$ethernet,
    wifi: stores.$wifi,
    router: stores.$routers,
  },
  hooks: {
    mounted: async () => {
      actions.getNetworkInfoFx();
      console.log("[NetworkMapPage] mounted");
    },
    unmounted: () => console.log("[NetworkMapPage] unmounted"),
  },
});

export default NetworkMapPage;
