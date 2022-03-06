import React from 'react';

import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useCustomModal } from '../../../assets/hooks';

import EntryModal from './EntryModal';
import EditLogins from './EditLogins';
import Edit from '../../Edit/Edit';
import { Tooltip } from '../..';

const Logins = ({ classes, logins, apID, loginsString, refreshData }) => {
  // eslint-disable-next-line
  const { showModal, closeModal, openModal } = useCustomModal();
  const { primary, list, action, defaultLogins } = logins;

  const link = (
    <>
      и{' '}
      <span className={clsx(classes.link, classes.blue)} onClick={openModal}>
        {list.length - 4 === 1 ? 'ещё один' : `${list.length - 5} других`}
      </span>
    </>
  );

  const modalProps = {
    showModal,
    closeModal,
  };

  const editModalProps = {
    list,
    apID,
    loginsString,
    closeModal,
    refreshData,
    defaultLogins,
  };

  return (
    <div className={clsx(classes.col, classes.colLogins)}>
      {action && <Edit styles={{ top: -16, right: 0 }} handleEdit={openModal} />}
      <Typography variant="h3">{primary}:</Typography>
      <Typography className={classes.logins} variant="body1">
        {list?.length
          ? list.slice(0, 4).map((login, idx) =>
              login ? (
                <React.Fragment key={idx}>
                  <Tooltip word={login} maxLength={16} />
                  {/* {idx !== 4 && ","} */}
                  <br />
                </React.Fragment>
              ) : null,
            )
          : 'нет логинов'}
        <Typography className={classes.span} variant="body2" component="span">
          {list.length > 4 && link}
        </Typography>
      </Typography>
      <EntryModal {...modalProps}>
        <EditLogins {...editModalProps} />
      </EntryModal>
    </div>
  );
};

export default Logins;
