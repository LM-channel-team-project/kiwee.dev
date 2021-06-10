import { useEffect } from 'react';

import {
  useMutationObserverSetTarget,
  useMutationObserverTarget,
} from '@/context/MutationObserverContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetArticles } from '@/hooks/swr/useGetArticles';
import PostCardLayout from '../PostCardLayout';

interface ProfileStatsPostCardListProps {
  selected: 'likes' | 'histories';
}

function ProfileStatsPostCardList({ selected }: ProfileStatsPostCardListProps) {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles(selected, {
    suspense: true,
    revalidateOnFocus: false,
  });
  const target = useMutationObserverTarget();
  const setTarget = useMutationObserverSetTarget();
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

  useEffect(() => {
    if (selected === target?.filter) refresh();
    setTarget(null);
  }, [target, selected]);

  return (
    <section>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </section>
  );
}

export default ProfileStatsPostCardList;
