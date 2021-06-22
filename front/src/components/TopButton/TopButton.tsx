import React from 'react';
import styled from 'styled-components';

import { top as Top } from 'components/Common/Icon/svg';
import { useThemeContext } from '@/hooks/useThemeContext';

function TopButton() {
  const [mode] = useThemeContext();

  const onScrollTo = () => {
    console.log(window.scrollY);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Button onClick={onScrollTo}>
        {mode === 'light' ? (
          <Top width="30" height="20" fill="#fff"></Top>
        ) : (
          <Top width="30" height="20" fill="#000"></Top>
        )}
      </Button>
    </>
  );
}

const Button = styled.button`
  position: fixed;
  width: 45px;
  height: 45px;
  right: 25px;
  bottom: 25px;
  cursor: pointer;
  /* border-radius: 50%; */
`;

export default TopButton;
