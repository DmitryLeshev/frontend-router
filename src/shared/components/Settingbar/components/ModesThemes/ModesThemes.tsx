import React from "react";

import { Switch, Typography, makeStyles } from "@material-ui/core";
import { useActions, useTypedSelector } from "shared/hooks";
import { withThemeContext } from "shared/hocs";
import { IThemeContext } from "shared/contexts/theme";

interface Props extends IThemeContext {}

const ModesThemes = ({ mode, toggleMode }: Props) => {
  const classes = useStyles();

  function onChange() {
    toggleMode();
  }

  return (
    <div className={classes.modesThemes}>
      <Typography className={classes.modesThemeTitle} variant="h5">
        Тема
      </Typography>

      <div className={classes.switch}>
        <Typography className={classes.switchItem} variant="button">
          Светлая
        </Typography>

        <Switch checked={mode === "light" ? false : true} onChange={onChange} />

        <Typography className={classes.switchItem} variant="button">
          Тёмная
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modesThemes: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  modesThemeTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  switch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  switchItem: {
    textAlign: "center",
  },
}));

export default withThemeContext(ModesThemes);
