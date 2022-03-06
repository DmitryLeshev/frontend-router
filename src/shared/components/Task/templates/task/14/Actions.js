import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, makeStyles } from '@material-ui/core';

import api from '../../../api';
// import { useCustomSnackbar } from '../../../../../assets/hooks';

export default ({ data, closeTask }) => {
  const { status, id } = data;
  const classes = useStyles();
  // const { enqueueSnackbar } = useCustomSnackbar();
  const { t } = useTranslation();

  const handlerButton = async (name, params = []) => {
    const res = await api.task.button.setDecision({ id, action: name, params });
    // enqueueSnackbar(res, 'tasks');
    closeTask();
  };

  const isWindows = String(data?.titleVars?.softName).startsWith('Windows');

  return (
    status <= 2 && (
      <>
        <Button
          className={classes.action}
          variant="outlined"
          color="secondary"
          onClick={() => handlerButton('updateSoft')}>
          {t(`task_actions.updateSoft`)}
        </Button>
        {!isWindows && (
          <Button
            className={classes.action}
            variant="outlined"
            color="secondary"
            onClick={() => handlerButton('updateSoft')}>
            {t(`task_actions.deleteSoft`)}
          </Button>
        )}
      </>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  action: { margin: theme.spacing(0, 2, 2, 0) },
}));
