import { createStore, createEvent } from "effector";

import { homePage } from "shared/utils";

type HomePage = "network-map" | "dashboard";

const set = createEvent<HomePage>();

const $homePage = createStore<HomePage>(homePage.get());
$homePage.on(set, (_, value: HomePage) => {
  homePage.set(value);
  return value;
});

export const stores = { $homePage };
export const actions = { set };
