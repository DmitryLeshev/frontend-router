import React from 'react';
import { ListItemText, Typography } from '@material-ui/core';
import Edit from '../../Edit/Edit';
import clsx from 'clsx';
import { useCustomModal } from '../../../assets/hooks';
import EditChecks from './EditChecks';
import EntryModal from './EntryModal';
import { Link } from 'react-router-dom';

const Checks = ({ classes, checks, el, refreshData }) => {
  const { next, last, settings } = checks;
  const { showModal, closeModal, openModal } = useCustomModal();

  const modalProps = {
    showModal,
    closeModal,
  };

  const editModalProps = {
    closeModal,
    refreshData,
    el,
  };

  return (
    <div className={clsx(classes.col, classes.colChecks)}>
      <div className={clsx(classes.row, classes.mb2)}>
        <div className={classes.col}>
          <ListItemText
            primary={
              <Typography className={classes.mb1} variant="h5">
                {last.primary}
              </Typography>
            }
            secondary={
              <Typography variant="body1">
                {last.secondary || <span className={classes.mdash}>&mdash;</span>}
              </Typography>
            }
          />
        </div>
        <div className={classes.col}>
          <ListItemText
            primary={
              <Typography className={classes.mb1} variant="h5">
                {next.primary}
              </Typography>
            }
            secondary={
              <Typography variant="body1">
                {next.secondary || <span className={classes.mdash}>&mdash;</span>}
              </Typography>
            }
          />
        </div>
      </div>
      {settings.map((setting, idx) => {
        const { name, value, action } = setting;
        if (!value) return null;
        return (
          <div key={idx} className={clsx(classes.row, classes.mb1)}>
            <Typography className={classes.rel} variant="body1">
              {action ? (
                <Edit
                  handleEdit={openModal}
                  styles={{
                    right: 0,
                    top: 0,
                    transform: 'translate(140%, -30%)',
                  }}
                />
              ) : null}
              {name}
              <Typography
                onClick={!setting.url ? openModal : null}
                className={clsx(classes.link, classes.blue)}
                component={setting.url ? Link : 'span'}
                to={setting.url && setting.url(el.settingId)}>
                {value}
              </Typography>
            </Typography>
          </div>
        );
      })}
      <EntryModal {...modalProps}>
        <EditChecks {...editModalProps} />
      </EntryModal>
    </div>
  );
};

export default Checks;
