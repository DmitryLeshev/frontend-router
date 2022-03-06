import * as users from "./users";
import * as logs from "./logs";

export const stores = { ...logs.stores, ...users.stores };
export const actions = { ...logs.actions, ...users.actions };
