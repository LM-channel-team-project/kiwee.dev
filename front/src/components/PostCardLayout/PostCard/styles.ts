import styled from 'styled-components';

export const CardContainer = styled.article`
  width: 320px;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme['article-bg']};
  margin: 1.6rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 1056px) {
    width: calc(50% - 3.2rem);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const CardImage = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  div.card-image {
    width: 100%;
    position: relative;
    padding-top: 50%;
    img {
      border-radius: 8px 8px 0 0;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
`;

export const CardContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  div.sub-info {
    font-size: 1.2rem;
    line-height: 1.5;
    color: ${({ theme }) => theme['font-inactive']};

    span.seperator {
      margin: 0 0.4rem;
    }
  }
`;

export const CardContent = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  h3 {
    font-size: 2.4rem;
    margin: 0px 0px 2.4rem;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.2;
    height: 8.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CardInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  border-top: 1px solid rgb(248, 249, 250);
  font-size: 1.4rem;
  color: ${({ theme }) => theme['font-inactive']};
  .card-info-left {
    display: flex;
    align-items: center;
    img.post-info-image {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      margin-right: 0.4rem;
    }
  }
`;
