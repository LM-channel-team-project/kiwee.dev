import axios from 'axios';

import { BlogsResponse, Provider } from '@/types/response';
import { API_URL } from '@/config/constants/api';

import BlogCardLayout from '@/components/BlogCardLayout';
import SEO from '@/components/SEO';
import { nextAuthWrapper } from '@/lib/nextAuthWrapper';

function blogs({ blogs, count }: { blogs: Provider[]; count: number }) {
  return (
    <section>
      <SEO />
      <BlogCardLayout blogList={blogs} blogCount={count} />
    </section>
  );
}

export const getServerSideProps = nextAuthWrapper({ redirectToHome: false }, async () => {
  const { data } = await axios.get<BlogsResponse>(`${API_URL}/provider/blogs`);
  return {
    props: {
      blogs: data?.blogs,
      count: data?.count,
    },
  };
});

export default blogs;
