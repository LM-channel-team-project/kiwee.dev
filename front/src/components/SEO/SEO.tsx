import Head from 'next/head';
import { useRouter } from 'next/router';

import SEO_DATA from '@/lib/static/SEO';

interface SEOProps {
  title?: string;
  description?: string;
}

function SEO({ title, description }: SEOProps) {
  const { asPath, locale } = useRouter();
  const metaTitle = title || SEO_DATA.title;
  const metaDescription = description || SEO_DATA.description;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
      {/* 오픈 그래프 태그 (페이스북 등등..) */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SEO_DATA.url}${asPath}`} />
      <meta property="og:image" content={SEO_DATA.imagePath} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={SEO_DATA.name} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* 트위터 오픈 그래프 태그 */}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={SEO_DATA.imagePath} />
    </Head>
  );
}

export default SEO;
