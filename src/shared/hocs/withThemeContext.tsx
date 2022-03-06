import React from "react";
import { ThemeContext } from "shared/contexts";

export const withThemeContext: any = (Component: any) => (props: any) => {
  return (
    <ThemeContext.Consumer>
      {(contexts: any) => <Component {...props} {...contexts} />}
    </ThemeContext.Consumer>
  );
};
