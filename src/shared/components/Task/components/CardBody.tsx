import React from 'react';
import { makeStyles } from '@material-ui/core';

const CardBody = ({ windowCard, children }: any) => {
  const classes = useStyles({ windowCard });

  if (!windowCard) {
    return <div className={classes.body}>{children}</div>;
  }

  return <div className={classes.body}>{children}</div>;
};

const useStyles = makeStyles((theme) => ({
  body: ({ windowCard }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: windowCard ? theme.spacing(4, 4, 0, 4) : theme.spacing(0, 3),
    margin: windowCard ? theme.spacing(0, 0, 1) : 0,
  }),
  scrollbarStyles: {
    flexGrow: 1,
  },
}));

export default CardBody;
