import { useModal } from '@/hooks/useModalContext';
import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode | string;
}

function Modal({ children }: ModalProps) {
  const [modal, toggleModal] = useModal();

  if (!modal) return null;

  return (
    <ModalBackground>
      <ModalBlock>
        <button className="close-btn" onClick={toggleModal}>
          Close
        </button>
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

  background: rgba(0, 0, 0, 0.3);
`;

const ModalBlock = styled.div`
  position: relative;
  width: 350px;
  height: 400px;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;

  .close-btn {
    position: absolute;
    right: 1.5rem;
  }
`;

export default Modal;
