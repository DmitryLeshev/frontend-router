import React from "react";
import { AppContext } from "shared/contexts";

export const withAppContext: any = (Component: any) => (props: any) => {
  return (
    <AppContext.Consumer>
      {(contexts) => <Component {...props} {...contexts} />}
    </AppContext.Consumer>
  );
};
