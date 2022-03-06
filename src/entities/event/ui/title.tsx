import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import type { EventVarinat } from "shared/api";
import { Typography } from "shared/ui/components";
import clsx from "clsx";

interface Props {
  type: number;
  variant: EventVarinat;
  titleVars: {
    [key: string]: string;
  };
}

export function EventTitle({ variant, type, titleVars }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography className={clsx(classes.title)} variant="h5">
      {t(`${variant}:list.${type}.title`, { ...titleVars })}
    </Typography>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    title: { position: "relative", fontWeight: 500 },
  })
);
