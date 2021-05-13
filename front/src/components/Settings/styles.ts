import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 156px;
  padding: 2.4rem 1.6rem 2.4rem 8rem;
  background: ${({ theme }) => theme['settings-bg']};
`;

export const Division = styled.div`
  border: 1px solid #ccc;
  height: 100px;
  margin: 0 10rem;
  opacity: 0.2;
`;

export const Title = styled.div`
  font-size: 3.2rem;
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
