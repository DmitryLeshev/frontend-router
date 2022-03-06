import { createStore, createEffect, createEvent, forward } from "effector";
import { useStore, createGate } from "effector-react";

import { cubicApi, EventFilterDevice } from "shared/api";

const devicesGate = createGate();

const $devices = createStore<EventFilterDevice[]>([]);
const useDevices = () => useStore($devices);

const getDevicesFx = createEffect(() => cubicApi.event.getFeilterDevices());
$devices.on(getDevicesFx.doneData, (_, payload) => payload.data);

const $selectedDevice = createStore<EventFilterDevice | null>(null);
const useSelecetedDevices = () => useStore($selectedDevice);

const selectDevice = createEvent<EventFilterDevice>();

$selectedDevice.on(selectDevice, (_, payload) => payload);

forward({
  from: devicesGate.open,
  to: getDevicesFx,
});

export const devicesEvents = {
  selectDevice,
};

export const devicesEffects = {
  getDevicesFx,
};

export const devicesSelectors = {
  useSelecetedDevices,
  useDevices,
};

export const devicesGates = {
  devicesGate,
};
