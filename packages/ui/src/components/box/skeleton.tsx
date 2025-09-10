import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const skeletonVariants = cva('rounded-md bg-accent shadow-sm', {
  variants: {
    variant: {
      default: 'animate-pulse',
      thin: 'bg-skeleton-gradient bg-[length:400%_100%] animate-skeleton-loading',
    }
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SkeletonProps
  extends React.ComponentProps<'div'>,
  VariantProps<typeof skeletonVariants> { }

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  );
}

Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };
