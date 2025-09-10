import { cn } from '@workspace/ui/lib';

interface PingProps extends React.ComponentProps<'span'> {}

export function Ping({ className, ...props }: PingProps) {
  return (
    <span className={cn('relative flex size-2', className)} {...props}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
    </span>
  );
}
