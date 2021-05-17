import React from 'react';
import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/client';

import TextButton from '@/components/Common/Button/Text';
import { useModal } from '@/hooks/useModalContext';

function HeaderAuth() {
  // next-auth
  const [session, isLoading] = useSession();

  const [modal, toggleModal] = useModal();

  console.log(session);
  return (
    <HeaderAuthBlock>
      {/* <TextButton label="Login" styleType="primary" size="large" onClick={toggleModal} /> */}
      <TextButton
        label={!session ? 'Login' : 'Logout'}
        styleType="primary"
        size="large"
        onClick={!session ? toggleModal : () => signOut()}
      />
    </HeaderAuthBlock>
  );
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HeaderAuth;
