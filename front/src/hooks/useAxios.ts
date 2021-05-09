import axios from 'axios';
import { IArticle } from '@/types/article';
import { useState, useEffect } from 'react';

const axiosArticles = async (url: string) => {
  const res = await axios(url);
  const data = await res.data;
  console.log(data);
  return data;
};

export const useAxios = (url: string) => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      const data = await axiosArticles(url);
      setArticles(data.data);
      console.log(articles);
      console.log(data);
    };
    getArticles();
  }, []);

  return articles;
};
