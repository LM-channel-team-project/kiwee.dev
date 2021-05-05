import React from 'react';
import styled, { css } from 'styled-components';

import Button from '@/components/Common/Button';
import Icon from '@/components/Common/Icon';
import { IconType } from '@/components/Common/Icon/Icon';
import { BaseButtonProps } from '../button';

interface IconButtonPorps {
  iconName: IconType;
}

function IconButton({ iconName, ...props }: IconButtonPorps & BaseButtonProps) {
  return (
    <Button {...props}>
      <StyledIcon name={iconName} styleType={props.styleType} selected={props.selected} />
    </Button>
  );
}

const StyledIcon = styled(Icon).attrs((props: IconButtonPorps & BaseButtonProps) => ({
  styleType: props.styleType,
  selected: props.selected,
}))`
  fill: currentColor;
  ${({ theme, styleType = 'default', selected }) => {
    const colorStyle = {
      default: css`
        color: ${selected ? theme['font'] : theme['font-inactive']};
        /* &:hover {
          color: ${theme['font']};
        } */
      `,
      primary: css`
        color: ${theme['btn-active-font']};
      `,
      border: css`
        color: ${theme['font-inactive']};
        /* &:hover {
          color: ${theme['font']};
        } */
      `,
    };
    return colorStyle[styleType];
  }};
`;

export default React.memo(IconButton);
