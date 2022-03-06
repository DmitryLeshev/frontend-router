import React from 'react';

import { makeStyles } from '@material-ui/core';

const Text = (props: any) => {
  const classes = useStyles(props);
  return <p className={classes.text}>{props.children}</p>;
};

const useStyles = makeStyles((theme) => ({
  text: ({ styles }: any) => ({
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
    marginBottom: theme.spacing(2),
    ...styles,
  }),
}));

export default Text;
