import React from "react";
import { ITheme } from "shared/ui/theme/theme";
import { createStyles, makeStyles } from "@material-ui/core";

import { Loader } from "shared/components";

interface Props {}

export default function Placeholder({}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.placeholder}>
      <Loader />
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    placeholder: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
    },
  })
);
