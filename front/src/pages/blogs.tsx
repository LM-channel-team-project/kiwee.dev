import React, { useEffect, useState } from "react";

import BlogCardLayout from "@/components/BlogCardLayout";
import { client } from "@/lib/api";

function blogs() {
  const [blogList, setBlogList] = useState([]);
  const [blogCount, setBlogCount] = useState(0);

useEffect(() => {
  const getBlogList = async () => {
    const blogList = await client.get('/provider/blogs');
    const { blogs, count } = blogList.data;
    console.log(blogs);
    setBlogList(blogs);
    setBlogCount(count);
  }
  getBlogList();
}, [])

  return (
    <>
      <BlogCardLayout blogList={blogList} blogCount={blogCount} />
    </>
  )
}

export default blogs;