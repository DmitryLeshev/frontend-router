import React from "react";
import { useTranslation } from "react-i18next";

import { makeStyles, IconButton, Typography, Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { FlashOnIcon, IconRadiation } from "shared/assets/icons";

import { Templates } from "../Event";

export interface IEventHeader {
  isFullScreen: boolean;
  isIncident: boolean;
  closeTask?: () => void;
  id: number;
  titleVars: any;
  type: Templates;
}

const HeaderCard = ({
  isFullScreen,
  isIncident,
  closeTask,
  id,
  titleVars,
  type,
}: IEventHeader) => {
  const { t } = useTranslation();

  let variables: any = {};
  titleVars &&
    Object.keys(titleVars).forEach((key) => {
      variables[key] = titleVars[key];
    });
  const taskName: any = t(
    `${isIncident ? "incident" : "vulnerabilities"}:${type}.title`,
    variables
  );

  const classes = useStyles({ isFullScreen });
  return (
    <div className={classes.header}>
      {isFullScreen && (
        <IconButton
          className={classes.buttonBack}
          aria-label="back"
          onClick={closeTask}
        >
          <ArrowBackIcon className={classes.buttonBackIcon} fontSize="large" />
        </IconButton>
      )}
      <Avatar className={classes.icon} aria-label="back">
        {isIncident ? <FlashOnIcon /> : <IconRadiation />}
      </Avatar>
      <Typography className={classes.detailsTitle} variant={"h5"}>
        {taskName ? taskName : "Нет имени"}
      </Typography>

      <Typography className={classes.id} variant="h6">
        #{id ? id : "007"}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: ({ isFullScreen }: any) => ({
    display: "flex",
    alignItems: "center",
    minHeight: 50,
    width: "100%",
    padding: theme.spacing(2),
  }),
  icon: { marginRight: theme.spacing(2) },
  iconSvg: {
    flexGrow: 1,
  },
  buttonBack: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(3),
  },
  buttonBackIcon: {},
  detailsTitle: () => ({
    ...theme.typography.h5,
    display: "flex",
    marginRight: theme.spacing(3),
  }),
  detailsTitleIcon: {
    marginRight: theme.spacing(2),
  },
  id: {
    ...theme.typography.h6,
    marginLeft: "auto",
  },
}));

export default HeaderCard;
