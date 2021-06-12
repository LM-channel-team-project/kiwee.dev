import React from "react";

import BlogCardLayout from "@/components/BlogCardLayout";

const blogList = [
  {
    id: 1,
    name: "라인",
    url: "https://engineering.linecorp.com/ko",
    image: "https://engineering.linecorp.com/wp-content/uploads/2019/04/cropped-linev_favicon_1x1_transparent-32x32.png",
  },
  {
    id: 2,
    name: "카카오",
    url: "https://tech.kakao.com",
    image: "https://tech.kakao.com/favicon.ico",
  },
  {
    id: 3,
    name: "우아한형제들",
    url: "https://woowabros.github.io",
    image: "https://www.woowahan.com/favicon/favicon.ico",
  },
  {
    id: 4,
    name: "라인",
    url: "https://engineering.linecorp.com/ko",
    image: "https://engineering.linecorp.com/wp-content/uploads/2019/04/cropped-linev_favicon_1x1_transparent-32x32.png",
  },
  {
    id: 5,
    name: "카카오",
    url: "https://tech.kakao.com",
    image: "https://tech.kakao.com/favicon.ico",
  },
  {
    id: 6,
    name: "우아한형제들",
    url: "https://woowabros.github.io",
    image: "https://www.woowahan.com/favicon/favicon.ico",
  },
  {
    id: 7,
    name: "라인",
    url: "https://engineering.linecorp.com/ko",
    image: "https://engineering.linecorp.com/wp-content/uploads/2019/04/cropped-linev_favicon_1x1_transparent-32x32.png",
  },
  {
    id: 8,
    name: "카카오",
    url: "https://tech.kakao.com",
    image: "https://tech.kakao.com/favicon.ico",
  },
  {
    id: 9,
    name: "우아한형제들",
    url: "https://woowabros.github.io",
    image: "https://www.woowahan.com/favicon/favicon.ico",
  },
  {
    id: 10,
    name: "라인",
    url: "https://engineering.linecorp.com/ko",
    image: "https://engineering.linecorp.com/wp-content/uploads/2019/04/cropped-linev_favicon_1x1_transparent-32x32.png",
  },
  {
    id: 11,
    name: "카카오",
    url: "https://tech.kakao.com",
    image: "https://tech.kakao.com/favicon.ico",
  },
  {
    id: 12,
    name: "우아한형제들",
    url: "https://woowabros.github.io",
    image: "https://www.woowahan.com/favicon/favicon.ico",
  }
]

function blogs() {
  return (
    <>
      <BlogCardLayout blogList={blogList} />
    </>
  )
}

export default blogs;