import React from 'react';
import Button from '@/components/Common/Button';
import { BaseButtonProps } from '../button';

interface TextButtonProps {
  label: string;
}

function TextButton({ label, ...props }: TextButtonProps & BaseButtonProps) {
  return <Button {...props}>{label}</Button>;
}

export default React.memo(TextButton);
