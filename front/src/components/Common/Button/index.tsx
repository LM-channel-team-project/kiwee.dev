import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { BaseButtonProps, ButtonProps, AnchorProps, NextLinkProps } from './button';
import { styles } from './style';

function Button(props: BaseButtonProps) {
  const { children, ...restProps } = props;

  if (isLink(restProps)) {
    const { to, as, passHref, locale, replace, shallow, prefetch, scroll, ...rest } = restProps;
    const linkProps = { to, as, passHref, locale, replace, shallow, prefetch, scroll };
    return (
      <Link href={to as string} {...linkProps}>
        <StyledAnchor {...rest}>{children}</StyledAnchor>
      </Link>
    );
  }
  if (isAnchor(restProps)) {
    return (
      <StyledAnchor href={restProps.href} target="_blank" rel="noopener noreferrer" {...restProps}>
        {children}
      </StyledAnchor>
    );
  }
  if (isButton(restProps)) {
    return <StyledButton {...restProps}>{children}</StyledButton>;
  }
  return null;
}

const isLink = (props: BaseButtonProps): props is NextLinkProps => !!props.to;
const isAnchor = (props: BaseButtonProps): props is AnchorProps => !!props.href;
const isButton = (props: BaseButtonProps): props is ButtonProps => !props.to && !props.href;

const StyledButton = styled.button<BaseButtonProps>`
  ${styles}
`;
const StyledAnchor = styled.a<BaseButtonProps>`
  ${styles}
`;

export default React.memo(Button);
