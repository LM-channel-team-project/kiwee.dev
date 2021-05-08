import axios from 'axios';
import { useState, useEffect } from 'react';

const axiosArticles = async (url: string) => {
  const res = await axios(url);
  const data = await res.data;
  return data;
};

export const useAxios = (url: string): string[] => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const data = await axiosArticles(url);
      setArticles(data);
    };
    getArticles();
  }, [url]);

  return articles;
};
