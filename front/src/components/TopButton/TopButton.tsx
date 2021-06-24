import React, { useEffect, useState } from 'react';

import { top as Top } from 'components/Common/Icon/svg';
import { useThemeContext } from '@/hooks/useThemeContext';
import { Button } from './styles';

function TopButton() {
  const [mode] = useThemeContext();
  const [scrollDirection, setScrollDirection] = useState(0);
  const [preOffset, setPreOffset] = useState(0);

  const toggleScrollDirection = () => {
    const scrollY = window.scrollY;
    if (scrollY === 0) {
      setScrollDirection(0);
    }
    if (scrollY > preOffset) {
      setScrollDirection(-1);
    } else if (scrollY < preOffset) {
      setScrollDirection(1);
    }
    setPreOffset(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleScrollDirection);
    return () => {
      window.removeEventListener('scroll', toggleScrollDirection);
    };
  });

  const onScrollTo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {scrollDirection > 0 && scrollY > 300 && (
        <Button onClick={onScrollTo}>
          <Top width="30" height="35"></Top>
        </Button>
      )}
    </>
  );
}

export default TopButton;
