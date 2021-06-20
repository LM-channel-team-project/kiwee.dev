import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  console.log(pathname);

  return (
    <>
      <HeaderBlock>
        <Link href="/">
          <a className="header-logo-wrapper">
            <img src="/img/logo.svg" alt="로고" />
          </a>
        </Link>
        <div className="header-contents">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li>
                {pathname === '/blogs' ? (
                  <TextButton label="blogs" to="/blogs" size="medium" selected={true} />
                ) : (
                  <TextButton label="blogs" to="/blogs" size="medium" styleType="default" />
                )}
              </li>
              <li>
                {!session ? (
                  <IconButton
                    to="/"
                    iconName="bookmark"
                    size="small"
                    styleType="default"
                    onClick={toggleModal}
                  />
                ) : pathname === '/bookmark' ? (
                  <IconButton to="/bookmark" iconName="bookmark" size="small" selected={true} />
                ) : (
                  <IconButton to="/bookmark" iconName="bookmark" size="small" styleType="default" />
                )}
              </li>
              <li>
                {isSettingView ? (
                  <IconButton
                    iconName="setting"
                    size="small"
                    selected={true}
                    onClick={onClickSetting}
                  />
                ) : (
                  <IconButton
                    iconName="setting"
                    size="small"
                    styleType="default"
                    onClick={onClickSetting}
                  />
                )}
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
  height: 100px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 1.6rem;
  margin-bottom: -1.6rem;
  .header-logo-wrapper {
    display: flex;
    width: 200px;
    height: 64px;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
    }

    @media (max-width: 480px) {
      margin-top: 0.8rem;
      padding-left: 0;
      height: 48px;
      width: 100px;
    }
  }

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
