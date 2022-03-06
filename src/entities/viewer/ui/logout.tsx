import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";

import { modelAuthCheck } from "processes/auth";
import { viewerModel } from "entities/viewer";
import { NewDesignLogout } from "shared/assets/icons";
import { Button, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

interface Props {}

export function LogoutButton() {
  const classes = useStyles();
  return (
    <Button
      variant="text"
      fullWidth
      className={classes.btn}
      onClick={async () => {
        await viewerModel.effects.viewerLogOutFx();
        modelAuthCheck.actions.check();
      }}
    >
      <NewDesignLogout className={classes.icon_newDesign} />
      <Typography variant="body1">Выход</Typography>
    </Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
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
