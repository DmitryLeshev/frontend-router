import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { Typography } from "shared/ui/components";
import { DeviceIcon } from "shared/components";
import { Link } from "react-router-dom";

export type DeviceTypeProps = {
  entityType: number;
};

export function EventDeviceType({ entityType }: DeviceTypeProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography className={classes.device} variant="body1">
      {t(`task:item.device`)}
    </Typography>
  );
}

export type DeviceNameProps = {
  name: string;
};

export function EventDeviceName({ name }: DeviceNameProps) {
  const classes = useStyles();
  return (
    <Typography className={classes.name} variant="caption">
      {name}
    </Typography>
  );
}

export type DeviceIconProps = {
  type: number;
};

export function EventDeviceIcon({ type }: DeviceIconProps) {
  const classes = useStyles();
  return <DeviceIcon className={classes.icon} type={type} />;
}

export type DeviceLinkProps = {
  icon: React.ReactElement;
  name: React.ReactElement;
  url: string;
};

export function EventDeviceLink({ icon, name, url }: DeviceLinkProps) {
  const classes = useStyles();

  return (
    <object>
      <Link className={classes.link} to={url}>
        <span className={classes.link_icon}>{icon}</span>
        <span className={classes.link_name}>{name}</span>
      </Link>
    </object>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    device: { width: 100, fontWeight: 300 },
    icon: {},
    name: { fontWeight: 300 },
    link: {
      position: "relative",
      display: "flex",
      alignItems: "center",

      marginLeft: theme.spacing(3),
      textDecoration: "none",
      color: theme.palette.getContrastText(theme.palette.background.paper),
      // overflow: "hidden",

      transition: "0.3s all",

      "&::after": {
        content: "''",
        position: "absolute",
        bottom: -4,
        width: "100%",
        height: "1px",
        background: theme.palette.primary.main,
        transform: "translate(-100%, 0)",
        transition: "0.3s all ease-out",
        opacity: 0,
      },
      "&::before": {
        content: "''",
        position: "absolute",
        bottom: -4,
        width: "100%",
        height: "1px",
        background: theme.palette.secondary.main,
        transform: "translate(100%, 0)",
        transition: "0.3s all",
        opacity: 0,
      },
      "&:hover::after, &:hover::before": {
        transform: "translate(0, 0)",
        opacity: 1,
      },
    },
    link_icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(0, 1, 0, 0),
    },
    link_name: { display: "inline-block", minWidth: 80 },
  })
);
