import React from 'react';
import Button from '@/components/Common/Button';
import { BaseButtonProps } from '../button';

interface TextButtonPorps {
  label: string;
}

function TextButton({ label, ...props }: TextButtonPorps & BaseButtonProps) {
  return <Button {...props}>{label}</Button>;
}

export default React.memo(TextButton);
