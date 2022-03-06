import React from 'react';

import { Typography, makeStyles } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';

const useStyles = makeStyles((theme) => ({
  contentsTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  brushIcon: {
    width: 80,
    height: 80,
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
  },
}));

const ContentsTitle = () => {
  const classes = useStyles();
  return (
    <div className={classes.contentsTitle}>
      <BrushIcon className={classes.brushIcon} />
      <Typography className={classes.title} variant="h4">
        Настройки внешнего вида
      </Typography>
    </div>
  );
};

export default ContentsTitle;
