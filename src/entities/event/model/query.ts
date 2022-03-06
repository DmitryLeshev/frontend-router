import { createStore, createEvent, createEffect } from "effector";
import { useStore } from "effector-react";
import { cubicApi } from "shared/api";

type QueryConfig = cubicApi.event.ListArgs & {};

const setQueryConfig = createEvent<QueryConfig>();
const updateQueryConfig = createEvent<any>();
const resetQueryConfig = createEvent();

const queryInitialState: QueryConfig = {
  progressId: 1,
  crt: [0, 10],
  date: [0, 9999999999],
  devices: [],
  lastId: 0,
};

export const $queryConfig = createStore<QueryConfig>(queryInitialState)
  .on(setQueryConfig, (_, payload) => payload)
  .on(updateQueryConfig, (state: any, payload: any) => {
    const [key, value] = Object.entries(payload)[0];
    return { ...state, [key]: value };
  })
  .on(resetQueryConfig, () => queryInitialState);

const useQuery = () => {
  return useStore($queryConfig);
};

export const queryEvents = {
  setQueryConfig,
  updateQueryConfig,
  resetQueryConfig,
};

export const queryEffects = {};

export const querySelectors = {
  useQuery,
};
