import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { Typography } from "shared/ui/components";
import clsx from "clsx";

interface Props {
  id: number;
  className?: string;
}

export function EventID({ id, className }: Props) {
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.id, className)} varinat="h5">
      #{id}
    </Typography>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    id: {},
  })
);
