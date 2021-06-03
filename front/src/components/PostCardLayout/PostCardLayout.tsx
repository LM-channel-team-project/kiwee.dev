import { CardsWrap, Container } from './styles';
import PostCard from './PostCard/PostCard';
import { IArticle } from '@/types/article';

interface PropTypes {
  articles: IArticle[];
}

function PostCardLayout({ articles }: PropTypes) {
  return (
    <Container>
      <CardsWrap>
        {articles &&
          articles.map((article) => {
            return <PostCard data={article} key={article.articleId} />;
          })}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;
