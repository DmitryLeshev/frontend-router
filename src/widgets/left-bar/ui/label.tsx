import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, useTheme } from "@material-ui/core";

import { selectIsNewDesign } from "shared/store/app/selector";
import { useTypedSelector } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";

export const Label = (props: any) => {
  const isNewDesign = useTypedSelector(selectIsNewDesign);

  const {
    variant = "contained",
    color = null,
    shape = "square",
    children,
    style = {},
    className,
  } = props;

  const classes = useStyles();
  const theme = useTheme();

  const rootClassName = clsx({
    [classes.root]: true,
    [classes.rounded]: shape === "rounded",
  });

  const finalStyle = { ...style };

  if (variant === "contained") {
    finalStyle.backgroundColor = isNewDesign
      ? theme.palette.primary.main
      : color;
    // finalStyle.color = "#FFF";
  } else {
    finalStyle.border = `1px solid ${color}`;
    // finalStyle.color = color;
  }

  return (
    <Typography
      className={clsx(rootClassName, className)}
      style={finalStyle}
      variant="overline"
    >
      {children}
    </Typography>
  );
};

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    lineHeight: "10px",
    fontSize: "10px",
    height: 20,
    minWidth: 20,
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 1),
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5),
  },
}));
