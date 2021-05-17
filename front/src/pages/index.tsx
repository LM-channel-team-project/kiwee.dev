import Modal from '@/components/Common/Modal';
import PostCardLayout from '@/components/PostCardLayout';
import { getCsrfToken } from 'next-auth/client';
import React, { useEffect, useState } from 'react';

// HOST URL
const HOST_URL = 'http://localhost:3000';

export default function Home() {
  const [csrfToken, setCsrfToken] = useState<string>('');
  useEffect(() => {
    (async () => {
      setCsrfToken((await getCsrfToken()) || '');
    })();
  }, []);
  return (
    <>
      <PostCardLayout />
      <Modal>
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
      </Modal>
    </>
  );
}
