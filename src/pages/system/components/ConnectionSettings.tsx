import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Card, Enumeration } from "shared/components";
import { Typography } from "shared/ui/components";

import { ITheme } from "shared/ui/theme/theme";
import { modelNetworkPort } from "entities/local-network";

import { Connection } from "./";
import apiOld from "shared/api.old";

type Props = {};

const ConnectionSettings: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const info = modelNetworkPort.selectors.useInfo();

  const [connectInfo, setConnectInfo] = useState<{ ip: string; key: string }>();

  async function fetchConnectInfo() {
    const res = await apiOld.server.getConnectInfo();
    if (!res.data) return console.log({ res });
    setConnectInfo(res.data);
  }

  useEffect(() => {
    fetchConnectInfo();
  }, []);

  const header = (
    <Typography variant="h5">{t("system:connection-settings")}</Typography>
  );

  const body = (
    <>
      {info?.connection === "not-connected" ? (
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body2"
        >
          Данный функционал позволяет отделу информционной безопастности быть в
          курсе текущего состояния инфраструктуры локальной сети и своевременно
          давать рекомендации пользователю. Для подключения требуется ввести
          хост и ключ, выданные компанией или администратором.
        </Typography>
      ) : (
        <Enumeration
          listItemProps={classes.listItem}
          items={[
            {
              key: <Typography>IP:</Typography>,
              value: <Typography>{connectInfo?.ip}</Typography>,
            },
            {
              key: <Typography>Status:</Typography>,
              value:
                info?.connection &&
                t(`common:status.${info?.connection?.toLocaleLowerCase()}`),
              valueSeconday:
                info?.connection?.toLocaleLowerCase() === "error"
                  ? t(`common:status.contact the administrator`)
                  : "",
            },
          ]}
        />
      )}
    </>
  );

  const footer = <Connection />;

  return (
    <Card
      className={classes.card}
      header={header}
      body={body}
      footerProps={{ className: classes.footer }}
      footer={footer}
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "connection-settings", width: "auto" },
    status_wrapper: {
      padding: theme.spacing(1, 3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 72,
    },
    circle: {
      display: "flex",
      minWidth: 18,
      minHeight: 18,
      backgroundColor: theme.palette.success.main,
      borderRadius: "50%",

      marginRight: theme.spacing(1),
    },
    off: { backgroundColor: theme.palette.grey[500] },
    disconnect: { backgroundColor: theme.palette.error.main },
    listItem: { paddingLeft: 0, paddingRight: 0 },
    footer: { flexDirection: "column" },
    text: { width: "auto" },
  })
);

export default ConnectionSettings;
