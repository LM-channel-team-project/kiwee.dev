import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { BaseButtonProps, ButtonProps, AnchorProps, NextLinkProps } from './button';
import { styles } from './style';

function Button(props: BaseButtonProps) {
  const { children, ...restPorps } = props;

  if (isLink(restPorps)) {
    const { to, as, passHref, locale, replace, shallow, prefetch, scroll, ...rest } = restPorps;
    const linkProps = { to, as, passHref, locale, replace, shallow, prefetch, scroll };
    return (
      <Link href={to as string} {...linkProps}>
        <StyledAnchor {...rest}>{children}</StyledAnchor>
      </Link>
    );
  }
  if (isAnchor(restPorps)) {
    return (
      <StyledAnchor href={restPorps.href} target="_blank" rel="noopener noreferrer" {...restPorps}>
        {children}
      </StyledAnchor>
    );
  }
  if (isButton(restPorps)) {
    return <StyledButton {...restPorps}>{children}</StyledButton>;
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
