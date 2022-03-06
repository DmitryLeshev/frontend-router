import { combine, createDomain, forward, guard, sample, split } from "effector";
import { createGate } from "effector-react";
import { cubicApi } from "shared/api";

import { modelEvent } from "entities/event";

type FilterArgsKey = keyof cubicApi.event.FilterArgs;

const FilterGate = createGate();
const filterDomain = createDomain("filter-domain");

const $filterEntity = filterDomain.createStore<"incident" | "task">("task");
const filterEntityChange = filterDomain.createEvent<"incident" | "task">();

const $isClosed = filterDomain.createStore<boolean | null>(null);
const isClosedChange = filterDomain.createEvent<boolean | null>();
const initedIsClosed = filterDomain.createEvent<boolean | null>();

const $filter = filterDomain.createStore<cubicApi.event.FilterArgs>({});
const filterReset = filterDomain.createEvent();
$filter.reset(filterReset);

filterReset.watch(() => {
  console.log("reset");
});

sample({
  source: $filterEntity,
  clock: [isClosedChange, initedIsClosed],
  fn: (entity, isClosed) => {
    return entity === "incident" ? null : isClosed;
  },
  target: $isClosed,
});

sample({
  clock: FilterGate.open,
  fn: ({ value }: any) => {
    filterReset();
    filterEntityChange(value);
    initedIsClosed(value === "incident" ? null : false);
  },
});

$filterEntity.on(filterEntityChange, (_, newEntity) => newEntity);

const filterOnChange =
  filterDomain.createEvent<{ key: FilterArgsKey; value: any }>();

$filter.on(filterOnChange, (prev, { key, value }) => {
  return { ...prev, [key]: value };
});

const filterToApplyBtn = filterDomain.createEvent();

const setFiltersFx = filterDomain.createEffect(
  (args: cubicApi.event.FilterArgs) => {
    return cubicApi.event.setFilters(args);
  }
);

const $filterArgs = combine(
  $filter,
  $filterEntity,
  $isClosed,
  (filter, filterEntity, isClosed) => {
    return {
      changeFilters: true,
      crt: filter.crt,
      date: filter.date,
      device: filter.device,
      isClosed: isClosed,
      limit: 100,
    };
    // return { ...filter, entity: filterEntity, isClosed };
  }
);

// const changeFilterTEST = sample({
//   source: [$filter, $filterEntity, $isClosed],
//   clock: [filterToApplyBtn, filterReset, isClosedChange],
//   fn: ([filter, filterEntity, isClosed]) => {
//     modelEvent.taskEvents.resetList();
//     modelEvent.incidentEvents.resetList();
//     return { ...filter, entity: filterEntity, isClosed };
//   },
// });

// forward({
//   from: changeFilterTEST,
//   to: [modelEvent.taskEvents.resetList, modelEvent.incidentEvents.resetList],
// });

// const changeFilter = filterDomain.createEvent();

// sample({
//   source: $filterArgs,
//   clock: changeFilter,
//   fn: (filter) => filter,
//   target: setFiltersFx
// });

// forward({
//   from: changeFilterTEST,
//   to: setFiltersFx,
// });

// guard({
//   source: $filterArgs,
//   clock: setFiltersFx.pending,
//   filter: (filter, pending) => {
//     console.log("Guard", { filter, pending });
//     if (typeof pending !== "boolean") return false;
//     return pending;
//   },
//   target: setFiltersFx,
// });

forward({
  from: FilterGate.close,
  to: filterReset,
});

forward({
  from: filterEntityChange,
  to: filterReset,
});

sample({
  source: [$filterEntity, $filterArgs],
  clock: [
    filterEntityChange,
    modelEvent.detailsEffects.getDetailsFx.doneData,
    filterToApplyBtn,
    $isClosed,
  ],
  fn: ([entity, args]) => {
    modelEvent.taskEvents.resetList();
    entity === "task"
      ? modelEvent.taskEffects.getTasksWithFilterFx(args)
      : modelEvent.incidentEffects.getIncidentsWithFilterFx({
          changeFilters: true,
          crt: args.crt,
          date: args.date,
          device: args.device,
          isClosed: args.isClosed,
          limit: 100,
        });
  },
});

export const stores = { $filter, FilterGate };
export const actions = {
  filterToApplyBtn,
  filterOnChange,
  filterReset,
  isClosedChange,
  setFiltersFx,
  initedIsClosed,
};
