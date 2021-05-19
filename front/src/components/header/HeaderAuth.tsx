import React from 'react';
import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/client';
import Image from 'next/image';

import TextButton from '@/components/Common/Button/Text';
import { useModal } from '@/hooks/useModalContext';
import Link from 'next/link';

function HeaderAuth() {
  // next-auth
  const [session, isLoading] = useSession();
  const [modal, toggleModal] = useModal();

  return (
    <HeaderAuthBlock>
      {!session ? (
        <TextButton label="Login" styleType="primary" size="large" onClick={toggleModal} />
      ) : (
        <Link href="/profile">
          <a>
            <Image
              loader={imageLoader}
              src={session.user?.image || 'null'}
              width="40"
              height="40"
              alt="profile image"
              layout="intrinsic"
              className="profile-image"
            />
          </a>
        </Link>
      )}
    </HeaderAuthBlock>
  );
}

function imageLoader({ src }: { src: string }) {
  return src;
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HeaderAuth;
