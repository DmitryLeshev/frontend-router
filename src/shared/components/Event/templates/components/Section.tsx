import React from 'react';

import { makeStyles } from '@material-ui/core';

const Section = (props: any) => {
  const classes = useStyles(props);
  return <section className={classes.section}>{props.children}</section>;
};

const useStyles = makeStyles((theme) => ({
  section: ({ styles }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    '&:last-child': {
      marginBottom: 0,
    },
    ...styles,
  }),
}));

export default Section;
