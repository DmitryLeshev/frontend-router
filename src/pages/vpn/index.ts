import { reflect } from "@effector/reflect";
import { Page } from "./ui";

const VpnPage = reflect({
  view: Page,
  bind: {},
  hooks: {
    mounted: () => console.log("[VpnPage] mounted"),
    unmounted: () => console.log("[VpnPage] unmounted"),
  },
});

export default VpnPage;
