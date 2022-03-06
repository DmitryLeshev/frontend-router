import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  makeStyles,
  Avatar,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import imgAvatar1 from "shared/assets/png/img_avatar.png";

import dependencies from "../dependencies";
import { Tooltip } from "../..";
import { useTranslation } from "react-i18next";

const { transformDate, hh_mm_DD_MM_YYYY } = dependencies.date;

const FooterCard = ({
  windowCard,
  responsible,
  createTst,
  status,
  isIncident,
}: any) => {
  const { t } = useTranslation();
  const tBase = `task:item`;
  const tResponsible = t(`${tBase}.responsible`);
  const tNoResponsible = t(`${tBase}.noResponsible`);
  const tInWorkIS = t(`${tBase}.inWorkIS`);
  const tInWorkIT = t(`${tBase}.inWorkIT`);
  const tDiscovered = t(`${tBase}.discovered`);
  const tOpen = t(`${tBase}.open`);
  const tClose = t(`${tBase}.close`);

  const classes = useStyles({ windowCard });
  const params: any = useParams();

  const renderDate = transformDate(createTst, hh_mm_DD_MM_YYYY);

  const responsibleValue = (el: any) => {
    return el.firstname && el.lastname
      ? `${el.firstname} ${el.lastname}`
      : el.login;
  };

  return (
    <div className={classes.footer}>
      <Typography className={classes.responsible}>{tResponsible}:</Typography>
      <List className={classes.list}>
        {responsible && responsible.length ? (
          responsible.map((el: any, idx: any) => (
            <ListItem key={idx} className={classes.item}>
              <Avatar
                className={classes.ava}
                src={`data:image/png;base64, ${el.avatar}` || imgAvatar1}
              />
              <Typography
                className={classes.link}
                component={RouterLink}
                to={`/users/${el.userId}/information`}
              >
                <Tooltip maxLength={25} word={responsibleValue(el)} />
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography className={classes.link} variant="body1">
            {tNoResponsible}
          </Typography>
        )}
      </List>
      <Typography className={classes.info} variant="body2">
        {tDiscovered}: {renderDate}
      </Typography>
      {!windowCard && params.status === "in-work" ? (
        <Typography
          className={classes.inwork}
          color="secondary"
          variant="caption"
        >
          {status <= 2 ? tInWorkIS : tInWorkIT}
        </Typography>
      ) : !windowCard && isIncident ? (
        <Typography
          className={classes.inwork}
          color="secondary"
          variant="caption"
        >
          {status === 1 ? tOpen : tClose}
        </Typography>
      ) : null}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: ({ windowCard }: any) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: windowCard ? "30px" : "auto",
    padding: windowCard ? theme.spacing(3) : theme.spacing(0, 3, 2),
    borderTop: windowCard && `1px solid ${theme.palette.divider}`,
  }),
  responsible: ({ windowCard }: any) => ({
    minWidth: windowCard ? 100 : 150,
  }),
  list: {
    display: "flex",
    marginLeft: theme.spacing(2),
    padding: 0,
  },
  item: {
    margin: 0,
    padding: 0,
    width: "auto",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  ava: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1),
  },
  info: {
    marginLeft: "auto",
    color: theme.palette.text.secondary,
  },
  link: {
    ...theme.typography.body2,
    marginRight: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  inwork: {
    position: "absolute",
    top: -20,
    right: theme.spacing(3),
  },
}));

export default FooterCard;
