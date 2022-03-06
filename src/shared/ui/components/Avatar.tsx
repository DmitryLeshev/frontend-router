import React, { ReactElement } from "react";
import { Avatar, createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

interface Props {
  className?: string;
  base64?: string;
  children?: React.ReactElement;
  alt?: string;
}

export default ({ base64, className, children, alt }: Props): ReactElement => {
  const classes = useStyles();
  const ava = !base64 ? (
    children ?? "ava"
  ) : (
    <img src={`data:image/jpeg;base64, ${base64}`} alt={alt ?? "avatar"} />
  );
  return <Avatar className={clsx(className, classes.avatar)}>{ava}</Avatar>;
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    avatar: {},
  })
);
