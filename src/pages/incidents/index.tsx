import { RouteChildrenProps } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { useEffect } from "react";
import { modelEvent, EventRow, EventList } from "entities/event";

import { EventFilter } from "widgets/event-filter";

import { Loader, Placeholder } from "shared/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { modelEventFilter } from "features/event-filters";
import { useStore } from "effector-react";

type Props = RouteChildrenProps<{}> & {};

const View = ({}: Props) => {
  const { t } = useTranslation();
  const { incidentEffects, incidentSelectors, incidentEvents, querySelectors } =
    modelEvent;
  const incidents = incidentSelectors.useIncidentsList();
  // const isLoading = incidentSelectors.useIncidentListLoading();
  const isEmpty = incidentSelectors.useIncidentListIsEmpty();
  const queryConfig = querySelectors.useQuery();
  const lastId = incidentSelectors.useLastIncidentId();

  const classes = useStyles();
  const isLoading = useStore(incidentEffects.getIncidentsWithFilterFx.pending);
  const loader = isLoading && isEmpty && <Loader />;

  return (
    <section className={classes.incidents}>
      <div className={classes.content}>
        {loader ? (
          loader
        ) : isEmpty ? (
          <Placeholder placeholder={t(`incident:noList`)} />
        ) : (
          <EventList
            callback={() => {
              // const timeout = setTimeout(async () => {
              //   incidentEffects.getIncidentsWithFilterFx();
              //   clearTimeout(timeout);
              // }, 10000);
            }}
          >
            {incidents.map((incident) => {
              return (
                <EventRow
                  key={incident.id}
                  data={incident}
                  variant="incident"
                />
              );
            })}
          </EventList>
        )}
      </div>
      <div className={classes.filter}>
        <EventFilter />
      </div>
    </section>
  );
};
const IncidentsPage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    incidents: {
      position: "relative",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      width: 1224,
      margin: `0 auto`,
    },
    content: {
      marginRight: 360 + theme.spacing(2),
      margin: theme.spacing(6),
      marginLeft: 0,
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
      borderRadius: theme.spacing(2),
      overflow: "hidden",
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
    },
    tabs: { margin: theme.spacing(0) },
    filter: {
      position: "absolute",
      top: theme.spacing(6),
      bottom: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      width: 360,
      right: 0,
    },
  })
);

export default IncidentsPage;
