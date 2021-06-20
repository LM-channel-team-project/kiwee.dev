import React, { useState } from 'react';

type ContextType = [boolean, () => void, () => void];

interface ChildrenType {
  children: React.ReactNode | string;
}

export const ModalContext = React.createContext<ContextType>({} as ContextType);

function ModalProvider({ children }: ChildrenType) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  return <ModalContext.Provider value={[modal, toggleModal, closeModal]}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
