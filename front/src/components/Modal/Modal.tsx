import React, { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModalContext';
import styled, { keyframes, css } from 'styled-components';

import IconButton from '@/components/Common/Button/Icon';
import { useSession } from 'next-auth/client';
import Login from '@/components/Login';
import ProfileDetails from '@/components/Profile/ProfileDetails';

interface Modal {
  disappear: boolean;
}

function Modal() {
  const [modal, toggleModal] = useModal();
  const [session, loading] = useSession();
  const [animate, setAnimate] = useState(false);
  const [localModal, setLocalModal] = useState(modal);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localModal && !modal) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalModal(modal);
  }, [localModal, modal]);

  if (!animate && !localModal) return null;

  return (
    <ModalBackground disappear={!modal} >
      <ModalBlock disappear={!modal} >
        <CloseButton iconName="close" size="medium" styleType="default" onClick={toggleModal} />
        {!session ? <Login /> : <ProfileDetails />}
      </ModalBlock>
    </ModalBackground>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;
const ModalBackground = styled.div<Modal>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme['modal-bg']};

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const ModalBlock = styled.div<Modal>`
  position: relative;
  width: 400px;
  height: 360px;
  padding: 2rem;
  background: ${({ theme }) => theme[`background`]};
  border: ${({ theme }) => theme[`modal-border`]};
  box-shadow: ${({ theme }) => theme[`modal-shadow`]};
  border-radius: 10px;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 1.5rem;
`;

export default Modal;
