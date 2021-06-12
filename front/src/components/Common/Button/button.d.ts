import { LinkProps } from 'next/link';

interface BaseProps {
  children?: React.ReactNode;
  styleType?: 'default' | 'primary' | 'border' | 'selected';
  size?: 'small' | 'medium' | 'large' | 'none';
  fontSize?: string;
  fullWidth?: boolean;
  selected?: boolean;
  to?: string;
  href?: string;
}

type ReactButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ReactAnchorType = React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends BaseProps, ReactButtonType {}
interface AnchorProps extends BaseProps, ReactAnchorType {}
interface NextLinkProps extends BaseProps, Omit<LinkProps, 'href'> {}

type BaseButtonProps = ButtonProps | AnchorProps | NextLinkProps;
