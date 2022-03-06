import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { Typography } from "shared/ui/components";
import clsx from "clsx";

interface Props {
  variant: "reception" | "broadcast";
  children: React.ReactElement;
}

export function Subtitle({ variant, children }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography
      className={clsx(classes.subtitle, classes[variant])}
      component={"span"}
      variant="body2"
    >
      {children}
    </Typography>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    subtitle: {
      marginLeft: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      position: "relative",

      "&:before": {
        content: "''",
        position: "relative",
        display: "block",
        width: 16,
        marginRight: theme.spacing(1),
        borderBottom: "1px solid",
        top: 0,
      },
    },
    reception: { color: "#8884d8" },
    broadcast: { color: "#82ca9d" },
  })
);
