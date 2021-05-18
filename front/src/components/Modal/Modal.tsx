import React from 'react';
import { useModal } from '@/hooks/useModalContext';
import styled from 'styled-components';

import IconButton from '../Common/Button/Icon';

interface ModalProps {
  children: React.ReactNode | string;
}

function Modal({ children }: ModalProps) {
  const [modal, toggleModal] = useModal();

  if (!modal) return null;

  return (
    <ModalBackground>
      <ModalBlock>
        <CloseButton iconName="close" size="medium" styleType="default" onClick={toggleModal} />
        {children}
      </ModalBlock>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme['modal-bg']};
`;

const ModalBlock = styled.div`
  position: relative;
  width: 400px;
  height: 360px;
  padding: 2rem;
  background: ${({ theme }) => theme[`background`]};
  border: ${({ theme }) => theme[`modal-border`]};
  border-radius: 10px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 1.5rem;
`;

export default Modal;
