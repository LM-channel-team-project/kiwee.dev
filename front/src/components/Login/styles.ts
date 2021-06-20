import styled from 'styled-components';

export const LoginContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const Logo = styled.div`
  margin: 0.5rem 0;
  img {
    width: 100px;
  }
`;

export const LoginTip = styled.div`
  margin: 2.5rem 0 2rem;
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  margin: 2rem 0;

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

export const LoginPolicy = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

export const Privacy = styled.li`

  a {
    padding: .75rem;
    text-decoration: none;

    &:visited  {
      text-decoration: none;
      color: ${({ theme }) => theme['font']};
    }
  }
`;

export const Term = styled.li`

  a {
    padding: .75rem;
    text-decoration: none;

    &:visited  {
      text-decoration: none;
      color: ${({ theme }) => theme['font']};
    }
  }
`;

