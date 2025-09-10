import { cn } from '@repo/ui/lib';
import { Skeleton } from '@workspace/ui/components/box';

export const TableLoading = ({ className }: { className?: string }) => {
  return (
    <div className="w-full flex flex-col gap-3 pt-10">
      <Skeleton className="w-full h-10 rounded-sm" />
      <Skeleton className={cn('w-full h-[300px] rounded-sm', className)} />
    </div>
  );
};
