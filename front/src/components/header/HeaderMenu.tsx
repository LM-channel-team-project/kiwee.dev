import styled from 'styled-components';
import { signout } from 'next-auth/client';

import HeaderMenuItem from './HeaderMenuItem';
import { useEffect, useRef } from 'react';

function HeaderMenu({ onClose }: { onClose: () => void }) {
  const menuEl = useRef<HTMLDivElement>(null);

  const onClickOutside = (e: MouseEvent) => {
    if ((e.target as HTMLElement).className == 'profile-image') return;
    if (!menuEl.current?.contains(e.target as HTMLElement)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', onClickOutside);
    return () => {
      document.removeEventListener('mouseup', onClickOutside);
    };
  }, []);

  return (
    <HeaderMenuBlock ref={menuEl}>
      <div className="menu-wrapper">
        <HeaderMenuItem to="/profile">내 프로필</HeaderMenuItem>
        <HeaderMenuItem onClick={signout}>로그아웃</HeaderMenuItem>
      </div>
    </HeaderMenuBlock>
  );
}

const HeaderMenuBlock = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  margin-top: 0.8rem;
  color: ${({ theme }) => theme['font-inactive']};
  border-radius: 0.4rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme['settings-bg']};
  .menu-wrapper {
    position: relative;
    border-radius: 0.4rem;
    .menu-item:first-child {
      border-radius: 0.4rem 0.4rem 0 0;
    }
    .menu-item:last-child {
      border-radius: 0 0 0.4rem 0.4rem;
    }
  }
`;

export default HeaderMenu;
