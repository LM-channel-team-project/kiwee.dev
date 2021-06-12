import { Blog } from "@/types/blog";
import React from "react";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Wrapper } from "./styles";

interface BlogCardLayoutProps {
  blogList: Blog[];
  blogCount: number;
}

function BlogCardLayout({ blogList, blogCount }: BlogCardLayoutProps) {

  return (
    <Container>
      <h1 className="blogs-title">
        현재 <span className="blogs-count">{blogCount}</span>개의 기술 블로그를 구독 중 🚀
      </h1>
      <Wrapper>
        {blogList &&
          blogList.map((blog, idx) => {
            return <BlogCard blog={blog} key={idx} />
          })}
      </Wrapper>
    </Container>
  )
}

export default BlogCardLayout;

