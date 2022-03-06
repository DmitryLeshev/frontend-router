import React from 'react';

import { Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';
import { useCustomSnackbar } from '../../../../../assets/hooks';

export default ({ api, children, data, fetchTask }) => {
  const { taskId: id } = useParams();
  const { enqueueSnackbar } = useCustomSnackbar();
  const classes = useStyles();

  const setDecision = api.incident.buttons.setDecision;
  const { arpcage } = data.body;

  async function toBegin() {
    const res = await setDecision({
      id: Number(id),
      action: 'arpCargeStart',
      params: { incedId: Number(id) },
    });
    enqueueSnackbar(res, 'tasks');
    fetchTask();
  }

  async function stop() {
    const res = await setDecision({
      id: Number(id),
      action: 'arpCargeStop',
      params: { incedId: Number(id) },
    });
    enqueueSnackbar(res, 'tasks');
    fetchTask();
  }

  return (
    <>
      {children}
      <div className={classes.actions}>
        {arpcage ? (
          <Button variant="outlined" onClick={stop}>
            Остановить
          </Button>
        ) : (
          <Button variant="outlined" onClick={toBegin}>
            Начать
          </Button>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
  },
  btn_fisrt: { marginRight: theme.spacing(2) },
}));
