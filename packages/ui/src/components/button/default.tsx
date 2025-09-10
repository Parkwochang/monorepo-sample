import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer data-[state=open]:bg-accent data-[state=open]:text-accent-foreground dark:data-[state=open]:bg-accent dark:data-[state=open]:text-accent-foreground dark:focus-visible:ring-offset-background dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-primary/20 dark:focus-visible:ring-offset-primary/40 dark:focus-visible:ring-offset-primary/20 dark:focus-visible:ring-offset-primary/40",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'md:h-9 md:px-4 md:py-2 h-8 px-3 py-[6px] md:has-[>svg]:px-3 has-[>svg]:px-2.5 rounded-md',

        sm: 'h-8 px-3 py-[6px] has-[>svg]:px-2.5 rounded-md',
        xs: 'h-7 px-2 py-[5px] has-[>svg]:px-2.5 rounded-md',

        lg: 'h-10 px-6 has-[>svg]:px-4',
        xl: 'h-12 px-8 has-[>svg]:px-6',

        full: 'w-full h-[54px]',
        icon: 'size-9',
        tag: 'h-8 px-3 has-[>svg]:px-2.5 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// Read more: [Next.js docs: `Image`](https://nextjs.org/docs/app/api-reference/components/image)

/**
 * The `Button` component is used to optimize button.
 * @param variant 버튼 종류
 * @param size 버튼 크기
 * @param className 추가 클래스
 * @param asChild  자식 컴포넌트 사용 여부
 * @returns react.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean; }
 * @example <Button variant="secondary" size="sm">Default</Button>
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
