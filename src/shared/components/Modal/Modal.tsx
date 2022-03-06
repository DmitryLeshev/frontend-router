import React from 'react';
import { Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
  showModal: any;
  closeModal: any;
  children: any;
  className?: any;
  styles?: any;
}

const CustomModal = ({ showModal, closeModal, children, className, styles }: Props) => {
  const classes = useStyles(styles);

  return (
    <Modal
      className={classes.modal}
      open={showModal}
      onClose={closeModal}
      closeAfterTransition
      disableAutoFocus
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={showModal}>
        <div className={clsx(classes.paper, className)}>{children}</div>
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: (styles) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: 'none',
    ...styles,
  }),
}));

export default CustomModal;
