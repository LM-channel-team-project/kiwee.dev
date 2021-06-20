import React, { useState, useEffect } from 'react';
import { getCsrfToken } from 'next-auth/client';
import { LoginContainer, Logo, LoginPolicy, LoginTip, ButtonWrapper, Privacy, Term } from './styles';
import { google as Google, github as GitHub } from '@/components/Common/Icon/svg';
import { useThemeContext } from '@/hooks/useThemeContext';
import Link from 'next/link';

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
      <LoginPolicy>
        <Privacy>
          <Link href="/privacy">
            개인정보처리방침
          </Link>
        </Privacy>
        <Term>
          <Link href="/term">
            약관
          </Link>
        </Term>
      </LoginPolicy>
    </LoginContainer>
  );
};

export default Login;
