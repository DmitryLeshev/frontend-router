import React from 'react';

import { makeStyles } from '@material-ui/core';

const Title = (props: any) => {
  const classes = useStyles(props);
  return <h6 className={classes.title}>{props.children}</h6>;
};

const useStyles = makeStyles((theme) => ({
  title: ({ styles }: any) => ({
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    margin: 0,
    ...styles,
  }),
}));

export default Title;
