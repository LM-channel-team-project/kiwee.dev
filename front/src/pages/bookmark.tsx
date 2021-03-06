import React, { useEffect } from 'react';

import SEO from '@/components/SEO';
import {
  useMutationObserverSetTarget,
  useMutationObserverTarget,
} from '@/context/MutationObserverContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useGetArticles from '@/hooks/swr/useGetArticles';
import PostCardLayout from '@/components/PostCardLayout';
import TopButton from '@/components/TopButton';

function bookmark() {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles(
    'bookmarks',
    {},
  );

  const target = useMutationObserverTarget();
  const setTarget = useMutationObserverSetTarget();
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      onNextPage();
    }
  };

  const { onInfiniteScrollInit, onInfiniteScrollUpdate, onInfiniteScrollDisconnect } =
    useInfiniteScroll(handleObserver);

  useEffect(() => {
    onInfiniteScrollInit(document.querySelector('footer'));
  });

  useEffect(() => {
    if (!hasNextPage || isValidating) onInfiniteScrollDisconnect();
    else onInfiniteScrollUpdate();
  }, [articles, hasNextPage, isValidating]);

  useEffect(() => {
    if ('bookmarks' === target?.filter) refresh();
    setTarget(null);
  }, [target]);

  return (
    <section>
      <SEO />
      <PostCardLayout articles={articles} isLoading={isValidating} />
      <TopButton />
    </section>
  );
}

export default bookmark;
