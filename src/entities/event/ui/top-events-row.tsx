import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core";

import { libEvent } from "entities/event";

import { TopEvent } from "shared/api";
import { NewDesignAlertInfo, NewDesignShieldFail } from "shared/assets/icons";
import { Divider, Typography } from "shared/ui/components";
import { EventIcon } from "./icon";

export type Props = TopEvent & {
  isIncident: boolean;
  isLastEvent: boolean;
};

export function TopEventRow({
  id,
  type,
  createTst,
  isIncident,
  isLastEvent,
}: Props): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <li className={classes.item}>
      <Link
        className={classes.link}
        to={`/home?popup=event&type=${
          isIncident ? "incident" : "task"
        }&id=${id}`}
      >
        <span className={classes.iconWrapper}>
          <EventIcon
            className={classes.iconTasks}
            fill={
              isIncident
                ? theme.palette.text.primary
                : theme.palette.secondary.main
            }
            variant={isIncident ? "incident" : "task"}
          />
          {/* {isIncident ? (
            <NewDesignShieldFail
              className={classes.iconTasks}
              size={24}
              fill={theme.palette.secondary.main}
            />
          ) : (
            <NewDesignAlertInfo
              className={classes.iconTasks}
              size={24}
              fill={theme.palette.text.primary}
            />
          )} */}
        </span>
        <Typography className={classes.textPrimary}>
          {t(`${isIncident ? `incident` : "task"}:list.${type}.title`)}
          <Typography
            className={classes.textSecondary}
            color="textSecondary"
            variant="caption"
            component="span"
          >
            {libEvent.getFormattedCreationTime(createTst)}
          </Typography>
        </Typography>
      </Link>
      {!isLastEvent && <Divider />}
    </li>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.spacing(2, 3),
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  item: {
    flexGrow: 1,
    transition: "0.3s",
    cursor: "pointer",
    padding: theme.spacing(0),
    margin: 0,

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:active": {
      backgroundColor: theme.palette.action.focus,
    },
  },
  icon: {
    marginRight: theme.spacing(2.5),
    padding: theme.spacing(1),
    width: 40,
    height: 40,
    backgroundColor: theme.palette.error.light,
  },
  textSecondary: { display: "block" },
  textPrimary: { marginLeft: theme.spacing(2) },
  iconTasks: { marginRight: theme.spacing(2), width: 24, height: 24 },
  iconWrapper: { display: "block", width: 24, height: 24 },
}));
