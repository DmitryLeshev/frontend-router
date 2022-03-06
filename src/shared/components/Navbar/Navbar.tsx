import React from "react";

import {
  createStyles,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";

import { useActions, useTypedSelector } from "shared/hooks";
import { Button, Divider, ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import navigationConfig, { settingsConfig } from "./navigationConfig";
import Navigation from "./Navigation";
import { withBarsContext } from "shared/hocs";
import { IBarsContext } from "shared/contexts/bars";
import { selectIsNewDesign } from "shared/store/app/selector";
import { NewDesignLogout, Logo } from "shared/assets/icons";

interface Props extends IBarsContext {}

function Navbar({ navbar, toggleNavbar, toggleSettingsbar }: Props) {
  const state = useTypedSelector((state) => state);
  const isNewDesign = useTypedSelector(selectIsNewDesign);

  const { appChangeSettingbar } = useActions();

  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();
  const content = (
    <div className={clsx(classes.navigation)}>
      {navigationConfig(state).map((list: any) => (
        <Navigation
          taskCounter={{
            countAttacks: 1,
            countTasks: 1,
          }}
          component="nav"
          key={list.title}
          pages={list.pages}
          title={list.title}
        />
      ))}
    </div>
  );

  const backdrop = <div className={classes.backdrop} onClick={toggleNavbar} />;

  return (
    <>
      {mobileDevice && navbar && backdrop}
      <div
        className={clsx(
          classes.navbar,
          { [classes.navbarShift]: navbar },
          { [classes.navbarIsNewDesign]: isNewDesign }
        )}
      >
        {!isNewDesign ? (
          <Divider />
        ) : (
          <div className={classes.logo}>
            <Logo />
          </div>
        )}
        <Divider />
        <ScrollableContentiner>{content}</ScrollableContentiner>
        {isNewDesign && (
          <div className={classes.bottomMenu}>
            <Divider />
            {settingsConfig.map((list: any) => (
              <Navigation
                taskCounter={{
                  countAttacks: 1,
                  countTasks: 1,
                }}
                component="nav"
                key={list.title}
                pages={list.pages}
                title={list.title}
              />
            ))}
            <Divider />
            <Button
              variant="text"
              fullWidth
              className={classes.btn}
              onClick={toggleSettingsbar}
            >
              <NewDesignLogout className={classes.icon_newDesign} />
              Выход
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    backdrop: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1200,
      backgroundColor: `rgba(0, 0, 0, 0.2)`,
    },
    navbar: {
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
    navbarShift: {
      width: theme.drawer.openWidth,
      padding: theme.spacing(0, 2),
      paddingTop: theme.header.height,
      opacity: 1,
      [theme.breakpoints.down("sm")]: {
        width: theme.drawer.openWidth + 50,
      },
    },
    link: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    navigation: { marginTop: theme.spacing(2) },
    navigation_newDesign: { padding: theme.spacing(0, 5) },
    bottomMenu: { marginTop: "auto" },
    navbarIsNewDesign: { padding: 0 },
    logo: {},
    btn: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1, 0),
      justifyContent: "flex-start",
      textTransform: "none",
      letterSpacing: 0,
      width: "100%",
      margin: theme.spacing(1, 0),
      "&:hover": {
        color: theme.palette.primary.light,
      },
      "&:hover $icon_newDesign": {
        fill: theme.palette.primary.light,
      },
    },
    icon_newDesign: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      fill: theme.palette.getContrastText(theme.palette.background.paper),
    },
  })
);

export default withBarsContext(Navbar);
