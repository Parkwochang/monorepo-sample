import { cn } from '@workspace/ui/lib';

interface ItemBoxProps extends React.ComponentProps<'div'> {}

export const ItemBox = ({ className, children, ...props }: ItemBoxProps) => {
  return (
    <div className={cn('py-3 bg-white rounded-2xl relative shadow-xs', className)} {...props}>
      {children}
    </div>
  );
};
