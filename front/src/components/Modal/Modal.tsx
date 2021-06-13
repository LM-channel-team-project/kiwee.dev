import React, { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModalContext';
import { useSession } from 'next-auth/client';
import { ModalBackground, ModalBlock, CloseButton } from './styles';

import Login from '@/components/Login';
import ProfileDetails from '@/components/Profile/ProfileDetails';

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
    <ModalBackground disappear={!modal}>
      <ModalBlock disappear={!modal}>
        <CloseButton iconName="close" size="medium" styleType="default" onClick={toggleModal} />
        {!session ? <Login /> : <ProfileDetails />}
      </ModalBlock>
    </ModalBackground>
  );
}

export default Modal;
