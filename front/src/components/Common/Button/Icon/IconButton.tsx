import React from 'react';
import styled, { css } from 'styled-components';

import Button from '@/components/Common/Button';
import Icon from '@/components/Common/Icon';
import { IconType } from '@/components/Common/Icon/Icon';
import { BaseButtonProps } from '../button';

export type IconButtonProps = {
  iconName: IconType;
} & BaseButtonProps;

function IconButton({ iconName, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      <StyledIcon name={iconName} styleType={props.styleType} selected={props.selected} />
    </Button>
  );
}

const StyledIcon = styled(Icon).attrs((props: IconButtonProps) => ({
  styleType: props.styleType,
  selected: props.selected,
}))`
  fill: currentColor;
  ${({ theme, styleType = 'default', selected }) => {
    const colorStyle = {
      default: css`
        color: ${selected ? theme['font'] : theme['font-inactive']};
      `,
      primary: css`
        color: ${theme['btn-active-font']};
      `,
      border: css`
        color: ${theme['font-inactive']};
      `,
    };
    return colorStyle[styleType];
  }};
`;

export default React.memo(IconButton);
