'use client';

import { cn } from '@workspace/ui/lib';
import { Button } from './default';
import { motion } from 'framer-motion';

// ----------------------------------------------------------------------

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function LoadingBtn(props: LoadingButtonProps) {
  const { isLoading, onClick, children, ...prop } = props;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || props.disabled}
      data-loading={isLoading}
      className="group relative disabled:opacity-100 disabled:cursor-not-allowed"
      {...prop}
    >
      {/* <span className="group-data-loading:text-transparent">{children}</span> */}
      {isLoading ? <LoadingIcon /> : children}
    </Button>
  );
}

export function LoadingIcon({ className, color }: { className?: string; color?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex space-x-2">
        <motion.div
          className={cn('h-2 w-2 rounded-full bg-white', color)}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
        <motion.div
          className={cn('h-2 w-2 rounded-full bg-white', color)}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 0.3,
          }}
        />
        <motion.div
          className={cn('h-2 w-2 rounded-full bg-white', color)}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 0.6,
          }}
        />
      </div>
    </div>
  );
}
