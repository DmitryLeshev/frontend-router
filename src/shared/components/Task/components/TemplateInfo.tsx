import React from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import { buildINFO, configs } from '../config/templateInfo';
import { useRouteMatch } from 'react-router';

const TemplateInfo = ({ createTst, status, device, po, uri, dot, host, port }: any) => {
  const classes = useStyles();
  const { url, params }: any = useRouteMatch();
  const info: any = { createTst, status, device, po, uri, dot, host, port };

  const isIncident = !!url.split('/').find((el: string) => el === 'incident');
  const isInWork = params.status === 'in-work';

  return (
    <Grid container className={classes.info} spacing={2}>
      <Grid item xs={6}>
        {configs.left.map(
          ({ id, label, key }: any) =>
            info[key] && (
              <Grid
                key={id}
                className={classes.item}
                container
                alignItems="center"
                item
                xs={12}>
                {key !== 'status' && <Typography variant="h5">{label}</Typography>}
                {buildINFO({ classes, info, key, isIncident, isInWork })}
              </Grid>
            ),
        )}
      </Grid>
      <Grid item xs={6}>
        {configs.right.map(
          ({ id, label, key }: any) =>
            info[key] && (
              <Grid
                key={id}
                className={classes.item}
                container
                alignItems="center"
                item
                xs={12}>
                {key !== 'status' && <Typography variant="h5">{label}</Typography>}
                {buildINFO({ classes, info, key, isIncident, isInWork })}
              </Grid>
            ),
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  info: { marginBottom: theme.spacing(3), justifyContent: 'space-between' },
  device: {
    color: theme.palette.text.primary,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    textDecoration: 'none',
  },
  icon: {
    width: 16,
    height: 16,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
}));

export default TemplateInfo;
