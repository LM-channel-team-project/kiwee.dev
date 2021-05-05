import React from 'react';
import { CardContainer, CardContent, CardContentWrap, CardImage } from './styles';

function PostCard() {
  return (
    <CardContainer>
      <CardImage href="https://www.naver.com">
        <div className="card-image">
          <img
            src="https://media.vlpt.us/images/jjunyjjuny/post/e7f0d557-1fab-4a61-ae8e-b5cb1a911b09/ek7ji4zrimozpp2yzk0a.png?w=640"
            alt=""
          />
        </div>
      </CardImage>
      <CardContentWrap>
        <div className="sub-info">May 5, 2021</div>
        <CardContent href="#">
          <h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, ipsum dolorem!
            Vel consectetur maxime sunt quibusdam quos. Maiores, natus aspernatur!
          </h3>
        </CardContent>
      </CardContentWrap>
    </CardContainer>
  );
}

export default PostCard;
