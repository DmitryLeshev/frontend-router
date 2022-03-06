import React from "react";

export interface IAuthContext {
  auth: any;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export { AuthContext };
