import React, { useState, useEffect } from 'react';
import { getCsrfToken } from 'next-auth/client';

const HOST_URL = 'http://localhost:3000';

const Login = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      setCsrfToken((await getCsrfToken()) || '');
    })();
  }, []);

  return (
    <div>
      <form action={`${HOST_URL}/api/auth/signin/google`} method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken}></input>
        <input type="hidden" name="callbackUrl" value={HOST_URL}></input>
        <button type="submit">구글 로그인</button>
      </form>
      <form action={`${HOST_URL}/api/auth/signin/github`} method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken}></input>
        <input type="hidden" name="callbackUrl" value={HOST_URL}></input>
        <button type="submit">깃헙 로그인</button>
      </form>
    </div>
  );
};

export default Login;
