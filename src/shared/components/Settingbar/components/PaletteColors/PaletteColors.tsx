import React from "react";
import { useSnackbar } from "notistack";

import { makeStyles, Typography } from "@material-ui/core";

import { GithubPicker } from "react-color";

import {
  useActions,
  useDebounce,
  useColorPicker,
  useTypedSelector,
} from "shared/hooks";
import { withThemeContext } from "shared/hocs";
import { IThemeContext } from "shared/contexts/theme";

function setThemeToLocalStorage(theme: any) {
  localStorage.setItem("setting.theme", JSON.stringify(theme));
}

function getThemeToLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("setting.theme") ?? "");
  } catch (error) {
    return { colors: { primary: null, secondary: null } };
  }
}

interface Props extends IThemeContext {}

const PaletteColors = ({ changeColor }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h5" paragraph>
        Цвет
      </Typography>
      <GithubPicker
        className={classes.picker}
        onChangeComplete={(color: any) => changeColor("primary", color.hex)}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 0),
  },
  picker: { minWidth: 212 },
}));

export default withThemeContext(PaletteColors);
