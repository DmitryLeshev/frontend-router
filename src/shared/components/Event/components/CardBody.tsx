import React from "react";
import { makeStyles } from "@material-ui/core";
import { DeviceInfo } from "../Event";
import { useTranslation } from "react-i18next";
import DeviceIcon from "shared/components/DeviceIcon";
import { Typography } from "shared/ui/components";
import clsx from "clsx";

interface CardBodyProps {
  crt: number;
  deviceInfo: DeviceInfo;
  isFullScreen: boolean;
}

const CardBody = ({ crt, deviceInfo, isFullScreen }: CardBodyProps) => {
  const classes = useStyles({ isFullScreen });
  const { t } = useTranslation();
  const tBase = `task:item`;
  const taskСriticality = t(`${tBase}.taskСriticality`);
  const device = t(`${tBase}.device`);

  if (isFullScreen) {
    return <div className={classes.body}>isFullScreen</div>;
  }

  const variant = crt < 3 ? "success" : crt < 7 ? "warning" : "error";

  return (
    <div className={classes.body}>
      <div className={clsx(classes.crt, classes.item)}>
        <p className={classes.key}>{taskСriticality}</p>
        <p className={classes.value}>
          <Typography
            className={classes.crtValue}
            color={variant}
            variant="body2"
            component="span"
          >
            {crt}
          </Typography>
          &nbsp;/ 10{" "}
        </p>
      </div>
      <div className={clsx(classes.devices, classes.item)}>
        <p className={classes.key}>{device}</p>
        <p className={classes.value}>
          <DeviceIcon className={classes.icon} type={deviceInfo.entityType} />
          {deviceInfo.name}
        </p>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  body: ({ isFullScreen }: any) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(0, 2, 2),
  }),
  scrollbarStyles: {
    flexGrow: 1,
  },
  crt: {},
  crtValue: { fontWeight: "bold" },
  devices: {},
  key: { display: "block", minWidth: 300 },
  value: { display: "flex", alignItems: "center" },
  item: { display: "flex" },
  icon: { marginRight: theme.spacing(2) },
}));

export default CardBody;
