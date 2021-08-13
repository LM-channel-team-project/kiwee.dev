import React, { useEffect } from 'react';

import SEO from '@/components/SEO';
import { nextAuthWrapper } from '@/lib/nextAuthWrapper';
import useGetArticles from '@/hooks/swr/useGetArticles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import PostCardLayout from '@/components/PostCardLayout';
import TopButton from '@/components/TopButton';

function Home() {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles();

  // 무한 스크롤
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      onNextPage();
    }
  };

  const { onInfiniteScrollInit, onInfiniteScrollUpdate, onInfiniteScrollDisconnect } =
    useInfiniteScroll(handleObserver);

  useEffect(() => {
    onInfiniteScrollInit(document.querySelector('footer'));
    return () => {
      refresh([], false);
    };
  }, []);

  useEffect(() => {
    if (!hasNextPage || isValidating) onInfiniteScrollDisconnect();
    else onInfiniteScrollUpdate();
  }, [articles, hasNextPage, isValidating]);

  return (
    <>
      <SEO />
      <PostCardLayout articles={articles} isLoading={isValidating} />
      <TopButton />
    </>
  );
}

export const getServerSideProps = nextAuthWrapper({ redirectToHome: false });

export default Home;
