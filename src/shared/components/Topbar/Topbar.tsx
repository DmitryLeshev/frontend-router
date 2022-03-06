import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { AppBar, Toolbar, createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Typography, IconButton } from "shared/ui/components";
import { ExitToAppIcon, MenuIcon, SettingsIcon } from "shared/assets/icons";
import { ITheme } from "shared/ui/theme/theme";
import { withAuthContext, withBarsContext } from "shared/hocs";
import { IBarsContext } from "shared/contexts/bars";
import { IAuthContext } from "shared/contexts/auth";

interface Props extends IBarsContext, IAuthContext {}

function Topbar({ auth, navbar, toggleNavbar, toggleSettingsbar }: Props) {
  const classes = useStyles();
  const match = useRouteMatch();

  function changeNavbar() {
    toggleNavbar();
  }

  function changeSettingsbar() {
    toggleSettingsbar();
  }

  const isNotDashboard = match.url === "/auth" || match.url === "/activation";
  return (
    <AppBar
      className={clsx(classes.header, {
        [classes.topBarShift]: !isNotDashboard && navbar,
      })}
      color="primary"
      position="relative"
    >
      <Toolbar>
        {!isNotDashboard && (
          <IconButton onClick={changeNavbar}>
            <MenuIcon className={classes.icon} />
          </IconButton>
        )}

        <Typography
          className={classes.brend}
          variant="h4"
          component={Link}
          to="/home"
        >
          GrifBox
        </Typography>

        <IconButton className={classes.right} onClick={changeSettingsbar}>
          <SettingsIcon className={classes.icon} />
        </IconButton>
        {!isNotDashboard && (
          <IconButton
            onClick={async () => {
              await auth.logOut();
            }}
          >
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    header: {
      boxShadow: "none",
      height: theme.header.height,
      transition: theme.drawer.transition,
      justifyContent: "center",
    },
    topBarShift: {
      width: `calc(100% - ${theme.drawer.openWidth}px)`,
      marginLeft: theme.drawer.openWidth,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0,
      },
    },
    brend: {
      fontWeight: 700,
      marginLeft: theme.spacing(1),
      color: theme.palette.getContrastText(theme.palette.primary.main),
      textDecoration: "none",
    },
    icon: {
      width: 30,
      height: 30,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    right: {
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
  })
);

export default withBarsContext(withAuthContext(Topbar));
