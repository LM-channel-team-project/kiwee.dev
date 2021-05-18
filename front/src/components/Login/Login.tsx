import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCsrfToken } from 'next-auth/client';

import { google as Google, github as GitHub } from '@/components/Common/Icon/svg';
import { useThemeContext } from '@/hooks/useThemeContext';

const HOST_URL = 'http://localhost:3000';

const Login = () => {
  const [mode] = useThemeContext();
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      setCsrfToken((await getCsrfToken()) || '');
    })();
  }, []);

  return (
    <LoginContainer>
      <Logo>LOGO</Logo>
      <LoginTip>Tech-Blog에 로그인 하고 북마크와 같은 다양한 기능들을 이용해보세요!</LoginTip>
      <ButtonWrapper>
        <form action={`${HOST_URL}/api/auth/signin/google`} method="POST">
          <input type="hidden" name="csrfToken" value={csrfToken}></input>
          <input type="hidden" name="callbackUrl" value={HOST_URL}></input>
          <button className="login-btn" type="submit">
            <Google className="icon" />
            <span>Sign in with Google</span>
          </button>
        </form>
        <form action={`${HOST_URL}/api/auth/signin/github`} method="POST">
          <input type="hidden" name="csrfToken" value={csrfToken}></input>
          <input type="hidden" name="callbackUrl" value={HOST_URL}></input>
          <button className="login-btn" type="submit">
            {mode === 'light' ? (
              <GitHub className="icon" fill="#fff" />
            ) : (
              <GitHub className="icon" fill="#000" />
            )}
            <span>Sign in with GitHub</span>
          </button>
        </form>
      </ButtonWrapper>
      <LoginPolicy>By signing up I accept the Terms of Service and the Privacy Policy.</LoginPolicy>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.div`
  margin: 0.5rem 0;
`;

const LoginTip = styled.div`
  margin: 2.5rem 0 2rem;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const ButtonWrapper = styled.div`
  margin: 1.5rem 0;

  form {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: none;
      border-radius: 10px;
      width: 210px;
      height: 45px;
      cursor: pointer;
      background: ${({ theme }) => theme['login-btn-bg']};

      span {
        color: ${({ theme }) => theme['login-btn-font']};
        margin-left: 8px;
        font-size: 1.6rem;
        font-weight: 700;
      }

      &:not(:first-child) {
        margin-top: 1.5rem;
      }

      &:hover {
        background: ${({ theme }) => theme['login-btn-hover-bg']};
      }
      &:active {
        background: ${({ theme }) => theme['login-btn-active-bg']};
      }
    }
  }
`;

const LoginPolicy = styled.div`
  margin-top: 3rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

export default Login;
