import React from "react";
import { Blog } from "@/types/blog";
import { CardContainer, CardWrapper } from "./styles";

interface BlogCardProps {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {


  return (
    <CardContainer>
      <CardWrapper href={blog.rssLink} target="_blank" rel="noopener noreferer">
        <img className="blog-image" src={blog.avatar} alt={blog.name}/>
        <div className="blog-name">{blog.name}</div>
      </CardWrapper>
    </CardContainer>
  )
}



export default BlogCard;

