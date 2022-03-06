import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { modelLoader } from "processes/loader";

import { cubicApi } from "shared/api";

export type QueryConfig = {
  login: string;
  password: string;
};

const logIn = createEvent();
const logOut = createEvent();

export type ViewerInitialState = {
  status: string;
};

export const viewerInitialState: ViewerInitialState = {
  status: "not-auth",
};

export const $viewer = createStore(viewerInitialState).on(
  logIn,
  (_, payload) => payload
);

const viewerLogInFx = createEffect(async (args: cubicApi.auth.LoginArgs) => {
  modelLoader.actions.toggleLoader();
  const res = await cubicApi.auth.login(args);
  modelLoader.actions.toggleLoader();
  return res;
});

const viewerLogOutFx = createEffect(async () => {
  modelLoader.actions.toggleLoader();
  const res = await cubicApi.auth.logout();
  modelLoader.actions.toggleLoader();
  return res;
});

export const $viewerLoading = viewerLogInFx.pending;

const useVeiwer = (): ViewerInitialState => {
  return useStore($viewer);
};

export const events = {
  logIn,
  logOut,
};

export const effects = {
  viewerLogInFx,
  viewerLogOutFx,
};

export const selectors = {
  useVeiwer,
};
