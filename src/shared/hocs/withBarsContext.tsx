import React from "react";
import { BarsContext } from "shared/contexts";

export const withBarsContext: any = (Component: any) => (props: any) => {
  return (
    <BarsContext.Consumer>
      {(contexts) => <Component {...props} {...contexts} />}
    </BarsContext.Consumer>
  );
};
