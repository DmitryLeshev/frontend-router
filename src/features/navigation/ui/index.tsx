import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { Link } from "react-router-dom";
import {
  SITE_NAVIGATION_ROUTES,
  SETTINGS_NAVIGATION_ROUTES,
} from "shared/config";

export const SiteNavigation = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      {SITE_NAVIGATION_ROUTES.map((link) => (
        <Link className={classes.link} to={link.url}>
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export const SettingsNavigation = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      {SETTINGS_NAVIGATION_ROUTES.map((link) => (
        <Link className={classes.link} to={link.url}>
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    nav: () => ({
      display: "flex",
      flexDirection: "column",
    }),
    link: {
      textDecoration: "none",
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
  })
);
