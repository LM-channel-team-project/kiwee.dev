import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Common/Button';
import { useModal } from '@/hooks/useModalContext';

function HeaderAuth() {
  const [modal, toggleModal] = useModal();

  return (
    <HeaderAuthBlock>
      <Button onClick={toggleModal}>Login</Button>
    </HeaderAuthBlock>
  );
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HeaderAuth;
