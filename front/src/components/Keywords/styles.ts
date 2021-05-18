import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.2rem;
  margin-top: 1.6rem;
  background-color: ${({ theme }) => theme['keyword-bar-bg']};
  box-shadow: ${({ theme }) => theme['keyword-bar-shadow']};
`;

export const KeywordItem = styled.div`
  margin-right: 0.8rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme['keyword-btn-bg']};
  color: ${({ theme }) => theme['keyword-btn-font']};
  border: 2px solid ${({ theme }) => theme['keyword-btn-font']};
  border-radius: 16px;

  &:hover {
    color: ${({ theme }) => theme['keyword-btn-active-font']};
    border: 2px solid ${({ theme }) => theme['keyword-btn-active-font']};
  }
`;
