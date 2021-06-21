import { useEffect } from 'react';
import styled from 'styled-components';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useGetArticles from '@/hooks/swr/useGetArticles';
import PostCardLayout from '../PostCardLayout';
import { cache } from 'swr';

interface ProfileStatsPostCardListProps {
  selected: 'likes' | 'histories';
}

function ProfileStatsPostCardList({ selected }: ProfileStatsPostCardListProps) {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles(selected, {
    suspense: true,
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
    refresh();
    onInfiniteScrollInit(document.querySelector('footer'));
    return () => {
      refresh([], false);
      const keys = cache.keys().filter((key) => key.startsWith('len@'));
      if (keys.length) keys.forEach((key) => cache.delete(key));
    };
  }, []);

  useEffect(() => {
    const target = document.querySelector('footer');
    if (!hasNextPage || isValidating) onInfiniteScrollDisconnect(target);
    else onInfiniteScrollUpdate(target);
  }, [articles, hasNextPage, isValidating]);

  if (!articles.length && !isValidating) {
    return (
      <StyledSpan>{selected == 'histories' ? '방문한' : '좋아요한'}게시물이 없습니다.</StyledSpan>
    );
  }
  return (
    <section>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </section>
  );
}

const StyledSpan = styled.span`
  display: block;
  text-align: center;
  margin: 80px 0;
  font-size: 1.6rem;
  color: ${({ theme }) => theme['font-inactive']};
`;

export default ProfileStatsPostCardList;
