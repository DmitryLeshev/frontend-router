import { createStyles, makeStyles } from "@material-ui/core";
import type { PropsWithChildren } from "react";

import { ToggleRouter } from "features/router-toggle";

import { Router } from "shared/api";

import { Card } from "shared/components";
import { Typography } from "shared/ui/components";

import { ITheme } from "shared/ui/theme/theme";
import { NewDesignWifiOff, NewDesignWifiOn } from "shared/assets/icons";
import { useTranslation } from "react-i18next";

type RouterIconProps = Pick<Router, "enabled">;

function RouterIcon({ enabled }: RouterIconProps) {
  const classes = useStyles();
  return enabled ? (
    <NewDesignWifiOn className={classes.icon} />
  ) : (
    <NewDesignWifiOff className={classes.icon} />
  );
}

type RouterNameProps = Pick<Router, "name">;

function RouterName({ name }: RouterNameProps) {
  return <Typography variant="h5">{name}</Typography>;
}

type RouterInfoProps = Pick<Router, "channel" | "range">;

function RouterInfo({ range, channel }: RouterInfoProps) {
  return (
    <Typography variant="body2" color="textSecondary">
      {range}ГГц, Канал {channel}
    </Typography>
  );
}

function RouterRow({ range, channel, name, enabled }: Router) {
  const classes = useStyles();
  return (
    <li className={classes.router}>
      <RouterIcon enabled={enabled} />
      <div className={classes.info}>
        <RouterName name={name} />
        <RouterInfo range={range} channel={channel} />
      </div>
      <ToggleRouter className={classes.btn} range={range} />
    </li>
  );
}

export type RouterCardProps = PropsWithChildren<{
  data: Router[];
}>;

export const RouterCard = ({ data }: RouterCardProps) => {
  const { t } = useTranslation();
  const header = (
    <Typography variant="h5">{t("home:network.home-network")}</Typography>
  );
  return (
    <Card
      header={header}
      body={data.map((router, idx) => (
        <RouterRow key={idx} {...router} />
      ))}
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    routers: { flexGrow: 1 },
    router: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2),
      "&:last-child": { marginBottom: 0 },
    },
    info: {},
    icon: { marginRight: theme.spacing(2), width: 64, height: 64 },
    btn: { marginLeft: "auto" },
  })
);
