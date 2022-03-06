import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Card, Page } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

import {
  Reboot,
  Reset,
  Update,
  LoginPass,
  Connection,
  ConnectionSettings,
  SetHomePage,
  Adminka,
} from "./components";
import { ScrollableContentiner } from "shared/ui/components";
import { Agent } from "./components/Agent";

interface Props {
  route: any;
}

export default memo(function System({ route }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Page title={t("system:page")}>
      <ScrollableContentiner>
        <div className={classes.template}>
          <div className={classes.rebootResetWrapper}>
            <Reboot />
            <Reset />
          </div>
          <LoginPass />
          <div className={classes.wrapper}>
            <Update />
            <Agent />
            <SetHomePage />
            <Adminka />
          </div>
          <ConnectionSettings />
        </div>
      </ScrollableContentiner>
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: {
      display: "grid",
      padding: theme.spacing(1.5, 3),
      gridTemplateAreas: `
        "wr-reb-res wr-reb-res update update"
        "loginpass loginpass update update"
        "connection-settings connection-settings update update"
      `,
      gap: theme.spacing(3),
      width: 1224,
      margin: `${theme.spacing(6)}px auto`,
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gridArea: "update",
      maxWidth: 400,
      gap: theme.spacing(2),
    },
    rebootResetWrapper: {
      gridArea: "wr-reb-res",
      display: "flex",
      gap: theme.spacing(3),
    },
  })
);
