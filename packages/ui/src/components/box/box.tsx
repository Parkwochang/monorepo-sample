import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const boxVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: 'bg-card',
      outline: 'border border-input',
    },
    padding: {
      default: 'p-4',
      sm: 'p-2',
      lg: 'p-6',
      none: 'p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});

export interface BoxProps
  extends React.ComponentProps<'div'>,
  VariantProps<typeof boxVariants> { }

const Box = ({ className, variant, padding, ...props }: BoxProps) => {
  return (
    <div
      className={cn(boxVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

Box.displayName = 'Box';

export { Box };
