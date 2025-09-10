import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib';

const headingVariants = cva('whitespace-nowrap rounded-md font-bold', {
  variants: {
    variant: {
      default: 'text-foreground',
      destructive: 'text-destructive',
      primary: 'text-main',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'text-lg',
      xs: 'text-sm',
      sm: 'text-base',
      lg: 'text-xl',
      xl: 'text-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type asType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps
  extends Omit<React.ComponentProps<'div'>, 'size' | 'color'>,
    VariantProps<typeof headingVariants> {
  asType?: asType;
}

/**
 * @description 타이틀 컴포넌트
 * @param {asType} as h1, h2 ... 태그
 * @param {number} size xl-24px, lg-20px, default-18px, sm-16px, xs-14px
 */
const Heading = ({ className, variant, size, asType = 'h1', ...props }: HeadingProps) => {
  const Element = asType;
  return <Element className={cn(headingVariants({ variant, size, className }))} {...props} />;
};

export { Heading, headingVariants };
