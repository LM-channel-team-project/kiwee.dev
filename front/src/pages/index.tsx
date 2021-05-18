import Modal from '@/components/Common/Modal';
import Keywords from '@/components/Keywords';
import PostCardLayout from '@/components/PostCardLayout';
import { useAxios } from '@/hooks/useAxios';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
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

  const INITIAL_PAGE_NUMBER = 1;
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  const { articles, pages, keywords, isLoading } = useAxios(
    /**
     * articles: 게시글 정보가 담겨있는 배열
     * pages: 페이지 수 (마지막 페이지)
     * isLoading: 로딩여부
     */
    `http://localhost:8080/article?page=${currentPage}`,
  );

  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      // console.log(entry);
      setCurrentPage((prev) => prev + 1);
    }
  };
  const [
    onInfiniteScrollInit,
    onInfiniteScrollUpdate,
    onInfiniteScrollDisconnect,
  ] = useInfiniteScroll(handleObserver);

  useEffect(() => {
    onInfiniteScrollInit(document.querySelector('footer'));
  }, []);

  useEffect(() => {
    // setCurrentPage(INITIAL_PAGE_NUMBER);
    if (currentPage < pages) {
      onInfiniteScrollUpdate(document.querySelector('footer'));
      console.log('맨밑', currentPage, articles);
    }
  }, [articles, currentPage]);

  useEffect(() => {
    if (currentPage === pages) {
      onInfiniteScrollDisconnect(document.querySelector('footer'));
    }
  }, [currentPage]);

  return (
    <>
      <Keywords keywords={keywords} />
      <PostCardLayout articles={articles} />
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
