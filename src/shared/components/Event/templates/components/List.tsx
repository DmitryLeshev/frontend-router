import React from 'react';

import { makeStyles } from '@material-ui/core';

const List = (props: any) => {
  const classes = useStyles(props);
  const children = props.children;
  return (
    <ul className={classes.section}>
      {children && !children.length
        ? React.cloneElement(props.children, { dots: props.dots })
        : children.map((child: any, idx: any) =>
            React.cloneElement(child, { key: idx, dots: props.dots }),
          )}
    </ul>
  );
};

const useStyles = makeStyles((theme) => ({
  section: ({ styles, dots }: any) => ({
    listStyle: dots ? 'auto' : 'none',
    marginBottom: theme.spacing(3),
    ...styles,
  }),
}));

export default List;
