import { useState } from 'react';
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
  const [, toggleModal] = useModal()
  const [isSettingView, setIsSettingView] = useState(false);

  const onClickSetting = () => {
    setIsSettingView(!isSettingView);
  };

  return (
    <>
      <HeaderBlock>
        <Link href="/">
          <a className="header-logo-wrapper">
            <span>LOGO</span>&nbsp;
            <span>LOGONAME</span>
          </a>
        </Link>
        <div className="header-contents">
          <nav className="header-nav">
            <ul className="header-nav-list">
              <li>
                <TextButton
                  label="기술 블로그 목록"
                  to="/blogs"
                  size="medium"
                  styleType="default"
                />
              </li>
              <li>
                {!session ? (
                  <IconButton to="/" iconName="bookmark" size="small" styleType="default" onClick={toggleModal} />
                ) : (
                  <IconButton to="/bookmark" iconName="bookmark" size="small" styleType="default" />
                )}
              </li>
            </ul>
          </nav>
          <IconButton
            iconName="setting"
            size="small"
            styleType="default"
            onClick={onClickSetting}
          />
          <div className="header-auth-block">
            <HeaderAuth session={session} toggleModal={toggleModal} />
          </div>
        </div>
      </HeaderBlock>
      {isSettingView && <Settings />}
    </>
  );
}

const HeaderBlock = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 1.6rem;
  justify-content: space-between;
  align-items: center;
  .header-logo-wrapper {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
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
      }
    }
    .header-auth-block {
      margin-left: 1.6rem;
    }
  }
`;

export default header;
