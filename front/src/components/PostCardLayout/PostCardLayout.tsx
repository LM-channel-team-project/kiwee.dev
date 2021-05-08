import React, { useState } from 'react';
import { CardsWrap, Container } from './styles';
import Card from './PostCard/PostCard';

function PostCardLayout() {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <Container>
      <CardsWrap>
        {cards.map((card, i) => (
          <Card key={i} />
        ))}
      </CardsWrap>
    </Container>
  );
}

export default PostCardLayout;
