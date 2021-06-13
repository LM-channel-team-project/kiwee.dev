import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 2.4rem 1.6rem 2.4rem 8rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme['settings-bg']};
`;

export const Division = styled.div`
  border: 1px solid #ccc;
  height: 100px;
  margin: 0 10rem;
  opacity: 0.2;
`;

export const Title = styled.div`
  font-size: 3rem;
  font-weight: 600;
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
