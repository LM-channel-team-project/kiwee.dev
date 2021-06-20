import { useEffect } from 'react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useGetArticles from '@/hooks/swr/useGetArticles';
import {
  useMutationObserverSetTarget,
  useMutationObserverTarget,
} from '@/context/MutationObserverContext';

import PostCardLayout from '../PostCardLayout';

interface ProfileStatsPostCardListProps {
  selected: 'likes' | 'histories';
}

function ProfileStatsPostCardList({ selected }: ProfileStatsPostCardListProps) {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles(selected, {
    revalidateAll: true,
    suspense: true,
  });
  const mutateTarget = useMutationObserverTarget();
  const setMutateTarget = useMutationObserverSetTarget();
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

  useEffect(() => {
    // TODO: 좋아요, 북마크 업데이트 시 새로고침 (임시. API 다시 요청하는 것이 아니라 프론트에서 처리하도록 리팩토링해보자.)
    if (mutateTarget?.filter === selected) refresh();
    setMutateTarget(null);
  }, [mutateTarget, selected]);

  return (
    <section>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </section>
  );
}

export default ProfileStatsPostCardList;
