import { CardsWrap, Container } from './styles';
import PostCard from './PostCard/PostCard';
import { IArticle } from '@/types/article';

interface PropTypes {
  articles: IArticle[];
  filter: string;
}

function PostCardLayout({ articles, filter }: PropTypes) {
  // console.log(articles);
  return (
    <Container>
      <CardsWrap>
        {articles &&
          articles.map((article) => {
            if (article.keywords.includes(filter)) {
              return <PostCard data={article} key={article.articleId} />;
            } else if (filter === 'All') {
              return <PostCard data={article} key={article.articleId} />;
            }
          })}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;
