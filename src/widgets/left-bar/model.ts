import { combine, createEvent, createStore } from "effector";
import { useStore } from "effector-react";

export type Status = "OPEN" | "CLOSE";

const toggleBar = createEvent();

const $leftbar = createStore<Status>("OPEN").on(toggleBar, (state) => {
  return state === "OPEN" ? "CLOSE" : "OPEN";
});

const $isOpen = combine($leftbar, (leftbar) =>
  leftbar === "OPEN" ? true : false
);

const useLeftbar = () => {
  return useStore($leftbar);
};

const useIsOpenLeftbar = () => {
  return useStore($isOpen);
};

export const events = {
  toggleBar,
};

export const selectors = {
  useLeftbar,
  useIsOpenLeftbar,
};
