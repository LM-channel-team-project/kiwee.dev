import styled from 'styled-components';
export const Container = styled.div`
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
`;

export const CardsWrap = styled.section`
  display: flex;
  justify-content: flex-start;
  flex: 1 1 0%;
  flex-wrap: wrap;
  margin: -1.6rem;

  .buttons {
    display: flex;
  }
`;

export const Heading2 = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;
