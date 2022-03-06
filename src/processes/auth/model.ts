import {
  createStore,
  createEffect,
  createEvent,
  sample,
  forward,
  guard,
  split,
} from "effector";
import { useStore } from "effector-react";
import { normalize, schema } from "normalizr";

import { cubicApi } from "shared/api";
import { PING_INTERVAL } from "shared/config";

let interval: NodeJS.Timeout;

const check = createEvent();
const checkTimeout = createEvent();

const getStatusFx = createEffect(() => {
  return cubicApi.auth.status();
});

const getTimeoutFx = createEffect(() => {
  return cubicApi.auth.timeout();
});

export const statusSchema = new schema.Entity("status");
export const normalizeStatus = (data: any) => normalize(data, statusSchema);

export type Status = "cubic-is-not-auth" | "cubic-auth" | "wizard" | "cubic-admin" | null;

export const statusInitialState: Status = null;
const $status = createStore<Status>(statusInitialState).on(
  getStatusFx.doneData,
  (_, payload: any) => payload?.data
);

const timerIncrement = createEvent();
const $timeout = createStore<{ count: number; timer: number }>({
  count: 3,
  timer: 0,
});
$timeout.on(getTimeoutFx.doneData, (prev, res) => {
  if (!res.data) return prev;
  const now = Math.floor(Date.now() / 1000);
  const timer = res.data.timeout - now;
  console.log("TIMER", `${res.data.timeout} - ${now} = ${timer}`);
  console.log("getTimeoutFx", res.data, now, timer);

  return { count: res.data.count, timer };
});
$timeout.on(timerIncrement, (prev) => {
  return { ...prev, timer: prev.timer - 1 };
});

export const $statusLoading = getStatusFx.pending;

const insertTimeout = createEvent<boolean>();
const $isTimeout = createStore<boolean>(false);
$isTimeout.on(insertTimeout, (_, value) => value);

const useStatus = () => {
  return useStore($status);
};

const useTimeout = () => {
  return useStore($timeout);
};

const useIsTimeout = () => {
  return useStore($isTimeout);
};

check.watch(async () => {
  await getStatusFx();
});

forward({
  from: checkTimeout,
  to: getTimeoutFx,
});

sample({
  clock: check,
  source: $status,
  fn: (status) => status === "cubic-is-not-auth",
  target: checkTimeout,
});

sample({
  source: $timeout,
  fn: (t) => t.timer > 0,
  target: insertTimeout,
});

split({
  source: $timeout,
  match: {
    update: (t) => t.timer === 0 && t.count === 0,
  },
  cases: {
    update: checkTimeout,
  },
});

check();
interval = setInterval(() => {
  check();
}, PING_INTERVAL);

export const actions = { check };
export const effects = { getStatusFx, checkTimeout, timerIncrement };
export const selectors = { useStatus, useTimeout, useIsTimeout };
