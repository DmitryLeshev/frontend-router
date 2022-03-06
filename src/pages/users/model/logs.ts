import { createStore, createEffect, createEvent, forward } from "effector";

import { Response } from "shared/api/config";
import { GetLogArgs, Log as ResponseLog, getLog } from "shared/api/cubic/users";

export type Log = Omit<ResponseLog, "user" | "params"> & {
  login: string;
  params: string;
};

const getFx = createEffect(
  async (args: GetLogArgs): Promise<Response<ResponseLog[]>> => {
    return await getLog(args);
  }
);

const getLogs = createEvent<GetLogArgs>();
const resetLogs = createEvent();

const $logs = createStore<Log[]>([]);

$logs.on(getFx.doneData, (_, response) => {
  if (!response.data) return [];
  return response.data.map((el) => {
    const params = Object.entries(el.params)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";");
    return { ...el, login: el.user, params };
  });
});

$logs.reset(resetLogs);

forward({
  from: getLogs,
  to: getFx,
});

export const stores = { $logs };
export const actions = { getLogs, resetLogs };
