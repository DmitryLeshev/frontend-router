import React from "react";
import { AuthContext } from "shared/contexts";

export const withAuthContext: any = (Component: any) => (props: any) => {
  return (
    <AuthContext.Consumer>
      {(contexts) => <Component {...props} {...contexts} />}
    </AuthContext.Consumer>
  );
};
