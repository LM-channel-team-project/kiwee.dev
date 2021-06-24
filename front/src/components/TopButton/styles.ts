import styled from 'styled-components';

export const Button = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  border-radius: 25%;
  border: 0;
  outline: 0;
  z-index: 500;
  background: ${({ theme }) => theme['login-btn-bg']};

  @media (max-width: 1056px) {
    width: 45px;
    height: 45px;
    right: 20px;
    bottom: 55px;
  }
`;
