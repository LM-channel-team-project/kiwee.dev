import Keywords from '@/components/Keywords';
import PostCardLayout from '@/components/PostCardLayout';
import { useAxios } from '@/hooks/useAxios';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { IArticle } from '@/types/article';
import React, { useEffect, useMemo, useState } from 'react';

const filterArticles = (articles: IArticle[], keyword: string) =>
  keyword === 'All' ? articles : articles.filter((article) => article.keywords.includes(keyword));

  const INITIAL_PAGE_NUMBER = 1;
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  /**
   * articles: 게시글 정보가 담겨있는 배열
   * pages: 페이지 수 (마지막 페이지)
   * isLoading: 로딩여부
   */
  const { articles, pages, keywords, isLoading } = useAxios(
    `http://localhost:8080/article?page=${currentPage}`,
  );

  // 무한 스크롤
  const handleObserver: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      // console.log(entry);
      setCurrentPage((prev) => prev + 1);
    }
  };
  const [
    onInfiniteScrollInit,
    onInfiniteScrollUpdate,
    onInfiniteScrollDisconnect,
  ] = useInfiniteScroll(handleObserver);

  useEffect(() => {
    onInfiniteScrollInit(document.querySelector('footer'));
  }, []);

  useEffect(() => {
    // setCurrentPage(INITIAL_PAGE_NUMBER);
    if (currentPage < pages) {
      onInfiniteScrollUpdate(document.querySelector('footer'));
      console.log('맨밑', currentPage, articles);
    }
  }, [articles, currentPage]);

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
