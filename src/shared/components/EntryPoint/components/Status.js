import React from 'react';

import { ListItemText, Typography } from '@material-ui/core';
import clsx from 'clsx';

const Status = ({ classes, status, id, refreshData }) => {
  const { primary, secondary, action, btnLabel } = status;

  return (
    <div className={clsx(classes.col, classes.colStatus)}>
      <div className={clsx(classes.row, classes.mb1)}>
        <ListItemText
          primary={
            <Typography className={classes.mb1} variant="h4">
              {primary}
            </Typography>
          }
          secondary={<Typography variant="body1">{secondary}</Typography>}
        />
      </div>
      <div className={clsx(classes.row, classes.mb2)}>
        <p
          className={classes.statusLink}
          onClick={async () => {
            action({ id });
            refreshData();
          }}>
          {btnLabel}
        </p>
      </div>
    </div>
  );
};

export default Status;
