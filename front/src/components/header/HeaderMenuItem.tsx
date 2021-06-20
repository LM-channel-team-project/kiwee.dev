import Link from 'next/link';
import styled from 'styled-components';

interface HeaderMenuItemProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function HeaderMenuItem({ to, onClick, children }: HeaderMenuItemProps) {
  if (to) {
    return (
      <Link href={to}>
        <MenuItemBlock className="menu-item">{children}</MenuItemBlock>
      </Link>
    );
  }
  return (
    <MenuItemBlock className="menu-item" onClick={onClick}>
      {children}
    </MenuItemBlock>
  );
}

const MenuItemBlock = styled.div`
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

export default HeaderMenuItem;
