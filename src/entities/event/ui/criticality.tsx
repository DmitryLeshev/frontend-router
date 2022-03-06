import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { Typography } from "shared/ui/components";
import { NewDesignFlash } from "shared/assets/icons";

interface Props {
  crt: number;
}

export function EventCriticality({ crt }: Props) {
  const classes = useStyles({ crt });
  return (
    <div className={classes.container}>
      <div
        className={classes.bg}
        style={{ width: `${Math.floor(crt ?? 0)}0%` }}
      />
      <Typography className={classes.wrapper} variant="caption">
        <NewDesignFlash />{" "}
        <span className={classes.crt}>{String(crt) ?? ""}</span> / 10
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {
      position: "relative",
      zIndex: 10,
      display: "inline-block",
      width: "100%",
      textAlign: "center",
      borderRadius: theme.spacing(3),
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    crt: ({ crt }: any) => {
      const exports: any = {};
      // if (crt <= 3) exports.color = theme.palette.success.main;
      // if (crt <= 7) exports.color = theme.palette.warning.main;
      // if (crt <= 10) exports.color = theme.palette.error.main;
      return exports;
    },
    container: {
      position: "relative",
      borderRadius: theme.spacing(2),
      overflow: "hidden",
      backgroundColor: theme.palette.background.default,
      width: 100,
      marginRight: theme.spacing(3),
    },
    bg: {
      position: "absolute",
      height: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
  })
);
