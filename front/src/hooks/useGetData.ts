import { IArticle } from '@/types/article';
import { useState, useEffect } from 'react';
import { client } from '@/lib/api/client';

const getData = async (url: string) => {
  const res = await client.get(url);
  const data = await res.data;

  return data;
};

export const useGetData = (url: string) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [cur, setCur] = useState(0);
  // const [keywords, setKeywords] = useState({});

  useEffect(() => {
    const getArticles = async () => {
      await setIsLoading(true);
      const data = await getData(url);
      setArticles((prev) => [...prev, ...data.data]);
      setPages(data.totalPages);
      setCur(data.page);
      setIsLoading(false);
    };
    getArticles();
  }, [url]);

  // useEffect(() => {
  //   // 키워드 가져오기
  //   const getKeywords = async () => {
  //     const data = await getData(url);
  //     const keywordArr = [];
  //     const keywordMap = new Map<string, number>();
  //     // 키워드를 keywordArr이라는 배열에 저장
  //     for (const d of data.data) {
  //       keywordArr.push(...d.keywords);
  //     }

  //     // 배열의 원소를 하나씩 검사하면서 갯수 세기
  //     for (const word of keywordArr) {
  //       if (keywordMap.has(word)) {
  //         keywordMap.set(word, keywordMap?.get(word) + 1);
  //       } else keywordMap.set(word, 1);
  //     }

  //     // console.log(keywordMap);
  //     setKeywords(keywordMap);
  //     // console.log(keywords);
  //   };
  //   getKeywords();
  // }, [url]);

  return { articles, pages, cur, isLoading };
};
