import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

export type QueryConfig = {
  id: number;
  tab?: string;
};

const setQueryConfig = createEvent<QueryConfig>();

const $queryConfig = createStore<QueryConfig | null>(null).on(
  setQueryConfig,
  (_, payload) => payload
);

const useQuery = () => {
  return useStore($queryConfig);
};

export const events = {
  setQueryConfig,
};

export const effects = {};

export const selectors = {
  useQuery,
};
