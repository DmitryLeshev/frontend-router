import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import { CardHeader, CardBody } from "./components";

import dependencies from "./dependencies";
import props from "./props";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { transformDate } from "shared/utils/transformDate";

const { DeviceIcon } = dependencies.icon;

const CardList = ({
  task,
  openTask,
  className,
}: {
  task: any;
  openTask: any;
  className?: string;
}) => {
  const { t } = useTranslation();
  const tBase = `task:item`;

  const taskСriticality = t(`${tBase}.taskСriticality`);
  const device = t(`${tBase}.device`);

  const color = task.crt <= 3 ? "success" : task.crt <= 6 ? "warning" : "error";
  const classes = useStyles({ color });

  const { url } = useRouteMatch();
  const isIncident = url.includes("incidents");

  const handlerClick = (e: any) => {
    if (e.target.nodeName === "A") return;
    openTask(task.id);
  };

  const headerProps = props.header({ data: task });

  return (
    <div className={clsx(classes.root, className)} onClick={handlerClick}>
      <CardHeader {...headerProps} />
      <CardBody>
        <ul className={classes.list}>
          {!isIncident && (
            <li className={classes.item}>
              <p className={classes.itemKey}>{taskСriticality}</p>
              <p className={classes.value}>
                <span className={classes.itemValue}>{task.crt}</span>
                &nbsp;/ 10
              </p>
            </li>
          )}
          <li className={classes.item}>
            <p className={classes.itemKey}>{device}</p>
            <Link
              className={classes.value}
              to={`/devices/local/${task.deviceInfo.entityId}/info`}
            >
              <DeviceIcon
                className={classes.icon}
                type={
                  task.deviceInfo.entityId !== 0
                    ? task.deviceInfo.entityType
                    : 4
                }
              />
              {task.deviceInfo.entityId !== 0 ? task.deviceInfo.name : "Router"}
            </Link>
          </li>
          <li className={classes.item}>
            <p className={classes.itemKey}>Время создания</p>
            <p className={classes.value}>
              {transformDate(task.createTst, "hh:mm DD.MM.YYYY")}
            </p>
          </li>
        </ul>
      </CardBody>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 3, 2),
    minHeight: "100px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    cursor: "pointer",
    transition: "all 0.3s ease-out",
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
    "&:last-child": {
      marginBootm: theme.spacing(0),
    },
    "&:first-child": {
      marginTop: theme.spacing(1.5),
    },
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.3, 0),
  },
  itemKey: {
    ...theme.typography.body1,
    margin: 0,
    display: "block",
    minWidth: 160,
  },
  itemValue: ({ color }: { color: "success" | "warning" | "error" }) => ({
    ...theme.typography.body1,
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette[color].light,
  }),
  icon: {
    width: 15,
    marginRight: theme.spacing(1),
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    transition: "all 0.3s",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  priority: { marginLeft: theme.spacing(2) },
  key: { display: "block", minWidth: 300, margin: 0 },
  value: {
    display: "flex",
    alignItems: "center",
    margin: 0,
    color: theme.palette.text.primary,
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default CardList;
