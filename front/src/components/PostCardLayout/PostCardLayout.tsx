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
        {articles && articles.map((article) => <PostCard data={article} key={article.articleId} />)}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;

// const [target, setTarget] = useState(null);
// const ref = useRef(null);

// // useEffect(() => {
// //   setTarget(document.querySelector('footer'));
// // }, []);

// console.log(isLoading);

// const handleObserver = ([entry]) => {
//   if (entry.isIntersecting) {
//     setCurrentPage((prev) => prev + 1);
//   }
// };

// useEffect(() => {
//   if (!target) return;
//   const option = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0,
//   };
//   ref.current = new IntersectionObserver(handleObserver, option);
//   ref.current.observe(target);
//   // if (target) {
//   //   observer.observe(target);
//   // console.log('관측');
//   // }
// }, [target, handleObserver]);

// useEffect(() => {
//   if (articles) {
//     console.log(currentPage);
//   }
//   console.log(articles);
// }, [articles, currentPage]);
// const INITIAL_PAGE_NUMBER = 0;
// const handleObserver = ([entry]) => {
//   if (entry.isIntersecting) {
//     setCurrentPage((prev) => prev + 1);
//   }
// };
// const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);
// const [
//   onInfiniteScrollInit,
//   onInfiniteScrollUpdate,
//   onInfiniteScrollDisconnect,
// ] = useInfiniteScroll(handleObserver);

// const { articles, cur, pages, isLoading } = useAxios(
//   `http://localhost:8080/article?page=${currentPage}`,
// );

// useEffect(() => {
//   onInfiniteScrollInit(document.querySelector('footer'));
// }, []);

// useEffect(() => {
//   // setCurrentPage(INITIAL_PAGE_NUMBER);
//   if (currentPage < pages) {
//     onInfiniteScrollUpdate();
//     console.log('맨밑', cur, currentPage, articles);
//   }
// }, [articles, currentPage]);

// useEffect(() => {
//   if (currentPage > pages) onInfiniteScrollDisconnect();
// }, [currentPage]);
