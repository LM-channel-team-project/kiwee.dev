import React, { useEffect } from "react";

import {
  useMutationObserverSetTarget,
  useMutationObserverTarget,
} from '@/context/MutationObserverContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetArticles } from "@/hooks/swr/useGetArticles";
import PostCardLayout from "@/components/PostCardLayout";

function bookmark() {
  const { articles, onNextPage, hasNextPage, isValidating, refresh } = useGetArticles("bookmarks", {

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
    if ("bookmarks" === target?.filter) refresh();
    setTarget(null);
  }, [target]);

  return (
    <section>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </section>
  )
}

export default bookmark;