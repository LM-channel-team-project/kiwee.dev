import styled from 'styled-components';

export const LoginContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const Logo = styled.div`
  margin: 0.5rem 0;
`;

export const LoginTip = styled.div`
  margin: 2.5rem 0 2rem;
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const ButtonWrapper = styled.div`
  margin: 1.5rem 0;

  form {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: none;
      border-radius: 10px;
      width: 210px;
      height: 45px;
      cursor: pointer;
      background: ${({ theme }) => theme['login-btn-bg']};

      span {
        color: ${({ theme }) => theme['login-btn-font']};
        margin-left: 8px;
        font-size: 1.6rem;
        font-weight: 700;
      }

      &:not(:first-child) {
        margin-top: 1.5rem;
      }

      &:hover {
        background: ${({ theme }) => theme['login-btn-hover-bg']};
      }
      &:active {
        background: ${({ theme }) => theme['login-btn-active-bg']};
      }
    }
  }
`;

export const LoginPolicy = styled.div`
  margin-top: 3.5rem;
  font-size: 1.3rem;
  line-height: 1.5rem;
`;
