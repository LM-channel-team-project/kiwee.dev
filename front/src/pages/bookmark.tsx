import React from "react";
import PostCardLayout from "@/components/PostCardLayout";
import { useGetArticles } from "@/hooks/swr/useGetArticles";

function bookmark() {
  const { articles, isValidating } = useGetArticles("bookmarks");
  
  return (
    <>
      <PostCardLayout articles={articles} isLoading={isValidating} />
    </>
  )
}

export default bookmark;