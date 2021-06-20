import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSession } from 'next-auth/client';
import { useModal } from '@/hooks/useModalContext';

import HeaderAuth from './HeaderAuth';
import Settings from '../Settings';
import IconButton from '@/components/Common/Button/Icon';
import TextButton from '@/components/Common/Button/Text';

function header() {
  const [session] = useSession();
  const [, toggleModal] = useModal();
  const [isSettingView, setIsSettingView] = useState(false);
  const { pathname } = useRouter();

  const onClickSetting = () => {
    setIsSettingView(!isSettingView);
  };

  const onToggleModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (session) return;
    e.preventDefault();
    toggleModal();
  };

  return (
    <>
      <HeaderBlock>
        <h1>
          <Link href="/">
            <a className="header-logo-wrapper">
              <Image src="/img/logo.svg" width="100%" height="40px" alt="로고" layout="intrinsic" />
            </a>
          </Link>
        </h1>
        <div className="header-contents">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li>
                <TextButton
                  label="blogs"
                  to="/blogs"
                  size="medium"
                  styleType="default"
                  selected={pathname === '/blogs'}
                  passHref
                />
              </li>
              <li>
                <IconButton
                  to="/bookmark"
                  iconName="bookmark"
                  size="small"
                  styleType="default"
                  selected={pathname === '/bookmark'}
                  onClick={onToggleModal}
                  aria-label="bookmark page"
                  passHref
                />
              </li>
              <li>
                <IconButton
                  aria-label="setting-button"
                  iconName="setting"
                  size="small"
                  selected={isSettingView}
                  onClick={onClickSetting}
                />
              </li>
              <li>
                <div className="header-auth-block">
                  <HeaderAuth session={session} toggleModal={toggleModal} />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </HeaderBlock>
      {isSettingView && <Settings />}
    </>
  );
}

const HeaderBlock = styled.header`
  display: flex;
  width: 1728px;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 3.2rem);
  }

  @media (max-width: 480px) {
    height: 64px;
  }

  .header-contents {
    display: flex;
    justify-content: center;
    align-items: center;

    .header-nav {
      .header-nav-list {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;

        li {
          margin-left: 0.5rem;
        }
        .header-auth-block {
          margin-left: 0.5rem;
          border-radius: 8px;
        }
      }
    }
  }
`;

export default header;
