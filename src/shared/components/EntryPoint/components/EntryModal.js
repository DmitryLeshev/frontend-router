import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import React from 'react';

const EntryModal = ({ showModal = false, closeModal, children = null }) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={showModal}
      onClose={closeModal}
      disableAutoFocus
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      {children && <Fade in={showModal}>{children}</Fade>}
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default EntryModal;
