import React from 'react';
import { ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { EntryIcon } from '.';
import { Link } from 'react-router-dom';

const Services = ({ classes, services, taskId }) => {
  const { iconType, primary, secondary, message } = services;
  return (
    <div className={clsx(classes.col, classes.colService)}>
      <div className={clsx(classes.row, classes.mb2)}>
        <ListItemAvatar className={classes.icon}>
          <EntryIcon type={iconType} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.mb1} variant="h2">
              {primary}
            </Typography>
          }
          secondary={
            <Typography color="textSecondary" variant="h4">
              {secondary}
            </Typography>
          }
        />
      </div>
      {message && (
        <div className={classes.row}>
          <Typography className={classes.errorMessage} variant="body1">
            {message}&ensp;
            <Link className={classes.link} to={`/tasks/in-work/${taskId}`}>
              (перейти к задаче)
            </Link>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Services;
