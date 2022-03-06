import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Card } from "shared/components";
import { Badge, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { GetHomeInfoRES } from "shared/api";

const Circle = ({ v, even }: { v: number; even: boolean }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.shape, classes.shapeCircle, {
        [classes.shape_neonSecondary]: even,
        [classes.shape_neonPrimary]: !even,
      })}
    >
      <Typography variant="h6" className={classes.shapeValue}>
        {v}
      </Typography>
    </div>
  );
};

export type NetworkDeviceProps = {
  idx: number;
  count: number;
  new: number;
  name: string;
};

export function NetworkDevice({
  count,
  new: newItems,
  idx,
  name,
}: NetworkDeviceProps): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const even = idx % 2;
  return (
    <div className={classes.network_device}>
      <Badge color="secondary" overlap="circular" badgeContent={newItems}>
        <Circle v={count} even={!!even} />
      </Badge>
      <Typography className={classes.network_device__type}>
        {t(`home:network.${name}`)}
      </Typography>
    </div>
  );
}

export type NetworkDevicesProps = {
  data: GetHomeInfoRES;
};

export function NetworkDeviceCard({ data }: NetworkDevicesProps): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = (
    <Typography variant="h5">{t("home:network.devices-in-network")}</Typography>
  );
  return (
    <Card
      header={header}
      bodyProps={{ className: classes.network_devices }}
      body={Object.entries(data?.localNetwork?.devices ?? []).map(
        ([name, value], idx) => {
          return <NetworkDevice key={idx} name={name} idx={idx} {...value} />;
        }
      )}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    network_devices: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    network_device: {},
    network_device__type: {
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
    shape: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      width: 56,
      height: 56,
      backgroundColor: "#fff",
    },
    shape_neonPrimary: {
      border: `4px solid ${theme.palette.primary.main}`,
      borderRadius: `50%`,
      boxShadow: `
          0 0 5px ${theme.palette.primary.main},
          0 0 25px ${theme.palette.primary.main}
        `,
    },
    shape_neonSecondary: {
      border: `4px solid ${theme.palette.secondary.main}`,
      borderRadius: `50%`,
      boxShadow: `
          0 0 5px ${theme.palette.secondary.main},
          0 0 25px ${theme.palette.secondary.main}
        `,
    },
    shapeCircle: { borderRadius: "50%" },
    shapeValue: { color: theme.palette.getContrastText("#fff") },
  })
);
