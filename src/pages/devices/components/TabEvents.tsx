import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Loader, Placeholder } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

import { modelDevices } from "entities/device";
import { EventList, EventRow } from "entities/event";

import { useGetParameter } from "shared/hooks";

// import api from "shared/api.old";

interface ITask {
  id: number;
  crt: number;
  type: number;
  class: number;
  tst: number;
  status: string;
  titleVars: string[];
}

interface Props {
  route: any;
  className: string;
}

export default memo(function TabEvents({ className }: Props) {
  const { t } = useTranslation();
  const tab = useGetParameter("tab");
  const isIncident = tab === "incidents";
  const device = modelDevices.selectors.useDevice();
  const events = isIncident ? device.incidents : device.tasks;
  const isLoading = isIncident
    ? modelDevices.selectors.useIncidentsLoading()
    : modelDevices.selectors.useTasksLoading();

  console.log({ isIncident, isLoading, events, device });

  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      {isLoading && !events?.length ? (
        <Loader />
      ) : !events?.length ? (
        <Placeholder
          placeholder={
            isIncident
              ? t("devices:incident-placeholder")
              : t("devices:tasks-placeholder")
          }
          animation
        />
      ) : (
        <div className={classes.wrapper}>
          <EventList>
            {events.map((event: any) => {
              return (
                <EventRow
                  key={event.id}
                  data={event}
                  variant={isIncident ? "incident" : "task"}
                />
              );
            })}
          </EventList>
        </div>
      )}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      margin: theme.spacing(0, 2),
      boxShadow: theme.shadows[3],
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
      overflow: "hidden",
    },
    // Кастылище)
    wrapper: {
      position: "absolute",
      height: "100%",
      width: "100%",
    },
    icon: { marginLeft: "auto" },
    btn: { marginRight: theme.spacing(2), "&:last-child": { marginRight: 0 } },
    body: { padding: 0 },
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      transition: "0.3s",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:active": {
        backgroundColor: theme.palette.action.focus,
      },
    },
    link: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
    "@media all and (max-width: 1200px)": {
      container: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  })
);
