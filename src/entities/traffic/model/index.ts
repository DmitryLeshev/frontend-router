import { createStore, createEffect } from "effector";
import { useStore } from "effector-react";

import { cubicApi, Traffic } from "shared/api";

const getTrafficFx = createEffect(() => {
  return cubicApi.traffic.getGraphicData();
});

const initialState: Traffic[] = [];

export const $traffic = createStore(initialState).on(
  getTrafficFx.doneData,
  (_, payload) => payload.data
);

const useTraffic = () => {
  return useStore($traffic);
};

export const effects = { getTrafficFx };
export const selectors = { useTraffic };
