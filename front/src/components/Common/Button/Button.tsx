import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  bgColor?: string;
  fontColor?: string;
  fullWidth?: boolean;
}

function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const colorStyle = css<ButtonProps>`
  ${({ bgColor, fontColor }) => css`
    color: ${fontColor || '#ffffff'};
    background-color: ${bgColor || '#3b5bdb'};
    &:hover {
      background-color: ${bgColor || '#526bd1'};
    }
  `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: rgba(82, 88, 102, 0.2);
      color: rgba(82, 88, 102, 0.3215686274509804);
      cursor: default;
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  ${colorStyle}
`;

export default React.memo(Button);
