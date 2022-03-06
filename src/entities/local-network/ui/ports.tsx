import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";

import { Card } from "shared/components";
import { Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { LanguageIcon, PortOn } from "shared/assets/icons";
import clsx from "clsx";
import { GetHomeInfoRES } from "shared/api";

export type PortProps = {
  type: string;
  port: any;
  link: boolean;
};

export function Port({ type, port, link }: PortProps): ReactElement {
  const classes = useStyles();
  const isWan = type === "wan";
  return (
    <div className={clsx(classes.port)}>
      <div className={clsx(classes.cabelWrapper)}>
        <div className={clsx(classes.cabel, classes.cabel_dedicated)}>
          {port.port}
          <PortOn className={clsx(classes.off, { [classes.on]: link })} />
        </div>
        {isWan && (
          <div className={classes.iconWrapper}>
            <LanguageIcon className={classes.icon} />
          </div>
        )}
      </div>
      <div className={classes.info}>
        <Typography align="center">{isWan ? "WAN" : "LAN"}</Typography>
      </div>
    </div>
  );
}

export type PortsCardProps = {
  data: GetHomeInfoRES;
};

export function PortsCard({ data }: PortsCardProps): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = (
    <Typography variant="h5">{t("home:ports.network-ports")}</Typography>
  );
  return (
    <Card
      header={header}
      bodyProps={{ className: classes.ports }}
      body={data?.localNetwork?.ports.map((port, idx) => {
        // if (idx === 0) return null;
        console.log({ port });
        return <Port key={idx} {...port} />;
      })}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    ports: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "center",
    },
    port: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1),
    },
    port_dashed: {
      border: `dashed 2px ${theme.palette.grey[300]}`,
      borderRadius: 8,
    },
    cabelWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cabel: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 40,
      borderRadius: theme.spacing(1),
      border: `solid 1px ${theme.palette.divider}`,
    },
    cabel_dedicated: {
      border: `solid 1px ${theme.palette.primary.main}`,
      backgroundColor: `rgba(77, 171, 245, 0.4)`,
    },
    iconWrapper: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translate(-50%, 50%)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      width: 20,
      height: 20,
      color: theme.palette.grey[300],
      backgroundColor: theme.palette.background.paper,
    },
    icon: { width: 16, height: 16 },
    info: { marginTop: theme.spacing(1) },
    off: { fill: theme.palette.error.main, width: 30 },
    on: { fill: theme.palette.success.main, width: 30 },
  })
);
