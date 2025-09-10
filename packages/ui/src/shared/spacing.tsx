'use client';

import { memo } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  direction?: 'horizontal' | 'vertical';
}

export const Spacing = memo(({ size, direction = 'vertical', ...props }: Props) => {
  return (
    <div
      className={'flex-none'}
      style={{
        width: direction === 'horizontal' ? `${size}px` : '',
        height: direction === 'vertical' ? `${size}px` : '',
      }}
      {...props}
    />
  );
});
