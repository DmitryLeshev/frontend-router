import View from "./Users";
import * as model from "./model";
import { reflect } from "@effector/reflect";

const UsersPage = reflect({
  view: View,
  bind: {
    users: model.stores.$users,
    getUsers: model.actions.get,
    deleteUser: model.actions.delete,
    createUser: model.actions.create,
  },
  hooks: {
    mounted: () => {
      console.log("Users Page Mounted");
      model.actions.get();
    },
  },
});

export default UsersPage;
