import View from "./Page";
import { reflect } from "@effector/reflect";

import { Wifi24, Wifi5, Local, Internet } from "../settings/components";
import { RouterCard, modelRouter } from "entities/router";

const UsersPage = reflect({
  view: View,
  bind: {
    Wifi24,
    Wifi5,
    Local,
    Internet,
    RouterCard,
    routers: modelRouter.$routers,
  },
  hooks: {
    mounted: () => {
      console.log("HOME Page Mounted");
      modelRouter.effects.getRouterInfoFx();
    },
  },
});

export default UsersPage;
