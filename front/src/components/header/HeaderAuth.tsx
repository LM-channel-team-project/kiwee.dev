import React from 'react';
import styled from 'styled-components';

import TextButton from '@/components/Common/Button/Text';
import { useModal } from '@/hooks/useModalContext';

function HeaderAuth() {
  const [modal, toggleModal] = useModal();

  return (
    <HeaderAuthBlock>
      <TextButton label="Login" styleType="primary" size="large" onClick={toggleModal} />
    </HeaderAuthBlock>
  );
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HeaderAuth;
