'use client';

import { Suspense, useState, useEffect, type ReactNode } from 'react';

interface DeferredSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

function DeferredFallback({ fallback, delay = 200 }: { fallback?: ReactNode; delay?: number }) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showFallback) return null;

  return <>{fallback}</>;
}
export const DeferredSuspense = ({ children, fallback, delay = 200 }: DeferredSuspenseProps) => {
  return <Suspense fallback={<DeferredFallback fallback={fallback} delay={delay} />}>{children}</Suspense>;
};
