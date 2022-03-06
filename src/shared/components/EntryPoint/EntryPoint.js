import React from 'react';
import { ListItem, makeStyles } from '@material-ui/core';
import { Logins, Checks, Services, Status } from './components';

const EntryPoint = (props) => {
  const { services, logins, checks, status, refreshData, el } = props;
  const { id, logins: loginsString } = el;
  const classes = useStyles();

  const servicesProps = {
    classes,
    services,
    taskId: el.taskId,
    status: el.status,
  };

  const loginsProps = {
    classes,
    logins,
    apID: id,
    loginsString,
    refreshData,
  };

  const checksProps = {
    classes,
    checks,
    id,
    refreshData,
    el,
  };

  const statusProps = {
    classes,
    status,
    id,
    refreshData,
  };

  return (
    <ListItem className={classes.item}>
      <Services {...servicesProps} />
      <Logins {...loginsProps} />
      <Checks {...checksProps} />
      <Status {...statusProps} />
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  w100: {
    minWidth: 100,
    maxWidth: 100,
  },
  w150: {
    minWidth: 150,
    maxWidth: 150,
  },
  w200: {
    minWidth: 200,
    maxWidth: 200,
  },
  w300: {
    minWidth: 300,
    maxWidth: 300,
  },
  span: {
    margin: 0,
  },
  mb1: {
    marginBottom: theme.spacing(1),

    '&:last-child': {
      marginBottom: 0,
    },
  },
  mb2: {
    marginBottom: theme.spacing(2),

    '&:last-child': {
      marginBottom: 0,
    },
  },
  mdash: {
    display: 'flex',
    width: '100%',
    // alignItems: "center"
    textAlign: 'center',
    justifyContent: 'center',
  },
  rel: {
    position: 'relative',
  },
  col: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(3),

    '&:first-child': {
      marginLeft: theme.spacing(0),
    },

    '&:first-last': {
      marginRight: theme.spacing(0),
    },
  },
  colService: {
    minWidth: '310px',
  },
  colLogins: {
    minWidth: '150px',
  },
  colStatus: {
    minWidth: '310px',
  },
  colChecks: {
    minWidth: '310px',
  },
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1.5, 3),
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    alignItems: 'flex-start',
    minHeight: 150,

    '&:first-child': {
      marginTop: theme.spacing(0),
    },

    '&:last-child': {
      marginBottom: theme.spacing(0),
    },
  },
  icon: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(3),
  },
  errorMessage: {
    color: theme.palette.error.light,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.3s',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  blue: {
    color: theme.palette.secondary.light,
  },
  statusLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `all 1s`,

    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.grey[700],
    },
  },
  logins: {
    lineHeight: '18px',
  },
}));

export default EntryPoint;
