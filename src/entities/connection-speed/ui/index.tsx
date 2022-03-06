import { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Card } from "shared/components";
import { IconButton, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { NewDesignConnectionSpeed } from "shared/assets/icons";
import { modelConnectionSpeed } from "entities/connection-speed";

type ConnectionSpeedBlockProps = {
  primary: React.ReactElement | string;
  secondary: React.ReactElement | string;
};

function ConnectionSpeedBlock({
  primary,
  secondary,
}: ConnectionSpeedBlockProps) {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Typography variant="body1">{primary}</Typography>
      <Typography variant="h6" align="center">
        {secondary}
      </Typography>
    </div>
  );
}

export type ConnectionSpeedCardProps = {};

export function ConnectionSpeedCard({}: ConnectionSpeedCardProps): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();

  const speed = modelConnectionSpeed.selectors.useSpeed();
  const isTesting = modelConnectionSpeed.selectors.useIsTesting();

  useEffect(() => {
    modelConnectionSpeed.actions.getSpeed();
  }, []);

  const header = (
    <>
      <Typography className={classes.full} variant="h5">
        {t("home:network.speed")}
      </Typography>
      {isTesting && <CircularProgress size={24} />}
    </>
  );
  return (
    <Card
      header={header}
      body={
        <div className={classes.connection}>
          <ConnectionSpeedBlock
            primary={
              <>
                PING <span className={classes.speed_dedicated}>MS</span>
              </>
            }
            secondary={String(speed.ping)}
          />
          <span className={classes.oval} />
          <ConnectionSpeedBlock
            primary={
              <>
                Прием <span className={classes.speed_dedicated}>MBPS</span>
              </>
            }
            secondary={String(speed.download)}
          />
          <span className={clsx(classes.oval, classes.oval_secondary)} />
          <ConnectionSpeedBlock
            primary={
              <>
                Передача <span className={classes.speed_dedicated}>MBPS</span>
              </>
            }
            secondary={String(speed.upload)}
          />
          <IconButton
            className={classes.btn}
            onClick={() => modelConnectionSpeed.actions.runSpeedTestStart()}
          >
            <NewDesignConnectionSpeed />
          </IconButton>
        </div>
      }
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    connection: { display: "flex", alignItems: "center" },
    block: {},
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginRight: theme.spacing(3),
    },
    oval: {
      width: theme.spacing(1),
      height: theme.spacing(1),
      margin: theme.spacing(0, 3),
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
    },
    oval_secondary: { backgroundColor: theme.palette.secondary.main },
    speed_dedicated: { color: "#8B8AD1" },
    btn: { marginLeft: "auto" },
    full: { width: "100%" },
  })
);
