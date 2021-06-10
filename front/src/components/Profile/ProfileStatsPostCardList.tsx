import { useEffect } from 'react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useGetArticles from '@/hooks/swr/useGetArticles';
import PostCardLayout from '../PostCardLayout';

interface ProfileStatsPostCardListProps {
  selected: 'likes' | 'histories';
}

function ProfileStatsPostCardList({ selected }: ProfileStatsPostCardListProps) {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles(selected, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateAll: true,
  });
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      onNextPage();
    }
  };

  const [
    onInfiniteScrollInit,
    onInfiniteScrollUpdate,
    onInfiniteScrollDisconnect,
  ] = useInfiniteScroll(handleObserver);

  useEffect(() => {
    onInfiniteScrollInit(document.querySelector('footer'));
  });

  useEffect(() => {
    const target = document.querySelector('footer');
    if (!hasNextPage) return onInfiniteScrollDisconnect(target);
    onInfiniteScrollUpdate(target);
  }, [articles, hasNextPage]);

  return (
    <section>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </section>
  );
}

export default ProfileStatsPostCardList;
