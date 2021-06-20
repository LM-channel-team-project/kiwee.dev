import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Session } from 'next-auth';

import HeaderMenu from './HeaderMenu';
import TextButton from '@/components/Common/Button/Text';

interface HeaderAuthProps {
  session: Session | null;
  toggleModal: () => void;
}

function HeaderAuth({ session, toggleModal }: HeaderAuthProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const onOpenMenu = () => {
    setOpenMenu((open) => !open);
  };
  const onClose = () => {
    setOpenMenu(false);
  };

  return (
    <HeaderAuthBlock>
      {!session ? (
        <TextButton label="Login" styleType="primary" size="large" onClick={toggleModal} />
      ) : (
        <button className="profile-button" onClick={onOpenMenu}>
          <Image
            loader={imageLoader}
            src={session.user?.image || 'null'}
            width="40"
            height="40"
            alt="profile image"
            layout="fixed"
            className="profile-image"
          />
        </button>
      )}
      {openMenu && <HeaderMenu onClose={onClose} />}
    </HeaderAuthBlock>
  );
}

function imageLoader({ src }: { src: string }) {
  return src;
}

const HeaderAuthBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .profile-button {
    width: 4rem;
    height: 4rem;
    padding: 0;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
  }
`;

export default HeaderAuth;
