import React, { useContext } from 'react';
import { __RouterContext } from 'react-router';

import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { NavigationList } from './components';

const useRouter = () => useContext(__RouterContext);
const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: theme.spacing(0.2),
  },
}));

const Navigation = (props: any) => {
  const { pages, component: Component, taskCounter } = props;
  const router = useRouter();
  const classes = useStyles();

  return (
    <Component className={clsx(classes.root)}>
      <NavigationList depth={0} pages={pages} router={router} taskCounter={taskCounter} />
    </Component>
  );
};

export default Navigation;
