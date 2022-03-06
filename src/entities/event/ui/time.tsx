import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { libEvent } from "entities/event";

import { Typography } from "shared/ui/components";
import { AccessTimeIcon } from "shared/assets/icons";

interface Props {
  createTst: number;
}

export function EventCreateTime({ createTst }: Props) {
  const classes = useStyles();
  return (
    <Typography className={classes.create} variant="caption">
      <AccessTimeIcon className={classes.icon} />{" "}
      {libEvent.getFormattedCreationTime(createTst)}
    </Typography>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    create: {
      display: "flex",
      alignItems: "center",
      fontWeight: 300,
    },
    icon: { color: theme.palette.text.primary, marginRight: theme.spacing(1) },
  })
);
