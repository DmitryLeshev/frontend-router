import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { modelLoader } from "processes/loader";
import { cubicApi } from "shared/api";
import type { Router, RouterRange } from "shared/api";

const toggleRouter = createEvent<Router>();

const getRouterInfoFx = createEffect(() => {
  return cubicApi.router.getWifiToggleInfo();
});

const toggleWifiFx = createEffect((args: cubicApi.router.toggleWifiArgs) => {
  return cubicApi.router.toggleWifi(args);
});

export const routerInitialState: Router[] = [];

export const $routers = createStore(routerInitialState).on(
  getRouterInfoFx.doneData,
  (_, payload) => {
    return payload.data;
  }
);

export const $routersLoading = getRouterInfoFx.pending;

const useRouters = (): Router[] => {
  return useStore($routers);
};

const useRouter = (range: RouterRange | undefined): Router | undefined => {
  const routers = useStore($routers);
  return routers?.find((router) => router.range === range);
};

toggleRouter.watch(async (payload) => {
  modelLoader.actions.toggleLoader();
  await toggleWifiFx({ range: payload.range, started: !payload.enabled });
  const timeout = setTimeout(async () => {
    await getRouterInfoFx();
    clearTimeout(timeout);
    modelLoader.actions.toggleLoader();
  }, 10000);
});

export const events = {
  toggleRouter,
};

export const effects = {
  getRouterInfoFx,
  toggleWifiFx,
};

export const selectors = {
  useRouter,
  useRouters,
};
