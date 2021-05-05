import React from 'react';
import styled from 'styled-components';

import TextButton from '@/components/Common/Button/Text';

function HeaderAuth() {
  return (
    <HeaderAuthBlock>
      <TextButton
        label="Login"
        styleType="primary"
        size="large"
        onClick={() => console.log('Login Click')}
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
