import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { cubicApi } from "shared/api";

const runSpeedTestStart = createEvent();
const runSpeedTestEnd = createEvent();
const runSpeedTestFx = createEffect(() => {
  return cubicApi.speed.runSpeedTest();
});

const getSpeed = createEvent();
const getSpeedFx = createEffect(() => {
  return cubicApi.speed.getSpeed();
});

type StateSpeed = {
  ping: number;
  download: number;
  upload: number;
};
const initialStateSpeed: StateSpeed = {
  download: 0,
  ping: 0,
  upload: 0,
};
const $speed = createStore(initialStateSpeed).on(
  getSpeedFx.doneData,
  (_, payload) => payload.data
);

const initialStateTesting: boolean = false;
const $isTesting = createStore(initialStateTesting)
  .on(runSpeedTestStart, () => true)
  .on(runSpeedTestEnd, () => false);

getSpeed.watch(async () => {
  await getSpeedFx();
});

runSpeedTestStart.watch(async () => {
  await runSpeedTestFx();
  const timeout = setTimeout(async () => {
    await getSpeedFx();
    runSpeedTestEnd();
    clearTimeout(timeout);
  }, 40 * 1000);
});

export const selectors = {
  useSpeed: () => useStore($speed),
  useIsTesting: () => useStore($isTesting),
};

export const actions = { getSpeed, runSpeedTestStart };
