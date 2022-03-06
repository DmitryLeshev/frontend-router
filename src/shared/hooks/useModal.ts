import { useState } from 'react';

export default (initialState: boolean = false) => {
  const [showModal, setShowModal] = useState(initialState);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, closeModal, openModal };
};
