import Keywords from '@/components/Keywords';
import PostCardLayout from '@/components/PostCardLayout';
import { useGetData } from '@/hooks/useGetData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { IArticle } from '@/types/article';
import React, { useEffect, useMemo, useState } from 'react';

// 키워드 api 바뀌면 요청 새로 보내기
const filterArticles = (articles: IArticle[], keyword: string) =>
  keyword === 'All' ? articles : articles.filter((article) => article.keywords.includes(keyword));

function Home() {
  const INITIAL_PAGE_NUMBER = 1;
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  /**
   * articles: 게시글 정보가 담겨있는 배열
   * pages: 페이지 수 (마지막 페이지)
   * isLoading: 로딩여부
   */
  const { articles, pages, keywords, isLoading } = useGetData(`/article?page=${currentPage}`);

  // 무한 스크롤
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const [onInfiniteScrollUpdate, onInfiniteScrollDisconnect] = useInfiniteScroll(handleObserver);

  useEffect(() => {
    if (0 < articles.length && articles.length < 21) {
      onInfiniteScrollUpdate(document.querySelector('footer'));
    }
  }, [articles]);

  useEffect(() => {
    if (currentPage === pages) {
      onInfiniteScrollDisconnect(document.querySelector('footer'));
    }
  }, [currentPage]);

  // 필터링
  const [filter, setFilter] = useState<string>('All');
  const handleFiltering = (key: string) => {
    setFilter(key);
    console.log(filter);
  };

  const filteredArticles = useMemo(() => filterArticles(articles, filter), [articles, filter]);

  return (
    <>
      <Keywords keywords={keywords} handleFiltering={handleFiltering} />
      <PostCardLayout articles={filteredArticles} />
    </>
  );
}

export default Home;
