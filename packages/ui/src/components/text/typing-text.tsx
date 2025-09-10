'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion, MotionProps, useInView } from 'motion/react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib';
import { contentVariants } from './content';
import { useDelay } from '@workspace/ui/hooks';

// ----------------------------------------------------------------------

interface TypingAnimationProps extends MotionProps, VariantProps<typeof contentVariants> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimationComponent({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  variant,
  size,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });
  const elementRef = useRef<HTMLElement | null>(null);

  const [displayedText, setDisplayedText] = useState<string>('');

  const { isDelay } = useDelay(delay);

  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  useEffect(() => {
    if (isDelay && !children && !isInView) return;

    const graphemes = Array.from(children);
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < graphemes.length) {
        setDisplayedText(graphemes.slice(0, i + 1).join(''));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, isDelay, isInView]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(contentVariants({ variant, size, className }), 'whitespace-pre-wrap')}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}

export const TypingAnimation = memo(TypingAnimationComponent);

// useEffect(() => {
//   if (!isInView && !startOnView) return;

//   const startTimeout = setTimeout(() => {
//     setStarted(true);
//   }, delay);

//   return () => clearTimeout(startTimeout);
// }, [startOnView, isInView]);
