import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "shared/components";
import { Button, Typography } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { downloadAgent } from "shared/utils";

interface Props {}

export const Agent = (props: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const header = (
    <Typography variant="h5">{t(`devices:info.agent.title`)}</Typography>
  );
  const footer = (
    <Button className={classes.btn_right} onClick={downloadAgent}>
      {t(`devices:info.agent.download-agent`)}
    </Button>
  );

  return <Card header={header} footer={footer} />;
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: () => ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(2),
      transition: "all 0.3s",
    }),
    header: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
    },
    body: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
    },
    footer: {
      display: "flex",
      padding: theme.spacing(1, 2),
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
    },
    btn_right: { marginLeft: "auto" },
  })
);
