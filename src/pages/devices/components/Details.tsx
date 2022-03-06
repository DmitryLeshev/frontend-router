import React, { memo, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { DeviceIcon, Tabs, Loader } from "shared/components";
import { Divider, Typography } from "shared/ui/components";
import { useGetParameter, useTabs } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";

import tabsConfig, { TABS_COMPONENTS } from "./tabs.config";
import { useEffect } from "react";
import { ItemDevice } from "../Devices";
import { useRouter } from "shared/hooks";
import { modelDevices } from "entities/device";

interface Props {}

export default memo(function Details({}: Props) {
  const { t } = useTranslation();
  const usetabs = useTabs();
  const { match } = useRouter<{ id: string }>();

  const classes = useStyles();
  const device = modelDevices.selectors.useDevice();
  const isLoading = modelDevices.selectors.useDeviceLoading();

  const id: any = useGetParameter("id");
  const tab: any = useGetParameter("tab");

  if (!device.details) return <Loader />;

  const Component: any = TABS_COMPONENTS[tab];

  return (
    <>
      <div className={classes.detail}>
        <DeviceIcon className={classes.icon} type={device.details?.type ?? 0} />
        <div className={classes.names}>
          <Typography className={classes.name} variant="h4">
            {device.details?.name}
          </Typography>
          <Typography className={classes.ip} variant="body1">
            {device.details?.ip}
          </Typography>
          <Typography className={classes.ip} variant="body1">
            {device.details?.mac}
          </Typography>
        </div>
        {device.details?.agent && (
          <Typography className={classes.status}>
            {device.details?.online === true
              ? t("devices:header.agentIsRunning")
              : t("devices:header.agentIsInstall")}
          </Typography>
        )}
        <Tabs
          className={classes.tabs}
          {...usetabs}
          match={match}
          tabsConfig={tabsConfig(id, device.details?.agent ?? true)}
        />
      </div>
      {isLoading ? <Loader /> : Component && <Component />}
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    detail: {
      display: "grid",
      gridTemplateColumns: "max-content 1fr max-content",
      gridAutoRows: "max-content",
      margin: theme.spacing(0, 2, 1),
      padding: theme.spacing(1, 0, 0),
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
      alignItems: "center",
      borderRadius: theme.spacing(2),
    },
    tabs: {
      gridColumn: "1/5",
      marginTop: theme.spacing(1),
      background: "none",
      boxShadow: "none",
      borderTop: `1px solid ${theme.palette.background.default}`,
      borderRadius: `0px 0px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
      overflow: "hidden",
    },
    icon: {
      margin: theme.spacing(0, 2),
      width: 80,
      height: 80,
      fill: theme.palette.primary.main,
    },
    status: { margin: theme.spacing(0, 2), color: theme.palette.success.main },
    names: {},
    tab: {
      display: "grid",
      gap: theme.spacing(2),
      padding: theme.spacing(0, 2),
      flexGrow: 2,
      overflow: "auto",
      height: 0,
    },
    name: {},
    ip: {},
  })
);
