import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import HeaderPreference from './HeaderPreference';
import HeaderAuth from './HeaderAuth';
import HeaderUserProfile from './HeaderUserProfile';
import ToggleDarkmode from '../Settings/ToggleDarkmode';

function header() {
  /**
   * TODO: 로그인, 모달, 설정 추가되면 밑에 있는 기능들 구현
   * - 로그인 버튼 누르면 로그인 모달창 띄우기
   * - 로그인에 따라 로그인 버튼, 유저 프로필 보여주기
   */
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  return (
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
              <Link href="/blogs">
                <a>목록</a>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <a>북마크</a>
              </Link>
            </li>
          </ul>
        </nav>
        {router.pathname === '/' && <HeaderPreference />}
        <div className="header-auth-block">{isLogged ? <HeaderUserProfile /> : <HeaderAuth />}</div>
        <ToggleDarkmode />
      </div>
    </HeaderBlock>
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
        list-style: none;
      }
    }
    .header-auth-block {
      margin-left: 1.6rem;
    }
  }
`;

export default header;
