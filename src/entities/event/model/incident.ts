import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { cubicApi } from "shared/api";
import type { Event } from "shared/api";
import { _trDate } from "shared/utils";

type QueryConfig = cubicApi.event.ListArgs & {};

const updateIncident = createEvent();
const getNextIncidents = createEvent<QueryConfig>();
const resetIncidents = createEvent();

const getIncidentsListFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.incidentList(args);
});

const getNextIncidentsFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.incidentList(args);
});

const getIncidentFx = createEffect((args: cubicApi.event.GetArgs) => {
  return cubicApi.event.incidentGet(args);
});

const getIncidentsWithFilterFx = createEffect(
  (args: cubicApi.event.IncidentListWithFiltersArgs) => {
    return cubicApi.event.incidentListWithFilters(args);
  }
);

const incidentsInitialState: Event[] = [];
const resetList = createEvent();
const $incidents = createStore(incidentsInitialState)
  // .on(getIncidentsListFx.doneData, (_, payload) => {
  //   return payload.data;
  // })
  // .on(resetIncidents, () => incidentsInitialState)
  // .on(getNextIncidentsFx.doneData, (state, payload) => {
  //   console.log({ state, payload });
  //   if (!state.length) return state; // !!!
  //   return [...state, ...(payload.data ?? [])];
  // })
  .on(getIncidentsWithFilterFx.doneData, (prev, events) => {
    let flags: { [id: number]: boolean } = {};
    return [...events.data].filter((item) => {
      if (flags[item.id]) return false;
      flags[item.id] = true;
      return true;
    });
  })
  .reset(resetList);

const $incidentsListLoading = getIncidentsListFx.pending;

const $incidentsList = combine($incidents, (incidents) => {
  return Object.values(incidents);
});

const $incidentsIsEmpty = combine(
  $incidentsList,
  (incidentsList) => incidentsList.length < 1
);

const $lastIncidentId = combine($incidents, (incidents) => {
  return incidents[incidents.length - 1]?.id ?? 0;
});

const useIncident = (
  incidentId: number
): import("shared/api").Event | undefined => {
  return useStore($incidents)[incidentId];
};

const useIncidentsList = (): import("shared/api").Event[] => {
  return useStore($incidentsList);
};

const useIncidentListLoading = () => {
  return useStore($incidentsListLoading);
};

const useIncidentListIsEmpty = () => {
  return useStore($incidentsIsEmpty);
};

const useLastIncidentId = () => {
  return useStore($lastIncidentId);
};

export const incidentEvents = {
  resetIncidents,
  updateIncident,
  getNextIncidents,
  resetList,
};

export const incidentEffects = {
  getIncidentFx,
  getIncidentsListFx,
  getNextIncidentsFx,
  getIncidentsWithFilterFx,
};

export const incidentSelectors = {
  useIncident,
  useIncidentsList,
  useIncidentListLoading,
  useIncidentListIsEmpty,
  useLastIncidentId,
};
