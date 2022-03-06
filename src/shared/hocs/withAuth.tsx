import React from "react";
import { createBrowserHistory } from "history";

import { AuthContext } from "shared/contexts/auth.2";

// import  from "shared/api";
const api: any = {};

interface Props {}

export type TypeCubicStatus = "cubic-auth" | "cubic-is-not-auth";
export enum EnumCubicStatus {
  CUBIC_AUTH = "cubic-auth",
  CUBIC_IS_NOT_AUTH = "cubic-is-not-auth",
}
const DEFAULT_STATUS = EnumCubicStatus.CUBIC_IS_NOT_AUTH;
export type Path = "auth" | "home" | "activation";

const history = createBrowserHistory();
export function withAuth(Child: any) {
  return class extends React.PureComponent<Props> {
    constructor(props: Props) {
      super(props);
      this.move = this.move.bind(this);
      this.check = this.check.bind(this);
      this.logIn = this.logIn.bind(this);
      this.logOut = this.logOut.bind(this);
    }
    status: TypeCubicStatus = DEFAULT_STATUS;

    move(path: Path) {
      switch (path) {
        case "auth":
          return history.push("/auth");

        case "home":
          if (
            history.location.pathname === "/auth" ||
            history.location.pathname === "/"
          ) {
            history.push("/home");
          }
          return;

        case "activation":
          return history.push("/activation/step-1");

        default:
          return;
      }
    }

    async check() {
      const { msg }: any = await api.auth.status();
      if (msg === EnumCubicStatus.CUBIC_AUTH) {
        this.move("home");
      } else if (msg === EnumCubicStatus.CUBIC_IS_NOT_AUTH) {
        this.move("auth");
      } else this.move("activation");
    }

    async logIn({ login, password }: any) {
      await api.auth.login({ login, password });
      await this.check();
    }

    async logOut() {
      await api.auth.logout();
      await this.check();
    }

    render() {
      const { logOut, logIn, check, status } = this;
      return (
        <AuthContext.Provider
          value={{ auth: { logOut, logIn, check, status } }}
        >
          <Child {...this.props} />
        </AuthContext.Provider>
      );
    }
  };
}
