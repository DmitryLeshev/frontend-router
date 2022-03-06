import { createEffect, createStore } from "effector";
import { useStore } from "effector-react";
import { cubicApi, GetHomeInfoRES } from "shared/api";

const getMainInfoFx = createEffect(() => {
  return cubicApi.home.getHomeInfo();
});

const $info = createStore<GetHomeInfoRES | null>(null).on(
  getMainInfoFx.doneData,
  (_, payload) => payload.data
);

getMainInfoFx();

const useInfo = () => {
  return useStore($info);
};

export const effects = { getMainInfoFx };
export const selectors = { useInfo };
