import { Blog } from "@/types/blog";
import React from "react";
import BlogCard from "./BlogCard/BlogCard";
import { Container, Wrapper } from "./styles";

interface BlogCardLayoutProps {
  blogList: Blog[];
}

function BlogCardLayout({ blogList }: BlogCardLayoutProps) {

  return (
    <Container>
      <h1 className="blogs-title">
        현재 <span className="blogs-count">{blogList.length}</span>개의 기술 블로그를 구독 중 🚀
      </h1>
      <Wrapper>
        {blogList &&
          blogList.map((blog) => {
            return <BlogCard blog={blog} key={blog.id} />
          })}
      </Wrapper>
    </Container>
  )
}

export default BlogCardLayout;

