import React from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const ListItem = (props: any) => {
  const classes = useStyles(props);
  return <li className={clsx(classes.item, props.className)}>{props.children}</li>;
};

const useStyles = makeStyles((theme) => ({
  item: ({ styles, dots }: any) => ({
    marginLeft: dots ? theme.spacing(3) : 0,
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
    ...styles,
  }),
}));

export default ListItem;
