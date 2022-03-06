import React from 'react';
import query from '@assets/utils/query';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useCustomInput } from '../../../assets/hooks';

const EditLogins = React.forwardRef((props, ref) => {
  const { apID, loginsString, refreshData, closeModal, defaultLogins, list } = props;
  const classes = useStyles();
  const logins = useCustomInput(loginsString);

  return (
    <div className={classes.container} ref={ref}>
      {!defaultLogins ? (
        <>
          <Typography paragraph variant="h3">
            Введите логины
          </Typography>
          <TextField
            className={classes.input}
            variant="outlined"
            autoFocus
            fullWidth
            multiline
            rows={4}
            {...logins}
          />
          <Button
            className={classes.btn}
            onClick={() => {
              query('device/setLogins', {
                apID,
                logins: logins.value,
              })
                .then((res) => {
                  refreshData();
                  closeModal();
                })
                .catch((error) => {
                  closeModal();
                });
            }}
            variant="contained"
            color="primary">
            Сохранить
          </Button>
        </>
      ) : (
        list.map((login, idx) => (
          <Typography key={login + idx} variant="body1">
            {login}
          </Typography>
        ))
      )}
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  btn: {
    marginLeft: 'auto',
  },
}));

export default EditLogins;
