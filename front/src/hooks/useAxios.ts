import axios from 'axios';
import { IArticle } from '@/types/article';
import { useState, useEffect } from 'react';

const axiosArticles = async (url: string) => {
  const res = await axios.get(url);
  const data = await res.data;
  console.log(data);
  return data;
};

export const useAxios = (url: string) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const getArticles = async () => {
      await setIsLoading(true);
      const data = await axiosArticles(url);
      setArticles((prev) => [...prev, ...data.data]);
      setPages(data.totalPages);
      setCur(data.page);
      setIsLoading(false);
    };
    getArticles();
  }, [url]);

  return { articles, pages, cur, isLoading };
};
