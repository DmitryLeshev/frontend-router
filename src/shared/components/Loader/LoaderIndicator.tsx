import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  spinner: {
    '& > div': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const LoaderIndicator = ({ backdrop, white }: any) => {
  const classes = useStyles();
  return (
    <div className="wrap">
      <div className={clsx('spinner', { [classes.spinner]: backdrop })}>
        <div className="rect1" style={{ background: white ? '#fff' : '#000' }}></div>
        <div className="rect2" style={{ background: white ? '#fff' : '#000' }}></div>
        <div className="rect3" style={{ background: white ? '#fff' : '#000' }}></div>
        <div className="rect4" style={{ background: white ? '#fff' : '#000' }}></div>
        <div className="rect5" style={{ background: white ? '#fff' : '#000' }}></div>
      </div>
    </div>
  );
};

export default LoaderIndicator;
