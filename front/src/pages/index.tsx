import PostCardLayout from '@/components/PostCardLayout';
import { useGetArticles } from '@/hooks/swr/useGetArticles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import React, { useEffect } from 'react';

function Home() {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles();

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

export default Home;
