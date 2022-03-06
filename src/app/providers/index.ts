import compose from "compose-function";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";
import { withTheme } from "./with-theme";
import { withLang } from "./with-lang";

export const withProviders = compose(
  withStore,
  withRouter,
  withTheme,
  withLang
);
