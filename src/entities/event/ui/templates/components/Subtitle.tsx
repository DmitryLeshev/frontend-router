import React from 'react';

import { makeStyles } from '@material-ui/core';

const Subtitle = (props: any) => {
  const classes = useStyles(props);
  return <h6 className={classes.subtitle}>{props.children}</h6>;
};

const useStyles = makeStyles((theme) => ({
  subtitle: ({ styles }: any) => ({
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
    marginBottom: theme.spacing(2),
    ...styles,
  }),
}));

export default Subtitle;
