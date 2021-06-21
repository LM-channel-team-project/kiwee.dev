import Link from 'next/link';
import styled, { css } from 'styled-components';

interface HeaderMenuItemProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function HeaderMenuItem({ to, onClick, children }: HeaderMenuItemProps) {
  if (to) {
    return (
      <Link href={to} passHref>
        <MenuItemLink className="menu-item">{children}</MenuItemLink>
      </Link>
    );
  }
  return (
    <MenuItemBlock className="menu-item" onClick={onClick}>
      {children}
    </MenuItemBlock>
  );
}

const baseStyle = css`
  display: flex;
  justify-content: center;
  padding: 1.6rem 1.6rem;
  align-items: center;
  color: inherit;
  text-decoration: none;
  width: 200px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme['font']};
    background-color: ${({ theme }) => theme['btn-hover-bg-3']};
  }
`;

const MenuItemBlock = styled.div`
  ${baseStyle}
`;

const MenuItemLink = styled.a`
  ${baseStyle}
  &:visited, &:link {
    text-decoration: none;
    color: inherit;
  }
`;

export default HeaderMenuItem;
