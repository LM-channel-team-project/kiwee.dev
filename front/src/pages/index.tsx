import React, { useEffect } from 'react';

import { nextAuthWrapper } from '@/lib/nextAuthWrapper';
import useGetArticles from '@/hooks/swr/useGetArticles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import PostCardLayout from '@/components/PostCardLayout';

function Home() {
  const { articles, onNextPage, hasNextPage, isValidating } = useGetArticles();

  // 무한 스크롤
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      onNextPage();
    }
  };

  const [onInfiniteScrollUpdate, onInfiniteScrollDisconnect] = useInfiniteScroll(handleObserver);

  useEffect(() => {
    const target = document.querySelector('footer');
    if (articles.length > 1) onInfiniteScrollUpdate(target);
    if (!hasNextPage) onInfiniteScrollDisconnect(target);
  }, [articles, hasNextPage]);

  return <PostCardLayout articles={articles} isLoading={isValidating} />;
}

export const getServerSideProps = nextAuthWrapper({ redirectToHome: false });

export default Home;
