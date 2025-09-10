import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib';

// whitespace-nowrap
export const contentVariants = cva('text-sm font-normal transition-all duration-150 ease-in-out', {
  variants: {
    variant: {
      default: 'text-foreground font-medium',
      destructive: 'text-destructive',
      outline: 'border border-input ',
      secondary: 'text-main_gray',
      primary: 'text-main',
      tab: '',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type asType = 'div' | 'p' | 'span';
// <T extends "span" ? HTMLSpanElement : HTMLDivElement>

interface ContentProps extends React.ComponentProps<'div'>, VariantProps<typeof contentVariants> {
  as?: asType;
}

/**
 * @description 타이틀 컴포넌트
 * @param {asType} as div, span, p 태그
 * @param {object} contentRef ref object
 * @param {string} size text size (default: sm) [sm, lg, xl]
 */
export const Text = ({ className, variant, size, as = 'span', ...props }: ContentProps) => {
  const Element = as;
  return <Element className={cn(contentVariants({ variant, size, className }))} {...props} />;
};
