import React from "react";
import { TypeCubicStatus } from "shared/hocs/withAuth";

export interface IAuthContext {
  auth: {
    logIn: ({ login, password }: any) => Promise<any>;
    logOut: () => Promise<any>;
    check: () => Promise<any>;
    status: TypeCubicStatus;
  };
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export { AuthContext };
