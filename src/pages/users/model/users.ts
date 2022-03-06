import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from "effector";
import { cubicApi } from "shared/api";
import { Response } from "shared/api/config";
import {
  CreateUserArgs,
  DeleteUserArgs,
  User,
  UpdateUserArgs,
} from "shared/api/cubic/users";

const getFx = createEffect(async (): Promise<Response<User[]>> => {
  return await cubicApi.users.getUsers();
});

const get = createEvent();

const createFx = createEffect(
  async (args: CreateUserArgs): Promise<Response<null>> => {
    return await cubicApi.users.createUser(args);
  }
);

const create = createEvent<CreateUserArgs>();

const deleteFx = createEffect(
  async (args: DeleteUserArgs): Promise<Response<null>> => {
    return await cubicApi.users.deleteUser(args);
  }
);

const del = createEvent<DeleteUserArgs>();

const updateFx = createEffect(async (args: UpdateUserArgs) => {
  return cubicApi.users.updateUser(args);
});
const update = createEvent<UpdateUserArgs>();

const $users = createStore<User[]>([]);

$users.on(getFx.doneData, (_store, response) => {
  return response.data;
});

forward({
  from: get,
  to: getFx,
});

forward({
  from: del,
  to: deleteFx,
});

forward({
  from: create,
  to: createFx,
});

forward({
  from: update,
  to: updateFx,
});

sample({
  clock: [createFx.doneData, deleteFx.doneData, updateFx.doneData],
  target: get,
});

$users.watch((state) => {
  console.log("Users", state);
});

export const stores = { $users };
export const actions = { get, create, delete: del, update };
