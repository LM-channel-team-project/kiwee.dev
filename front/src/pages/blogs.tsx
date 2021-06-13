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
    setBlogList(blogs);
    setBlogCount(count);
  }
  getBlogList();
}, [])

  return (
    <section>
      <BlogCardLayout blogList={blogList} blogCount={blogCount} />
    </section>
  )
}

export default blogs;