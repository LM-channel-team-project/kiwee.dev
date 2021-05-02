import React from 'react';
import * as svg from '@/components/Common/Icon/svg';

export type IconType = keyof typeof svg;
export interface IconProps {
  name: IconType;
  className?: string;
  style?: React.CSSProperties;
}

function Icon({ name, className, style }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
  });
}

export default Icon;
