// import Keywords from '@/components/Keywords';
import PostCardLayout from '@/components/PostCardLayout';
import { useGetArticles } from '@/hooks/swr/useGetArticles';
import { useGetData } from '@/hooks/useGetData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import React, { useEffect, useState } from 'react';

// // 키워드 api 바뀌면 요청 새로 보내기
// const filterArticles = (articles: IArticle[], keyword: string) =>
//   keyword === 'All' ? articles : articles.filter((article) => article.keywords.includes(keyword));

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

  // // 필터링
  // const [filter, setFilter] = useState<string>('All');
  // const handleFiltering = (key: string) => {
  //   setFilter(key);
  //   console.log(filter);
  // };

  // const filteredArticles = useMemo(() => filterArticles(articles, filter), [articles, filter]);

  return (
    <>
      <PostCardLayout articles={articles} />
    </>
  );
}

export default Home;
