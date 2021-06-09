import styled from 'styled-components';
import SkeletonPostCard from './PostCard';

type Props = {
  count?: number;
};

function SKeletonPostCardLayout({ count = 4 }: Props) {
  return (
    <Container>
      <div className="cards-wrap">
        {new Array(count).fill(1).map((_, i) => (
          <SkeletonPostCard key={i} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 1728px;
  flex-direction: row;
  justify-content: center;
  margin: 3.2rem auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 3.2rem);
  }

  .cards-wrap {
    display: flex;
    justify-content: flex-start;
    flex: 1 1 0%;
    flex-wrap: wrap;
    margin: -1.6rem;
  }
`;

export default SKeletonPostCardLayout;
