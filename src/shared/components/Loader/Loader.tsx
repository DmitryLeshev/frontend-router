import React from "react";

import { makeStyles, CircularProgress } from "@material-ui/core";
import clsx from "clsx";

interface Props {
  color?: "primary" | "inherit";
}

const Loader = ({ color }: Props) => {
  const classes = useStyles();
  const loader = <CircularProgress color={color ?? "primary"} />;
  return <div className={clsx(classes.root)}>{loader}</div>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
}));

export default Loader;
