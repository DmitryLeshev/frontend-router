import React from 'react';

import { makeStyles } from '@material-ui/core';

const Color = (props: any) => {
  const classes = useStyles(props);
  return <span className={classes.color}>{props.children}</span>;
};

const useStyles = makeStyles((theme) => ({
  color: ({ styles, color }: any) => ({
    color: color || theme.palette.error.light,
    ...styles,
  }),
}));

export default Color;
