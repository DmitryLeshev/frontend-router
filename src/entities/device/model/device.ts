import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { events as qEvents, QueryConfig } from "entities/device/model/query";

import { cubicApi, Device } from "shared/api";
import { router } from "shared/lib";
// [C]reate
// [R]ead
// [U]pdate
// [D]delete

const updateDevice = createEvent<cubicApi.device.SetNewResumeArgs>();
const selectedDevice = createEvent<QueryConfig>();
const resetSelectedDevice = createEvent();

const getDevicesFx = createEffect(() => {
  return cubicApi.device.list();
});

const getDeviceByIdFx = createEffect((args: cubicApi.device.GetArgs) => {
  return cubicApi.device.get(args);
});

const getDeviceTasksByIdFx = createEffect(
  (args: cubicApi.device.GetTasksArgs) => {
    return cubicApi.device.getTasks(args);
  }
);

const getDeviceIncidentsByIdFx = createEffect(
  (args: cubicApi.device.GetIncidentsArgs) => {
    return cubicApi.device.getIncidents(args);
  }
);

const getDeviceProgramsByIdFx = createEffect(
  (args: cubicApi.device.GetProgramsArgs) => {
    return cubicApi.device.getPrograms(args);
  }
);

const updateDeviceFx = createEffect(
  (args: cubicApi.device.SetNewResumeArgs) => {
    return cubicApi.device.setNewResume(args);
  }
);

const devicesInitialState: Device[] = [];
const $devices = createStore(devicesInitialState).on(
  getDevicesFx.doneData,
  (_, payload) => {
    return payload.data;
  }
);

type DeviceInitialStateType = {
  info?: any;
  tasks?: any;
  incidents?: any;
  programs?: any;
  details?: Device;
};
const deviceInitialState: DeviceInitialStateType = {};
const $device = createStore(deviceInitialState)
  .on(getDeviceByIdFx.doneData, (state, payload) => {
    return { ...state, info: payload.data };
  })
  .on(getDeviceTasksByIdFx.doneData, (state, payload) => {
    return { ...state, tasks: payload.data };
  })
  .on(getDeviceIncidentsByIdFx.doneData, (state, payload) => {
    return { ...state, incidents: payload.data };
  })
  .on(getDeviceProgramsByIdFx.doneData, (state, payload) => {
    return { ...state, programs: payload.data };
  })
  .on(selectedDevice, (state, payload) => {
    const devices = $devices.getState();
    const details = devices.find((device) => device.id === payload.id);
    return { ...state, details: details };
  })
  .reset(resetSelectedDevice);

const useDevices = () => {
  return useStore($devices);
};

const useDevice = () => {
  return useStore($device);
};

const $deviceLoading = getDeviceByIdFx.pending;
const $tasksLoading = getDeviceTasksByIdFx.pending;
const $incidentsLoading = getDeviceIncidentsByIdFx.pending;
const $programsLoading = getDeviceProgramsByIdFx.pending;

const useDeviceLoading = () => {
  return useStore($deviceLoading);
};

const useTasksLoading = () => {
  return useStore($tasksLoading);
};

const useIncidentsLoading = () => {
  return useStore($incidentsLoading);
};

const useProgramsLoading = () => {
  return useStore($programsLoading);
};

updateDevice.watch(async (payload) => {
  await updateDeviceFx(payload);
  await getDevicesFx();
  await getDeviceByIdFx({ id: payload.id });
});

qEvents.setQueryConfig.watch(async (payload) => {
  if (!payload.id) console.log("history push");
  selectedDevice(payload);
  if (payload.tab === "info") await getDeviceByIdFx(payload);
  else if (payload.tab === "tasks") await getDeviceTasksByIdFx(payload);
  else if (payload.tab === "incidents") await getDeviceIncidentsByIdFx(payload);
  else if (payload.tab === "programs") await getDeviceProgramsByIdFx(payload);
});

updateDeviceFx.doneData.watch(() => {
  getDevicesFx();
});

export const events = {
  updateDevice,
  resetSelectedDevice,
};

export const effects = {
  getDevicesFx,
  getDeviceByIdFx,
  getDeviceTasksByIdFx,
  getDeviceIncidentsByIdFx,
  getDeviceProgramsByIdFx,
  updateDeviceFx,
};

export const selectors = {
  useDevices,
  useDevice,
  useDeviceLoading,
  useTasksLoading,
  useIncidentsLoading,
  useProgramsLoading,
};
