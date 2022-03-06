import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { modelLeftbar } from "widgets/left-bar";

import { Logotype } from "features/logotype";
import { SettingsNavigation, SiteNavigation } from "features/navigation";

import { ITheme } from "shared/ui/theme/theme";
import { Button } from "shared/ui/components";

import Navbar from "./navbar.old";

export const Leftbar = () => {
  const leftbar = modelLeftbar.selectors.useLeftbar();
  const classes = useStyles();
  return (
    <div
      className={clsx(classes["left-bar"], {
        [classes["left-bar_shift"]]: leftbar === "OPEN",
      })}
    >
      <Logotype />
      <SiteNavigation />
      <SettingsNavigation />
    </div>
  );
};

export function ToggleLeftbarButton() {
  return (
    <Button onClick={() => modelLeftbar.events.toggleBar()}>Toggle</Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    "left-bar": {
      position: "absolute",
      zIndex: theme.zIndex.drawer,
      top: 0,
      bottom: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(0),
      opacity: 0,
      width: theme.drawer.closeWidth,
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: `all ${theme.drawer.transition}`,
    },
    "left-bar_shift": {
      width: theme.drawer.openWidth,
      padding: theme.spacing(0, 2),
      paddingTop: theme.header.height,
      opacity: 1,
      [theme.breakpoints.down("sm")]: {
        width: theme.drawer.openWidth + 50,
      },
    },
  })
);

export { Navbar };
