import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Common/Button';

function HeaderAuth() {
  return (
    <HeaderAuthBlock>
      <Button>Login</Button>
    </HeaderAuthBlock>
  );
}

const HeaderAuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HeaderAuth;
