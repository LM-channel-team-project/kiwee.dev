import React, { useEffect, useState } from "react";
import { client } from '@/lib/api/client';
import PostCardLayout from "@/components/PostCardLayout";
import { IArticle } from "@/types/article";

interface Bookmark {
  articleId: string,
  _id: string
}

function bookmark() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  
  // 1. 북마크된 articleId를 배열의 요소로 변형
  const getBookmarkedArticles = async (): Promise<string[] | undefined> => {
    try {
      const res = await client.get("/bookmarks")
      const bookmarks = res.data.infos;
      const articles = bookmarks.map((bookmark: Bookmark) => bookmark.articleId);
      return articles;
    } catch (err) {
      console.log(err);
    }
  };
  
  // 2. articleId로 게시글 정보를 배열로 변형 
  useEffect(() => {
    getBookmarkedArticles()
    .then(async data => {
      const promises = data.map(async (id: string): Promise<IArticle> => { const article = await client.get(`/article?articleId=${id}`); return article.data.article;
      });
      const articles = await Promise.all(promises);
      setArticles(articles);
    }) 
}, [])
  
getBookmarkedArticles();

  return (
    <>
      <PostCardLayout articles={articles} />
    </>
  )
}

export default bookmark;