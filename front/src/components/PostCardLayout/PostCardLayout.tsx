import { CardsWrap, Container } from './styles';
import { IArticle } from '@/types/article';
import PostCard from './PostCard/PostCard';
import SkeletonPostCard from '@/components/Skeleton/PostCardLayout/PostCard';

interface PropTypes {
  articles: IArticle[];
  isLoading?: boolean;
}

function PostCardLayout({ articles, isLoading }: PropTypes) {
  return (
    <Container>
      <CardsWrap>
        {articles &&
          articles.map((article) => {
            return <PostCard data={article} key={article.articleId} />;
          })}
        {isLoading && new Array(4).fill(1).map((_, i) => <SkeletonPostCard key={i} />)}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;
