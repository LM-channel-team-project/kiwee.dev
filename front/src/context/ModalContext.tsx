import React, { useState } from 'react';

type ContextType = [boolean, () => void];

interface ChildrenType {
  children: React.ReactNode | string;
}

export const ModalContext = React.createContext<ContextType>({} as ContextType);

function ModalProvider({ children }: ChildrenType) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return <ModalContext.Provider value={[modal, toggleModal]}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
