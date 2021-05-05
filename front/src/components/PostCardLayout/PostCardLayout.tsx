import React, { useState } from 'react';
import { CardsWrap, Container } from './styles';
import Card from './PostCard/PostCard';

function PostCardLayout() {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <Container>
      <CardsWrap>
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-1.6rem' }}> */}
        {cards.map((card, i) => (
          <Card key={i} />
        ))}
        {/* </div> */}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;
