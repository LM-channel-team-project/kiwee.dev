import axios from 'axios';
import { GetServerSideProps } from 'next';

import { BlogsResponse, Provider } from '@/types/response';
import { API_URL } from '@/config/constants/api';

import BlogCardLayout from '@/components/BlogCardLayout';

function blogs({ blogs, count }: { blogs: Provider[]; count: number }) {
  return (
    <section>
      <BlogCardLayout blogList={blogs} blogCount={count} />
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get<BlogsResponse>(`${API_URL}/provider/blogs`);
  return {
    props: {
      blogs: data?.blogs,
      count: data?.count,
    },
  };
};

export default blogs;
