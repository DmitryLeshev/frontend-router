import React from "react";
import { LangContext } from "shared/contexts";

export const withLangContext: any = (Component: any) => (props: any) => {
  return (
    <LangContext.Consumer>
      {(contexts: any) => <Component {...props} {...contexts} />}
    </LangContext.Consumer>
  );
};
