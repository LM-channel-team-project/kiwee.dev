import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 1728px;
  height: 120px;
  margin: 0 auto;
  padding: 2.4rem 1.6rem 2.4rem 12rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme['settings-bg']};

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 3.2rem);
  }

  @media (max-width: 767px) {
    margin-top: 2.4rem;
    padding-left: 8rem;
  }
`;

export const Division = styled.div`
  border: 1px solid #ccc;
  height: 100px;
  margin: 0 10rem;
  opacity: 0.2;

  @media (max-width: 767px) {
    margin: 0 5rem;
  }

  @media (max-width: 480px) {
    margin: 0 2.5rem;
  }
`;

export const Title = styled.div`
  font-size: 3rem;
  font-weight: 600;

  @media (max-width: 480px) {
    margin-left: -5rem;
  }
`;

export const Switches = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin-bottom: 1.2rem;
  }
  div:last-child {
    margin-bottom: 0;
  }
`;
