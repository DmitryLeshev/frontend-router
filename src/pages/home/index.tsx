import { useEffect } from "react";
import { reflect } from "@effector/reflect";

import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { TrafficCard, modelTraffc } from "entities/traffic";
import { TopEventsCard } from "entities/event";
import { RouterCard, modelRouter } from "entities/router";
import { ConnectionSpeedCard } from "entities/connection-speed";
import {
  PortsCard,
  modelNetworkPort,
  NetworkDeviceCard,
} from "entities/local-network";
import { Loader } from "shared/components";
import clsx from "clsx";

type Props = {};

const View = ({}: Props) => {
  const classes = useStyles();
  const traffic = modelTraffc.selectors.useTraffic();
  const routers = modelRouter.selectors.useRouters();
  const info = modelNetworkPort.selectors.useInfo();
  useEffect(() => {
    modelTraffc.effects.getTrafficFx();
    modelRouter.effects.getRouterInfoFx();
    modelNetworkPort.effects.getMainInfoFx();
  }, []);

  if (!traffic || !routers.length || !info) return <Loader />;

  return (
    <section className={classes.home}>
      <div className={classes.row}>
        <TrafficCard data={traffic} />
        <div className={classes.wrapper}>
          <RouterCard data={routers} />
          <ConnectionSpeedCard />
        </div>
      </div>
      <div className={classes.row}>
        <div className={clsx(classes.wrapper, classes.wrapper_32)}>
          <PortsCard data={info} />
          <NetworkDeviceCard data={info} />
        </div>
        <div className={clsx(classes.wrapper, classes.wrapper_32)}>
          <TopEventsCard events={info.incidents} isIncident />
        </div>
        <div className={clsx(classes.wrapper, classes.wrapper_32)}>
          <TopEventsCard events={info.tasks} isIncident={false} />
        </div>
      </div>
    </section>
  );
};

const HomePage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    home: {
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(3),
      width: 1224,
      margin: `${theme.spacing(6)}px auto`,
    },
    row: { display: "flex", gap: theme.spacing(3), width: "100%" },
    wrapper: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
      minWidth: "50%",
    },
    wrapper_32: { minWidth: "32%" },
  })
);
export default HomePage;
