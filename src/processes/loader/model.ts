import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";

const toggleLoader = createEvent();

const initialState = false;
const $loader = createStore<boolean>(initialState).on(
  toggleLoader,
  (state) => !state
);

const useIsLoading = () => {
  return useStore($loader);
};

export const actions = { toggleLoader };
export const selectors = { useIsLoading };
