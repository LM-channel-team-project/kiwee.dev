import { css } from 'styled-components';
import { BaseProps } from './button';

const buttonSize = ({ size = 'medium' }: BaseProps) => {
  const style = {
    none: 'padding: 0; border-radius: 0.4rem;',
    small: `padding: 0.2rem 0.4rem; border-radius: 0.8rem;`,
    medium: `height: 3.2rem; padding: 0 1.2rem; border-radius: 0.8rem;`,
    large: `height: 4rem; padding: 0 1.6rem; border-radius: 0.8rem;`,
  };
  return style[size];
};
const fontSize = ({ fontSize = '1.6rem' }: BaseProps) => `font-size:${fontSize}`;

const baseStyle = css<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme['font']};
  font-weight: 400;
  border: none;
  border-radius: 0.8rem;
  background: none;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${buttonSize};
  ${fontSize}
`;

const defaultStyle = css<BaseProps>`
  ${baseStyle};
  color: ${({ selected, theme }) => (selected ? theme['font'] : theme['font-inactive'])};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  &:hover {
    color: ${({ theme }) => theme['font']};
    background-color: ${({ theme }) => theme['btn-hover-bg-1']};
    svg {
      color: ${({ theme }) => theme['font']};
    }
  }
`;

const primaryStyle = css<BaseProps>`
  ${baseStyle};
  color: ${({ theme }) => theme['btn-active-font']};
  background-color: ${({ theme }) => theme['btn-bg']};
  &:hover {
    background-color: ${({ theme }) => theme['btn-hover-bg']};
  }
`;

const borderStyle = css<BaseProps>`
  ${baseStyle};
  color: ${({ theme }) => theme['font-inactive']};
  border: ${({ theme }) => `2px solid ${theme['font-inactive']}`};
  &:hover {
    color: ${({ theme }) => theme['font']};
    border: ${({ theme }) => `2px solid ${theme['font']}`};
    svg {
      color: ${({ theme }) => theme['font']};
    }
  }
`;

const selectedStyle = css<BaseProps>`
  ${baseStyle};
  color: ${({ theme }) => theme['font']};
  background-color: ${({ theme }) => theme['btn-hover-bg-1']};
`;

const buttonStyle = {
  default: defaultStyle,
  primary: primaryStyle,
  border: borderStyle,
  selected: selectedStyle,
};

export const styles = css<BaseProps>`
  ${({ styleType = 'default' }) => buttonStyle[styleType]}
`;
