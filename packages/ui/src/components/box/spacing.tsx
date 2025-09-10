'use client';

import { memo } from 'react';

interface Props extends React.ComponentProps<'div'> {
  size: number;
  direction?: 'horizontal' | 'vertical';
}

export const Spacing = memo(({ size, direction = 'vertical', ...props }: Props) => {
  return (
    <div
      style={{
        flex: 'none',
        width: direction === 'horizontal' ? `${size}px` : '',
        height: direction === 'vertical' ? `${size}px` : '',
      }}
      {...props}
    />
  );
});
